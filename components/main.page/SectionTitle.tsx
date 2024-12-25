import React from 'react';

interface SectionTitleProps {
  caption: string;
  title: string | React.ReactNode;
  align?: 'left' | 'right';
  className?: string;
}

const SectionTitle = ({
  caption,
  title,
  align = 'left',
  className = '',
}: SectionTitleProps) => {
  const alignClass = {
    left: 'text-left',
    right: 'text-right',
  }[align];

  return (
    <div className={`${alignClass} ${className}`}>
      <span className="mb-5 inline-block text-[30px] font-bold leading-[34.5px] text-green-200 mo:mb-[10px] mo:text-[10px] mo:leading-[11.5px] ta:text-[30px] ta:leading-[23px]">
        {caption}
      </span>
      <h2 className="text-nowrap text-[50px] font-normal leading-[57.5px] mo:text-[16px] mo:leading-[18.4px] ta:text-[32px] ta:leading-[36.8px]">
        {title}
      </h2>
    </div>
  );
};

export default SectionTitle;
