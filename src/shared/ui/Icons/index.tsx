import React from 'react';

type IconProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;

const Icon: React.FC<IconProps & { children: React.ReactNode }> = ({ children, ...props }) => {
  return <span {...props}>{children}</span>;
};

export const ArrowIcon = (props: IconProps) => (
  <Icon {...props}>
    <svg width="13" height="9" viewBox="0 0 13 9" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0.963379 2.50436L6.46338 8.00436L11.9634 2.50436"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </Icon>
);
