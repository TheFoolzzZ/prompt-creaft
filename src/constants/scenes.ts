/**
 * 场景类别配置
 */
import type { SceneCategory } from '../types';

export interface SceneConfig {
    name: SceneCategory;
    description: string;
    example: string;
}

export const SCENE_CONFIGS: SceneConfig[] = [
    {
        name: '文案撰写',
        description: '营销文案、产品介绍、社交媒体帖子',
        example: '帮我写一篇产品介绍文案，突出产品的创新点',
    },
    {
        name: '信息检索',
        description: '资料查询、知识问答、概念解释',
        example: '请解释什么是大语言模型的提示词工程',
    },
    {
        name: '数据分析',
        description: '数据汇总、报表生成、趋势分析',
        example: '分析这份销售数据，找出增长趋势和关键因素',
    },
    {
        name: '学习辅导',
        description: '知识讲解、习题解答、学习计划',
        example: '帮我制定一个为期3个月的Python学习计划',
    },
    {
        name: '代码编程',
        description: '代码生成、Bug修复、代码解释',
        example: '用React写一个可拖拽排序的列表组件',
    },
    {
        name: '翻译润色',
        description: '多语言翻译、文本润色、语法校对',
        example: '将这段中文翻译成专业的英文商务邮件',
    },
    {
        name: '创意生成',
        description: '头脑风暴、创意方案、名称命名',
        example: '为一款智能手表产品起10个有创意的名字',
    },
    {
        name: '行政公文',
        description: '通知公告、会议纪要、工作汇报',
        example: '撰写一份关于年度总结会议的通知',
    },
];
