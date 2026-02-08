/**
 * 标签/徽章组件
 */
import React from 'react';
import styled from '@emotion/styled';
import { colors, spacing, typography } from '../styles/tokens';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'core' | 'enhanced' | 'suggestion';
}

const StyledBadge = styled.span<{ variant: 'core' | 'enhanced' | 'suggestion' }>`
  display: inline-block;
  padding: ${spacing.xs} ${spacing.sm};
  font-size: ${typography.badge.fontSize};
  font-weight: ${typography.badge.fontWeight};
  line-height: ${typography.badge.lineHeight};
  border-radius: 4px;
  
  ${({ variant }) => {
        switch (variant) {
            case 'core':
                return `
          background: ${colors.badgeCore};
          color: ${colors.badgeCoreText};
        `;
            case 'enhanced':
                return `
          background: ${colors.badgeEnhanced};
          color: ${colors.badgeEnhancedText};
        `;
            case 'suggestion':
                return `
          background: ${colors.badgeSuggestion};
          color: ${colors.badgeSuggestionText};
        `;
        }
    }}
`;

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'enhanced' }) => {
    return <StyledBadge variant={variant}>{children}</StyledBadge>;
};
