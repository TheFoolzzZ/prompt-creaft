/**
 * 核心类型定义
 */

// 场景类别
export type SceneCategory =
    | '文案撰写'
    | '信息检索'
    | '数据分析'
    | '学习辅导'
    | '代码编程'
    | '翻译润色'
    | '创意生成'
    | '行政公文';

// 目标导向
export type GoalType =
    | '准确性优先'
    | '一致性优先'
    | '创造性优先'
    | '交互性优先'
    | '效率优先';

// 提示词要素
export type PromptElement =
    // 内容维度
    | '目标任务'
    | '身份设定'
    | '背景信息'
    | '输入材料'
    | '受众对象'
    // 结构维度
    | '交付形式'
    | '结构格式'
    | '过程方法'
    | '执行环境'
    // 规范维度
    | '范围边界'
    | '约束条件'
    | '风格文体'
    | '质量标准'
    | '后续步骤';

// 要素配置
export interface ElementConfig {
    name: PromptElement;
    description: string;
    placeholder: string;
    dimension: '内容维度' | '结构维度' | '规范维度';
}

// 场景识别结果
export interface SceneAnalysisResult {
    scene: SceneCategory;
    goal: GoalType;
    confidence: number;
}

// 推荐要素
export interface RecommendedElements {
    elements: PromptElement[];
    reason: string;
}

// 用户填写的要素内容
export interface ElementContent {
    element: PromptElement;
    content: string;
}

// 生成的提示词
export interface GeneratedPrompt {
    id: string;
    content: string;
    score: number;
    suggestions: string[];
}

// 应用状态
export type AppStep =
    | 'input' // 输入原始提示
    | 'analysis' // 场景识别结果
    | 'fill' // 填写要素
    | 'result' // 查看结果
    | 'optimize'; // 优化模式

export interface AppState {
    step: AppStep;
    originalPrompt: string;
    sceneAnalysis: SceneAnalysisResult | null;
    recommendedElements: PromptElement[];
    elementContents: ElementContent[];
    generatedPrompts: GeneratedPrompt[];
    selectedPromptId: string | null;
    generateCount: 5 | 10;
}
