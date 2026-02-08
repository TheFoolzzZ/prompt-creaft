/**
 * 输入框组件
 */
import React from 'react';
import styled from '@emotion/styled';
import { colors, borderRadius, spacing, typography } from '../styles/tokens';

interface InputProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    helperText?: string;
    error?: boolean;
    maxLength?: number;
    currentLength?: number;
}

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
`;

const Label = styled.label`
  font-size: ${typography.body.fontSize};
  font-weight: 500;
  color: ${colors.textPrimary};
`;

const StyledTextarea = styled.textarea<{ error?: boolean }>`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${({ error }) => error ? colors.error : colors.border};
  border-radius: ${borderRadius.sm};
  font-size: ${typography.body.fontSize};
  line-height: ${typography.body.lineHeight};
  color: ${colors.textPrimary};
  background: ${colors.background};
  resize: vertical;
  min-height: 120px;
  
  &::placeholder {
    color: ${colors.textPlaceholder};
  }
  
  &:focus {
    outline: none;
    border-color: ${({ error }) => error ? colors.error : colors.primary};
  }
`;

const HelperText = styled.div<{ error?: boolean }>`
  font-size: ${typography.caption.fontSize};
  color: ${({ error }) => error ? colors.error : colors.textSecondary};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CharCount = styled.span`
  color: ${colors.textSecondary};
`;

export const Textarea: React.FC<InputProps> = ({
    label,
    helperText,
    error,
    maxLength,
    currentLength,
    ...props
}) => {
    return (
        <InputWrapper>
            {label && <Label>{label}</Label>}
            <StyledTextarea error={error} maxLength={maxLength} {...props} />
            {(helperText || maxLength) && (
                <HelperText error={error}>
                    <span>{helperText}</span>
                    {maxLength && (
                        <CharCount>
                            {currentLength || 0}/{maxLength}
                        </CharCount>
                    )}
                </HelperText>
            )}
        </InputWrapper>
    );
};
