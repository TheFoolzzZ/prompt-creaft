/**
 * 提示词要素配置
 */
import type { ElementConfig } from '../types';

export const ELEMENT_CONFIGS: ElementConfig[] = [
    // 内容维度
    {
        name: '目标任务',
        description: '明确要完成的具体任务',
        placeholder: '例如：撰写一篇产品介绍文案',
        dimension: '内容维度',
    },
    {
        name: '身份设定',
        description: '为AI设定的虚拟角色/专业立场',
        placeholder: '例如：你是一位资深营销专家',
        dimension: '内容维度',
    },
    {
        name: '背景信息',
        description: '任务的情境上下文',
        placeholder: '例如:公司即将发布新产品',
        dimension: '内容维度',
    },
    {
        name: '输入材料',
        description: '提供的参考资料或数据',
        placeholder: '例如：以下是产品的核心参数...',
        dimension: '内容维度',
    },
    {
        name: '受众对象',
        description: '最终内容的阅读者/使用者',
        placeholder: '例如：目标受众是25-35岁的年轻白领',
        dimension: '内容维度',
    },

    // 结构维度
    {
        name: '交付形式',
        description: '输出的实体格式',
        placeholder: '例如：输出为Markdown表格',
        dimension: '结构维度',
    },
    {
        name: '结构格式',
        description: '内容的组织逻辑和层次',
        placeholder: '例如：按照背景-痛点-解决方案-总结的结构',
        dimension: '结构维度',
    },
    {
        name: '过程方法',
        description: '思维路径或分析步骤',
        placeholder: '例如：先分析优劣势，再做SWOT分析',
        dimension: '结构维度',
    },
    {
        name: '执行环境',
        description: '产出物的下游应用场景',
        placeholder: '例如：生成可直接导入PPT的格式',
        dimension: '结构维度',
    },

    // 规范维度
    {
        name: '范围边界',
        description: '工作的核心领域与禁区',
        placeholder: '例如：仅讨论技术可行性，不涉及商业策略',
        dimension: '规范维度',
    },
    {
        name: '约束条件',
        description: '硬性规定（字数、格式等）',
        placeholder: '例如：不超过300字',
        dimension: '规范维度',
    },
    {
        name: '风格文体',
        description: '语气与呈现方式',
        placeholder: '例如：采用轻松幽默的社交媒体风格',
        dimension: '规范维度',
    },
    {
        name: '质量标准',
        description: '评价尺度',
        placeholder: '例如：论证需引用实证研究',
        dimension: '规范维度',
    },
    {
        name: '后续步骤',
        description: '分阶段交互/迭代方式',
        placeholder: '例如：先提供大纲，经我确认后再写全文',
        dimension: '规范维度',
    },
];

export const getElementConfig = (elementName: string) => {
    return ELEMENT_CONFIGS.find(config => config.name === elementName);
};
