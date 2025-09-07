import { useCallback } from 'react';
import type { CardProps } from './types';

/**
 * Custom hooks for the Card component
 */

export const useCard = (props: Omit<CardProps, 'children'>) => {
  const { hover } = props;

  const handleMouseEnter = useCallback(() => {
    if (hover) {
      // Add any hover-specific logic here
    }
  }, [hover]);

  const handleMouseLeave = useCallback(() => {
    if (hover) {
      // Add any hover-specific logic here
    }
  }, [hover]);

  return {
    handleMouseEnter,
    handleMouseLeave,
  };
};
