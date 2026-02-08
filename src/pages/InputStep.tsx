/**
 * US-01: 输入原始提示页面
 */
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Button } from '../components/Button';
import { Textarea } from '../components/Textarea';
import { colors, spacing, typography } from '../styles/tokens';
import { SCENE_CONFIGS } from '../constants/scenes';
import type { SceneCategory } from '../types';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${spacing['2xl']};
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: ${spacing.xl};
`;

const Title = styled.h1`
  font-size: ${typography.pageTitle.fontSize};
  font-weight: ${typography.pageTitle.fontWeight};
  line-height: ${typography.pageTitle.lineHeight};
  color: ${colors.textPrimary};
  margin-bottom: ${spacing.sm};
`;

const Subtitle = styled.p`
  font-size: ${typography.body.fontSize};
  color: ${colors.textSecondary};
`;

const InputSection = styled.div`
  margin-bottom: ${spacing.lg};
`;

const SceneButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing.sm};
  margin-bottom: ${spacing.lg};
`;

const SceneButton = styled.button`
  padding: ${spacing.sm} ${spacing.md};
  background: ${colors.backgroundSecondary};
  border: 1px solid ${colors.border};
  border-radius: 6px;
  font-size: ${typography.caption.fontSize};
  color: ${colors.textPrimary};
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: ${colors.border};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${spacing.md};
`;

interface InputStepProps {
    onAnalyze: (prompt: string) => void;
    isLoading?: boolean;
}

export const InputStep: React.FC<InputStepProps> = ({ onAnalyze, isLoading }) => {
    const [prompt, setPrompt] = useState('');
    const maxLength = 300;

    const handleSceneClick = (scene: SceneCategory) => {
        const config = SCENE_CONFIGS.find(s => s.name === scene);
        if (config) {
            setPrompt(config.example);
        }
    };

    const handleSubmit = () => {
        if (prompt.trim()) {
            onAnalyze(prompt);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
            handleSubmit();
        }
    };

    return (
        <Container>
            <Header>
                <Title>提示词巧匠</Title>
                <Subtitle>让提示词创作更简单</Subtitle>
            </Header>

            <InputSection>
                <Textarea
                    label="请输入您的原始提示："
                    placeholder="例如：帮我写一篇产品介绍文案，突出产品的创新点..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={handleKeyDown}
                    maxLength={maxLength}
                    currentLength={prompt.length}
                    helperText={prompt.length > maxLength ? '已超出字数限制' : ''}
                    error={prompt.length > maxLength}
                />
            </InputSection>

            <div style={{ marginBottom: spacing.lg }}>
                <div style={{
                    fontSize: typography.caption.fontSize,
                    color: colors.textSecondary,
                    marginBottom: spacing.sm
                }}>
                    快捷选择场景：
                </div>
                <SceneButtons>
                    {SCENE_CONFIGS.map(scene => (
                        <SceneButton
                            key={scene.name}
                            onClick={() => handleSceneClick(scene.name)}
                        >
                            {scene.name}
                        </SceneButton>
                    ))}
                </SceneButtons>
            </div>

            <ButtonGroup>
                <Button
                    onClick={handleSubmit}
                    disabled={!prompt.trim() || prompt.length > maxLength || isLoading}
                >
                    {isLoading ? '分析中...' : '开始分析 ↵'}
                </Button>
            </ButtonGroup>
        </Container>
    );
};
