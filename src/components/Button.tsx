/**
 * 按钮组件
 */
import React from 'react';
import styled from '@emotion/styled';
import { colors, borderRadius, spacing } from '../styles/tokens';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'text';
    children: React.ReactNode;
}

const StyledButton = styled.button<{ variant: 'primary' | 'secondary' | 'text' }>`
  padding: 12px 24px;
  border-radius: ${borderRadius.sm};
  font-size: 16px;
  font-weight: 500;
  transition: all 0.2s;
  
  ${({ variant }) => {
        switch (variant) {
            case 'primary':
                return `
          background: ${colors.primary};
          color: ${colors.background};
          &:hover:not(:disabled) {
            opacity: 0.85;
          }
        `;
            case 'secondary':
                return `
          background: transparent;
          color: ${colors.primary};
          border: 1px solid ${colors.primary};
          &:hover:not(:disabled) {
            background: ${colors.backgroundSecondary};
          }
        `;
            case 'text':
                return `
          background: transparent;
          color: ${colors.primary};
          padding: ${spacing.sm} ${spacing.md};
          &:hover:not(:disabled) {
            text-decoration: underline;
          }
        `;
        }
    }}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    children,
    ...props
}) => {
    return (
        <StyledButton variant={variant} {...props}>
            {children}
        </StyledButton>
    );
};
