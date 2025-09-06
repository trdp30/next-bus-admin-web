import type { CardProps } from './types';

/**
 * Helper functions for the Card component
 */

export const getCardClasses = (props: CardProps): string => {
  const { hover, padding, shadow, border, rounded, className } = props;

  const baseClasses = 'bg-white';

  const hoverClass = hover ? 'hover:shadow-xl transition-shadow duration-300' : '';

  const paddingClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8',
  };

  const shadowClasses = {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    none: '',
  };

  const borderClass = border ? 'border border-gray-200' : '';

  const roundedClasses = {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    none: '',
  };

  return [
    baseClasses,
    hoverClass,
    paddingClasses[padding || 'md'],
    shadowClasses[shadow || 'md'],
    borderClass,
    roundedClasses[rounded || 'lg'],
    className || '',
  ].filter(Boolean).join(' ');
};

export const getCardHeaderClasses = (className?: string): string => {
  return `px-6 py-4 border-b border-gray-200 ${className || ''}`;
};

export const getCardBodyClasses = (className?: string): string => {
  return `px-6 py-4 ${className || ''}`;
};

export const getCardFooterClasses = (className?: string): string => {
  return `px-6 py-4 border-t border-gray-200 ${className || ''}`;
};
