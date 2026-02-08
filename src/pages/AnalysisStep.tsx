/**
 * US-02: 场景识别结果确认页面
 */
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { colors, spacing, typography } from '../styles/tokens';
import type { SceneAnalysisResult, SceneCategory, GoalType } from '../types';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${spacing['2xl']};
`;

const Header = styled.div`
  margin-bottom: ${spacing.xl};
`;

const Title = styled.h2`
  font-size: ${typography.moduleTitle.fontSize};
  font-weight: ${typography.moduleTitle.fontWeight};
  margin-bottom: ${spacing.md};
`;

const PromptCard = styled(Card)`
  margin-bottom: ${spacing.lg};
  background: ${colors.backgroundSecondary};
`;

const PromptLabel = styled.div`
  font-size: ${typography.caption.fontSize};
  color: ${colors.textSecondary};
  margin-bottom: ${spacing.sm};
`;

const PromptText = styled.div`
  font-size: ${typography.body.fontSize};
  color: ${colors.textPrimary};
  line-height: ${typography.body.lineHeight};
`;

const ResultCard = styled(Card)`
  margin-bottom: ${spacing.lg};
`;

const ResultTitle = styled.div`
  font-size: ${typography.cardTitle.fontSize};
  font-weight: ${typography.cardTitle.fontWeight};
  margin-bottom: ${spacing.md};
  padding-bottom: ${spacing.md};
  border-bottom: 1px solid ${colors.border};
`;

const FormGroup = styled.div`
  margin-bottom: ${spacing.md};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  display: block;
  font-size: ${typography.body.fontSize};
  font-weight: 500;
  color: ${colors.textPrimary};
  margin-bottom: ${spacing.sm};
`;

const Select = styled.select`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${colors.border};
  border-radius: 8px;
  font-size: ${typography.body.fontSize};
  color: ${colors.textPrimary};
  background: ${colors.background};
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: ${colors.primary};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${spacing.md};
`;

const SCENE_OPTIONS: SceneCategory[] = [
  '文案撰写',
  '信息检索',
  '数据分析',
  '学习辅导',
  '代码编程',
  '翻译润色',
  '创意生成',
  '行政公文',
];

const GOAL_OPTIONS: GoalType[] = [
  '准确性优先',
  '一致性优先',
  '创造性优先',
  '交互性优先',
  '效率优先',
];

interface AnalysisStepProps {
  originalPrompt: string;
  analysis: SceneAnalysisResult;
  onConfirm: (scene: SceneCategory, goal: GoalType) => void;
  onBack: () => void;
}

export const AnalysisStep: React.FC<AnalysisStepProps> = ({
  originalPrompt,
  analysis,
  onConfirm,
  onBack,
}) => {
  const [scene, setScene] = useState<SceneCategory>(analysis.scene);
  const [goal, setGoal] = useState<GoalType>(analysis.goal);

  const handleConfirm = () => {
    onConfirm(scene, goal);
  };

  return (
    <Container>
      <Header>
        <Title>✅ 分析完成</Title>
      </Header>

      <PromptCard>
        <PromptLabel>您的原始提示：</PromptLabel>
        <PromptText>{originalPrompt}</PromptText>
      </PromptCard>

      <ResultCard>
        <ResultTitle>识别结果</ResultTitle>

        <FormGroup>
          <Label>场景类别：</Label>
          <Select
            value={scene}
            onChange={(e) => setScene(e.target.value as SceneCategory)}
          >
            {SCENE_OPTIONS.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>目标导向：</Label>
          <Select
            value={goal}
            onChange={(e) => setGoal(e.target.value as GoalType)}
          >
            {GOAL_OPTIONS.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </FormGroup>
      </ResultCard>

      <ButtonGroup>
        <Button variant="secondary" onClick={onBack}>
          返回修改
        </Button>
        <Button onClick={handleConfirm}>
          确认继续 →
        </Button>
      </ButtonGroup>
    </Container>
  );
};
