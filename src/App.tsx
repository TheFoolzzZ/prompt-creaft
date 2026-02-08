/**
 * 主应用组件
 */
import { useState } from 'react';
import { Global, css } from '@emotion/react';
import { globalStyles } from './styles/global';
import { InputStep } from './pages/InputStep';
import { AnalysisStep } from './pages/AnalysisStep';
import { FillStep } from './pages/FillStep';
import { ResultStep } from './pages/ResultStep';
import type {
  AppStep,
  SceneAnalysisResult,
  PromptElement,
  ElementContent,
  GeneratedPrompt,
  SceneCategory,
  GoalType,
} from './types';
import * as deepseek from './services/deepseek';

function App() {
  const [step, setStep] = useState<AppStep>('input');
  const [originalPrompt, setOriginalPrompt] = useState('');
  const [sceneAnalysis, setSceneAnalysis] = useState<SceneAnalysisResult | null>(null);
  const [recommendedElements, setRecommendedElements] = useState<PromptElement[]>([]);
  const [generatedPrompts, setGeneratedPrompts] = useState<GeneratedPrompt[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // US-01: 分析场景
  const handleAnalyze = async (prompt: string) => {
    setOriginalPrompt(prompt);
    setIsLoading(true);
    try {
      const analysis = await deepseek.analyzeScene(prompt);
      setSceneAnalysis(analysis);
      setStep('analysis');
    } catch (error) {
      console.error('场景识别失败:', error);
      alert('场景识别失败，请检查 API KEY 配置或重试');
    } finally {
      setIsLoading(false);
    }
  };

  // US-02: 确认场景并推荐要素
  const handleConfirmAnalysis = async (scene: SceneCategory, goal: GoalType) => {
    setSceneAnalysis({ scene, goal, confidence: 1 });
    setIsLoading(true);
    try {
      const elements = await deepseek.recommendElements(scene, goal);
      setRecommendedElements(elements);
      setStep('fill');
    } catch (error) {
      console.error('要素推荐失败:', error);
      alert('要素推荐失败，请重试');
    } finally {
      setIsLoading(false);
    }
  };

  // US-04: 生成提示词
  const handleGenerate = async (contents: ElementContent[], count: 5 | 10) => {
    setIsLoading(true);
    try {
      const prompts = await deepseek.generatePrompts(originalPrompt, contents, count);
      const scoredPrompts = await deepseek.scoreAndSuggest(prompts);
      setGeneratedPrompts(scoredPrompts);
      setStep('result');
    } catch (error) {
      console.error('生成提示词失败:', error);
      alert('生成提示词失败，请重试');
    } finally {
      setIsLoading(false);
    }
  };

  // US-06: 优化提示词
  const handleOptimize = (promptId: string) => {
    const prompt = generatedPrompts.find(p => p.id === promptId);
    if (prompt) {
      // 这里可以实现优化逻辑，暂时简化处理
      alert('优化功能开发中...');
    }
  };

  // 重新生成
  const handleRegenerate = () => {
    setStep('fill');
  };

  // 返回上一步
  const handleBack = () => {
    switch (step) {
      case 'analysis':
        setStep('input');
        break;
      case 'fill':
        setStep('analysis');
        break;
      case 'result':
        setStep('fill');
        break;
    }
  };

  return (
    <>
      <Global styles={css(globalStyles)} />

      {step === 'input' && (
        <InputStep onAnalyze={handleAnalyze} isLoading={isLoading} />
      )}

      {step === 'analysis' && sceneAnalysis && (
        <AnalysisStep
          originalPrompt={originalPrompt}
          analysis={sceneAnalysis}
          onConfirm={handleConfirmAnalysis}
          onBack={handleBack}
        />
      )}

      {step === 'fill' && sceneAnalysis && (
        <FillStep
          scene={sceneAnalysis.scene}
          goal={sceneAnalysis.goal}
          recommendedElements={recommendedElements}
          onGenerate={handleGenerate}
          onBack={handleBack}
          isLoading={isLoading}
        />
      )}

      {step === 'result' && (
        <ResultStep
          prompts={generatedPrompts}
          onOptimize={handleOptimize}
          onRegenerate={handleRegenerate}
          onBack={handleBack}
        />
      )}
    </>
  );
}

export default App;
