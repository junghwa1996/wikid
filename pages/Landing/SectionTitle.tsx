import React from 'react';

interface SectionTitleProps {
  caption: string;
  title: string | React.ReactNode;
  align?: 'left' | 'right' | 'center';
  variant?: 'default' | 'hero';
}

const SectionTitle = ({
  caption,
  title,
  align = 'left',
  variant = 'default',
}: SectionTitleProps) => {
  const alignClass = {
    left: 'text-left',
    right: 'text-right',
    center: 'text-center',
  }[align];

  if (variant === 'hero') {
    return (
      <h1 className={`${'mb-[40px] flex flex-col gap-[15px]'} ${alignClass}`}>
        <div className={'mo:text-[40px] text-[60px] font-thin leading-none text-gray-500'}>
          {caption}
        </div>
        <div className={'mo:text-[60px] text-[90px] font-bold leading-none text-gray-500'}>
          {title}
        </div>
      </h1>
    );
  }

  return (
    <div className={`${'w-full'} ${alignClass} ${'mo:pr-[20px] ta:pr-[48px]'}`}>
      <div className={'mo:text-[20px] ta:text-[30px] text-[30px] font-bold text-green-200'}>
        {caption}
      </div>
      <h2 className={'mo:text-[26px] ta:text-[42px] mt-[10px] text-[50px] font-normal leading-snug'}>
        {title}
      </h2>
    </div>
  );
};

export default SectionTitle;
