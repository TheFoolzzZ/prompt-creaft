/**
 * US-05/06/07: 结果展示、优化、使用页面
 */
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { colors, spacing, typography } from '../styles/tokens';
import type { GeneratedPrompt } from '../types';

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: ${spacing['2xl']};
`;

const Header = styled.div`
  margin-bottom: ${spacing.xl};
`;

const Title = styled.h2`
  font-size: ${typography.moduleTitle.fontSize};
  font-weight: ${typography.moduleTitle.fontWeight};
  margin-bottom: ${spacing.sm};
`;

const PromptList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.lg};
  margin-bottom: ${spacing.lg};
`;

const PromptCard = styled(Card) <{ rank: number }>`
  position: relative;
  cursor: pointer;
  border: 2px solid ${({ rank }) => rank === 1 ? colors.success : colors.border};
  
  &:hover {
    border-color: ${colors.primary};
  }
`;

const PromptHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${spacing.md};
  padding-bottom: ${spacing.md};
  border-bottom: 1px solid ${colors.border};
`;

const PromptRank = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.md};
`;

const RankNumber = styled.span`
  font-size: ${typography.cardTitle.fontSize};
  font-weight: ${typography.cardTitle.fontWeight};
  color: ${colors.textPrimary};
`;

const ScoreBadge = styled(Badge) <{ score: number }>`
  ${({ score }) => {
    if (score >= 90) return `background: ${colors.badgeCore}; color: ${colors.badgeCoreText};`;
    if (score >= 70) return `background: ${colors.badgeEnhanced}; color: ${colors.badgeEnhancedText};`;
    return `background: ${colors.backgroundSecondary}; color: ${colors.textSecondary};`;
  }}
  font-size: 14px;
  padding: ${spacing.sm} ${spacing.md};
`;

const PromptContent = styled.div`
  font-size: ${typography.body.fontSize};
  line-height: ${typography.body.lineHeight};
  color: ${colors.textPrimary};
  margin-bottom: ${spacing.md};
  white-space: pre-wrap;
`;

const SuggestionsSection = styled.div`
  background: ${colors.backgroundSecondary};
  padding: ${spacing.md};
  border-radius: 8px;
  margin-bottom: ${spacing.md};
`;

const SuggestionsTitle = styled.div`
  font-size: ${typography.caption.fontSize};
  font-weight: 600;
  color: ${colors.textSecondary};
  margin-bottom: ${spacing.sm};
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
`;

const SuggestionsList = styled.ul`
  margin: 0;
  padding-left: ${spacing.lg};
  font-size: ${typography.caption.fontSize};
  color: ${colors.textSecondary};
  line-height: 1.6;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${spacing.sm};
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${spacing.md};
`;

const Toast = styled.div<{ show: boolean }>`
  position: fixed;
  bottom: ${spacing.xl};
  left: 50%;
  transform: translateX(-50%);
  background: ${colors.primary};
  color: ${colors.background};
  padding: ${spacing.md} ${spacing.lg};
  border-radius: 8px;
  font-size: ${typography.body.fontSize};
  opacity: ${({ show }) => show ? 1 : 0};
  transition: opacity 0.3s;
  pointer-events: none;
  z-index: 1000;
`;

interface ResultStepProps {
  prompts: GeneratedPrompt[];
  onOptimize: (promptId: string) => void;
  onRegenerate: () => void;
  onBack: () => void;
}

export const ResultStep: React.FC<ResultStepProps> = ({
  prompts,
  onOptimize,
  onRegenerate,
  onBack,
}) => {
  const [showToast, setShowToast] = useState(false);

  const sortedPrompts = [...prompts].sort((a, b) => b.score - a.score);

  const handleCopy = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    } catch (error) {
      alert('复制失败，请手动选择复制');
    }
  };

  return (
    <Container>
      <Header>
        <Title>🎯 生成完成！以下是按评分排序的候选提示词：</Title>
      </Header>

      <PromptList>
        {sortedPrompts.map((prompt, index) => (
          <PromptCard key={prompt.id} rank={index + 1}>
            <PromptHeader>
              <PromptRank>
                <RankNumber>#{index + 1}</RankNumber>
                <ScoreBadge score={prompt.score}>
                  评分：{prompt.score}/100
                </ScoreBadge>
              </PromptRank>
              <ActionButtons>
                <Button variant="secondary" onClick={() => onOptimize(prompt.id)}>
                  选择优化
                </Button>
                <Button onClick={() => handleCopy(prompt.content)}>
                  使用此提示词 ✓
                </Button>
              </ActionButtons>
            </PromptHeader>

            <PromptContent>{prompt.content}</PromptContent>

            {prompt.suggestions.length > 0 && (
              <SuggestionsSection>
                <SuggestionsTitle>
                  💡 优化建议
                </SuggestionsTitle>
                <SuggestionsList>
                  {prompt.suggestions.map((suggestion, idx) => (
                    <li key={idx}>{suggestion}</li>
                  ))}
                </SuggestionsList>
              </SuggestionsSection>
            )}
          </PromptCard>
        ))}
      </PromptList>

      <ButtonGroup>
        <Button variant="secondary" onClick={onBack}>
          返回
        </Button>
        <Button variant="secondary" onClick={onRegenerate}>
          重新生成
        </Button>
      </ButtonGroup>

      <Toast show={showToast}>✓ 复制成功</Toast>
    </Container>
  );
};
