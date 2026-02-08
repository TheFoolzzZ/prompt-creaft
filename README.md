# 提示词巧匠（Prompt Builder）

一款智能提示词辅助工具，帮助用户高效构建高质量的 AI 提示词。

## 功能特性

- 🎯 **智能场景识别**：自动识别用户意图和应用场景
- 📝 **要素推荐**：基于场景和目标动态推荐提示词要素
- ✨ **批量生成**：一次生成 5-10 条候选提示词
- 📊 **智能评分**：AI 自动评分并提供优化建议
- 🎨 **现代设计**：简约黑白风格，专业科技感

## 技术栈

- **前端框架**：React + TypeScript
- **构建工具**：Vite
- **样式方案**：Emotion (CSS-in-JS)
- **AI 模型**：DeepSeek API

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置 API KEY

复制 `.env.example` 为 `.env.local`，并填入您的 DeepSeek API KEY：

```bash
cp .env.example .env.local
```

编辑 `.env.local`：

```
VITE_DEEPSEEK_API_KEY=your_api_key_here
VITE_DEEPSEEK_API_URL=https://api.deepseek.com/v1/chat/completions
```

### 3. 启动开发服务器

```bash
npm run dev
```

### 4. 构建生产版本

```bash
npm run build
```

## 部署到 Vercel

### 1. 连接仓库
1. 登录 [Vercel](https://vercel.com)
2. 点击 "New Project"
3. 导入 GitHub 仓库

### 2. 配置环境变量
在 Vercel 项目设置中添加环境变量：
- **Name**: `VITE_DEEPSEEK_API_KEY`
- **Value**: 您的 DeepSeek API Key
- **Name**: `VITE_DEEPSEEK_API_URL`
- **Value**: `https://api.deepseek.com/chat/completions`

### 3. 部署
Vercel 会自动检测 Vite 项目并完成部署。

> ⚠️ **注意**: 确保 `.env.local` 文件不会被提交到 Git 仓库（已在 .gitignore 中配置）

## 项目结构

```
src/
├── components/       # UI 组件
│   ├── Button.tsx
│   ├── Textarea.tsx
│   ├── Card.tsx
│   └── Badge.tsx
├── pages/           # 页面组件
│   ├── InputStep.tsx
│   ├── AnalysisStep.tsx
│   ├── FillStep.tsx
│   └── ResultStep.tsx
├── services/        # API 服务
│   └── deepseek.ts
├── styles/          # 样式系统
│   ├── tokens.ts
│   └── global.ts
├── constants/       # 常量配置
│   ├── elements.ts
│   └── scenes.ts
├── types/           # 类型定义
│   └── index.ts
├── App.tsx          # 主应用
└── main.tsx         # 入口文件
```

## 使用流程

1. **输入原始提示**：在输入框中描述您的需求
2. **确认场景识别**：查看 AI 识别的场景和目标，可手动调整
3. **填写要素内容**：根据推荐的要素框架填写具体内容
4. **查看生成结果**：浏览按评分排序的候选提示词
5. **优化或使用**：选择满意的提示词直接使用，或继续优化

## 设计规范

- **配色**：黑白为主，高对比度
- **字体**：Inter + 苹方
- **按钮**：主按钮黑底白字，次按钮边框样式
- **卡片**：白底、圆角 12px、轻量阴影
- **间距**：基于 4px 单位的 6 级间距系统

## 许可证

MIT
