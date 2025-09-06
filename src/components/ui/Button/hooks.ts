import { useCallback } from 'react';
import type { ButtonProps } from './types';

/**
 * Custom hooks for the Button component
 */

export const useButton = (props: ButtonProps) => {
  const { onClick, disabled, loading } = props;

  const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) {
      event.preventDefault();
      return;
    }

    onClick?.(event);
  }, [onClick, disabled, loading]);

  const isDisabled = disabled || loading;

  return {
    handleClick,
    isDisabled,
  };
};

export const useButtonState = (loading: boolean = false) => {
  const isLoading = loading;

  return {
    isLoading,
  };
};
