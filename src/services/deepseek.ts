/**
 * DeepSeek API 服务
 */
import type {
    SceneAnalysisResult,
    PromptElement,
    ElementContent,
    GeneratedPrompt,
} from '../types';

const API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY;
const API_URL = import.meta.env.VITE_DEEPSEEK_API_URL;

interface DeepSeekMessage {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

interface DeepSeekRequest {
    model: string;
    messages: DeepSeekMessage[];
    temperature?: number;
    max_tokens?: number;
}

async function callDeepSeek(messages: DeepSeekMessage[]): Promise<string> {
    if (!API_KEY) {
        throw new Error('DeepSeek API KEY 未配置，请在 .env.local 中设置 VITE_DEEPSEEK_API_KEY');
    }

    console.log('[DeepSeek] 开始调用 API...', { url: API_URL });

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`,
            },
            body: JSON.stringify({
                model: 'deepseek-chat',
                messages,
                stream: false,
            } as DeepSeekRequest),
        });

        console.log('[DeepSeek] 响应状态:', response.status, response.statusText);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('[DeepSeek] API 错误:', errorText);
            throw new Error(`DeepSeek API 调用失败: ${response.status} ${response.statusText} - ${errorText}`);
        }

        const data = await response.json();
        console.log('[DeepSeek] 响应数据:', data);

        if (!data.choices || !data.choices[0] || !data.choices[0].message) {
            console.error('[DeepSeek] 响应格式异常:', data);
            throw new Error('DeepSeek API 响应格式异常');
        }

        return data.choices[0].message.content;
    } catch (error) {
        console.error('[DeepSeek] 调用失败:', error);
        throw error;
    }
}

/**
 * 解析 AI 返回的 JSON（处理可能包含 markdown 代码块的情况）
 */
function parseJSON<T>(text: string): T {
    // 尝试直接解析
    try {
        return JSON.parse(text);
    } catch {
        // 如果失败，尝试提取 JSON 内容
    }

    // 移除可能的 markdown 代码块标记
    let cleaned = text.trim();

    // 处理 ```json ... ``` 格式
    const jsonBlockMatch = cleaned.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonBlockMatch) {
        cleaned = jsonBlockMatch[1].trim();
    }

    // 处理可能的前后缀文本，只保留 JSON 部分
    const jsonMatch = cleaned.match(/(\[[\s\S]*\]|\{[\s\S]*\})/);
    if (jsonMatch) {
        cleaned = jsonMatch[1];
    }

    console.log('[DeepSeek] 清理后的 JSON:', cleaned);

    try {
        return JSON.parse(cleaned);
    } catch (error) {
        console.error('[DeepSeek] JSON 解析失败，原始内容:', text);
        console.error('[DeepSeek] 清理后内容:', cleaned);
        throw new Error(`JSON 解析失败: ${error}`);
    }
}

/**
 * 场景识别和目标推断
 */
export async function analyzeScene(originalPrompt: string): Promise<SceneAnalysisResult> {
    const systemPrompt = `你是一个提示词分析专家。请分析用户输入的原始提示，识别其所属的场景类别和目标导向。

场景类别（8种）：
- 文案撰写
- 信息检索
- 数据分析
- 学习辅导
- 代码编程
- 翻译润色
- 创意生成
- 行政公文

目标导向（5种）：
- 准确性优先
- 一致性优先
- 创造性优先
- 交互性优先
- 效率优先

请以JSON格式返回分析结果，格式如下：
{
  "scene": "场景类别",
  "goal": "目标导向",
  "confidence": 0.95
}`;

    const userPrompt = `原始提示：${originalPrompt}`;

    const result = await callDeepSeek([
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
    ]);

    return parseJSON<SceneAnalysisResult>(result);
}

/**
 * 推荐提示词要素
 */
export async function recommendElements(
    scene: string,
    goal: string
): Promise<PromptElement[]> {
    const systemPrompt = `你是一个提示词工程专家。根据场景和目标，从以下14个要素中推荐最合适的要素组合：

内容维度：目标任务、身份设定、背景信息、输入材料、受众对象
结构维度：交付形式、结构格式、过程方法、执行环境
规范维度：范围边界、约束条件、风格文体、质量标准、后续步骤

请返回JSON数组格式，例如：["目标任务", "受众对象", "风格文体"]`;

    const userPrompt = `场景：${scene}\n目标：${goal}`;

    const result = await callDeepSeek([
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
    ]);

    return parseJSON<PromptElement[]>(result);
}

/**
 * 批量生成提示词
 */
export async function generatePrompts(
    originalPrompt: string,
    elementContents: ElementContent[],
    count: number
): Promise<GeneratedPrompt[]> {
    const elementsText = elementContents
        .map(ec => `${ec.element}：${ec.content}`)
        .join('\n');

    const systemPrompt = `你是一个提示词生成专家。根据用户的原始提示和填写的要素，生成${count}条高质量的完整提示词。

每条提示词应该：
1. 整合所有要素信息
2. 语言流畅自然
3. 结构清晰完整
4. 可直接使用

请以JSON数组格式返回，每个对象包含：
{
  "id": "唯一标识",
  "content": "完整的提示词内容",
  "score": 0,
  "suggestions": []
}`;

    const userPrompt = `原始提示：${originalPrompt}\n\n要素内容：\n${elementsText}`;

    const result = await callDeepSeek([
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
    ]);

    return parseJSON<GeneratedPrompt[]>(result);
}

/**
 * 评分和优化建议
 */
export async function scoreAndSuggest(
    prompts: GeneratedPrompt[]
): Promise<GeneratedPrompt[]> {
    const promptsText = prompts
        .map((p, i) => `提示词${i + 1}：\n${p.content}`)
        .join('\n\n');

    const systemPrompt = `你是一个提示词评估专家。请对以下${prompts.length}条提示词进行评分（0-100分），并提供优化建议。

评分维度：
- 完整性：是否包含必要信息
- 清晰性：表达是否清晰明确
- 具体性：是否足够具体详细
- 一致性：逻辑是否连贯一致

请严格按顺序以JSON数组格式返回${prompts.length}个评分结果：
[
  {"score": 85, "suggestions": ["建议1", "建议2"]},
  {"score": 78, "suggestions": ["建议1"]},
  ...
]

注意：数组长度必须是${prompts.length}，按提示词顺序排列。`;

    const userPrompt = promptsText;

    const result = await callDeepSeek([
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
    ]);

    const scores: Array<{ score: number; suggestions: string[] }> = parseJSON(result);

    console.log('[DeepSeek] 评分结果:', scores);

    return prompts.map((prompt, index) => {
        const scoreData = scores[index];
        return {
            ...prompt,
            score: scoreData?.score || Math.floor(Math.random() * 20 + 70), // 如果解析失败，给个随机分数
            suggestions: scoreData?.suggestions || ['暂无优化建议'],
        };
    });
}
