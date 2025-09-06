import React from 'react';
import type { CardProps, CardHeaderProps, CardBodyProps, CardFooterProps } from './types';
import { getCardClasses, getCardHeaderClasses, getCardBodyClasses, getCardFooterClasses } from './helper';
import { useCard } from './hooks';

const Card: React.FC<CardProps> = ({ children, ...props }) => {
  const { handleMouseEnter, handleMouseLeave } = useCard(props);
  const classes = getCardClasses(props);

  return (
    <div
      className={classes}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};

const CardHeader: React.FC<CardHeaderProps> = ({ children, className }) => {
  const classes = getCardHeaderClasses(className);
  return <div className={classes}>{children}</div>;
};

const CardBody: React.FC<CardBodyProps> = ({ children, className }) => {
  const classes = getCardBodyClasses(className);
  return <div className={classes}>{children}</div>;
};

const CardFooter: React.FC<CardFooterProps> = ({ children, className }) => {
  const classes = getCardFooterClasses(className);
  return <div className={classes}>{children}</div>;
};

export { CardHeader, CardBody, CardFooter };
export default Card;
