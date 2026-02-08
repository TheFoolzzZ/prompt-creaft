/**
 * 设计系统 - Design Tokens
 * 基于 PRD 设计规范
 */

export const colors = {
  // 主色
  primary: '#000000',
  
  // 背景色
  background: '#FFFFFF',
  backgroundSecondary: '#F5F5F5',
  
  // 边框色
  border: '#E0E0E0',
  
  // 文字色
  textPrimary: '#333333',
  textSecondary: '#666666',
  textPlaceholder: '#999999',
  
  // 状态色
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  
  // 标签色
  badgeCore: '#000000',
  badgeCoreText: '#FFFFFF',
  badgeEnhanced: '#F5F5F5',
  badgeEnhancedText: '#333333',
  badgeSuggestion: '#FEF3C7',
  badgeSuggestionText: '#92400E',
} as const;

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
} as const;

export const typography = {
  fontFamily: '"Inter", "PingFang SC", "Microsoft YaHei", sans-serif',
  
  pageTitle: {
    fontSize: '32px',
    fontWeight: 700,
    lineHeight: 1.2,
  },
  
  moduleTitle: {
    fontSize: '24px',
    fontWeight: 700,
    lineHeight: 1.3,
  },
  
  cardTitle: {
    fontSize: '18px',
    fontWeight: 600,
    lineHeight: 1.4,
  },
  
  body: {
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: 1.6,
  },
  
  caption: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: 1.5,
  },
  
  badge: {
    fontSize: '12px',
    fontWeight: 500,
    lineHeight: 1,
  },
} as const;

export const borderRadius = {
  sm: '8px',
  md: '12px',
} as const;

export const shadows = {
  card: '0 2px 8px rgba(0, 0, 0, 0.04)',
} as const;
