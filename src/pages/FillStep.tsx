/**
 * US-03: 填写要素内容页面
 */
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { colors, spacing, typography } from '../styles/tokens';
import type { PromptElement, ElementContent } from '../types';
import { ELEMENT_CONFIGS } from '../constants/elements';

const Container = styled.div`
  max-width: 900px;
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

const Subtitle = styled.p`
  font-size: ${typography.body.fontSize};
  color: ${colors.textSecondary};
`;

const ElementsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.lg};
  margin-bottom: ${spacing.lg};
`;

const ElementCard = styled(Card)``;

const ElementHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${spacing.md};
`;

const ElementTitle = styled.div`
  font-size: ${typography.cardTitle.fontSize};
  font-weight: ${typography.cardTitle.fontWeight};
  color: ${colors.textPrimary};
`;

const DimensionBadge = styled.span`
  font-size: ${typography.caption.fontSize};
  color: ${colors.textSecondary};
  background: ${colors.backgroundSecondary};
  padding: ${spacing.xs} ${spacing.sm};
  border-radius: 4px;
`;

const ElementDescription = styled.div`
  font-size: ${typography.caption.fontSize};
  color: ${colors.textSecondary};
  margin-bottom: ${spacing.md};
`;

const ElementInput = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${colors.border};
  border-radius: 8px;
  font-size: ${typography.body.fontSize};
  line-height: ${typography.body.lineHeight};
  color: ${colors.textPrimary};
  background: ${colors.background};
  resize: vertical;
  min-height: 80px;
  
  &::placeholder {
    color: ${colors.textPlaceholder};
  }
  
  &:focus {
    outline: none;
    border-color: ${colors.primary};
  }
`;

const AddElementSection = styled.div`
  margin-bottom: ${spacing.lg};
`;

const AddElementButton = styled.button`
  width: 100%;
  padding: ${spacing.md};
  border: 2px dashed ${colors.border};
  border-radius: 8px;
  background: transparent;
  color: ${colors.textSecondary};
  font-size: ${typography.body.fontSize};
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: ${colors.primary};
    color: ${colors.primary};
  }
`;

const AddElementDropdown = styled.select`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${colors.border};
  border-radius: 8px;
  font-size: ${typography.body.fontSize};
  color: ${colors.textPrimary};
  background: ${colors.background};
  cursor: pointer;
  margin-top: ${spacing.sm};
  
  &:focus {
    outline: none;
    border-color: ${colors.primary};
  }
`;

const GenerateSection = styled.div`
  margin-bottom: ${spacing.lg};
`;

const GenerateLabel = styled.div`
  font-size: ${typography.body.fontSize};
  font-weight: 500;
  color: ${colors.textPrimary};
  margin-bottom: ${spacing.sm};
`;

const GenerateOptions = styled.div`
  display: flex;
  gap: ${spacing.md};
`;

const GenerateOption = styled.button<{ selected: boolean }>`
  flex: 1;
  padding: ${spacing.md};
  border: 2px solid ${({ selected }) => selected ? colors.primary : colors.border};
  border-radius: 8px;
  background: ${({ selected }) => selected ? colors.backgroundSecondary : 'transparent'};
  color: ${colors.textPrimary};
  font-size: ${typography.body.fontSize};
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: ${colors.primary};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${spacing.md};
`;

interface FillStepProps {
  scene: string;
  goal: string;
  recommendedElements: PromptElement[];
  onGenerate: (contents: ElementContent[], count: 5 | 10) => void;
  onBack: () => void;
  isLoading?: boolean;
}

export const FillStep: React.FC<FillStepProps> = ({
  scene,
  goal,
  recommendedElements,
  onGenerate,
  onBack,
  isLoading,
}) => {
  const [elementContents, setElementContents] = useState<ElementContent[]>(
    recommendedElements.map(element => ({ element, content: '' }))
  );
  const [showAddElement, setShowAddElement] = useState(false);
  const [generateCount, setGenerateCount] = useState<5 | 10>(5);

  const handleContentChange = (element: PromptElement, content: string) => {
    setElementContents(prev =>
      prev.map(ec => (ec.element === element ? { ...ec, content } : ec))
    );
  };

  const handleAddElement = (element: PromptElement) => {
    if (!elementContents.find(ec => ec.element === element)) {
      setElementContents(prev => [...prev, { element, content: '' }]);
    }
    setShowAddElement(false);
  };

  const availableElements = ELEMENT_CONFIGS.filter(
    config => !elementContents.find(ec => ec.element === config.name)
  );

  const hasContent = elementContents.some(ec => ec.content.trim());

  const handleGenerate = () => {
    const filledContents = elementContents.filter(ec => ec.content.trim());
    onGenerate(filledContents, generateCount);
  };

  return (
    <Container>
      <Header>
        <Title>📝 请填写以下要素</Title>
        <Subtitle>基于：{scene} / {goal}</Subtitle>
      </Header>

      <ElementsGrid>
        {elementContents.map(({ element }) => {
          const config = ELEMENT_CONFIGS.find(c => c.name === element);
          if (!config) return null;

          return (
            <ElementCard key={element}>
              <ElementHeader>
                <ElementTitle>{config.name}</ElementTitle>
                <DimensionBadge>{config.dimension}</DimensionBadge>
              </ElementHeader>
              <ElementDescription>{config.description}</ElementDescription>
              <ElementInput
                placeholder={config.placeholder}
                value={elementContents.find(ec => ec.element === element)?.content || ''}
                onChange={(e) => handleContentChange(element, e.target.value)}
              />
            </ElementCard>
          );
        })}
      </ElementsGrid>

      <AddElementSection>
        {!showAddElement ? (
          <AddElementButton onClick={() => setShowAddElement(true)}>
            + 添加更多要素
          </AddElementButton>
        ) : (
          <AddElementDropdown
            onChange={(e) => handleAddElement(e.target.value as PromptElement)}
            value=""
          >
            <option value="">选择要添加的要素...</option>
            {availableElements.map(config => (
              <option key={config.name} value={config.name}>
                {config.name} - {config.description}
              </option>
            ))}
          </AddElementDropdown>
        )}
      </AddElementSection>

      <GenerateSection>
        <GenerateLabel>选择生成数量：</GenerateLabel>
        <GenerateOptions>
          <GenerateOption
            selected={generateCount === 5}
            onClick={() => setGenerateCount(5)}
          >
            生成 5 条
          </GenerateOption>
          <GenerateOption
            selected={generateCount === 10}
            onClick={() => setGenerateCount(10)}
          >
            生成 10 条
          </GenerateOption>
        </GenerateOptions>
      </GenerateSection>

      <ButtonGroup>
        <Button variant="secondary" onClick={onBack}>
          返回
        </Button>
        <Button onClick={handleGenerate} disabled={!hasContent || isLoading}>
          {isLoading ? '生成中...' : '生成提示词 →'}
        </Button>
      </ButtonGroup>
    </Container>
  );
};
