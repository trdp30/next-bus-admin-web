import React from 'react';
import type { ButtonProps } from './types';
import { getButtonClasses, getLoadingSpinnerClasses } from './helper';
import { useButton } from './hooks';

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  children,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = '',
  onClick,
  disabled,
  ...props
}) => {
  const { handleClick, isDisabled } = useButton({ onClick, disabled, loading });

  const buttonClasses = getButtonClasses(variant, size, fullWidth);
  const spinnerClasses = getLoadingSpinnerClasses(size);

  return (
    <button
      className={`${buttonClasses} ${className}`}
      onClick={handleClick}
      disabled={isDisabled}
      {...props}
    >
      {loading ? (
        <div className={spinnerClasses} />
      ) : (
        <>
          {leftIcon && <span className="mr-2">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="ml-2">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};

export default Button;
