/**
 * 卡片组件
 */
import React from 'react';
import styled from '@emotion/styled';
import { colors, borderRadius, spacing, shadows } from '../styles/tokens';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

const StyledCard = styled.div`
  background: ${colors.background};
  border: 1px solid ${colors.border};
  border-radius: ${borderRadius.md};
  padding: ${spacing.lg};
  box-shadow: ${shadows.card};
  transition: all 0.2s;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`;

export const Card: React.FC<CardProps> = ({ children, className, onClick }) => {
    return (
        <StyledCard className={className} onClick={onClick}>
            {children}
        </StyledCard>
    );
};
