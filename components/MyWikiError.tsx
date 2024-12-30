import { ReactNode } from 'react';
import Button from './Button';
import { SITE_NAME } from 'constants/terms';

interface Props {
  title: string;
  buttonPosition?: 'left' | 'right';
  children: ReactNode;
}

export default function MyWikiError({
  title,
  buttonPosition = 'left',
  children,
}: Props) {
  const buttonRightStyle = buttonPosition === 'right' && 'justify-end';

  return (
    <div>
      <div className="my-2 flex items-end gap-3">
        <span className="text-8xl font-bold text-green-200 mo:text-32b ta:text-6xl">
          {title}
        </span>
      </div>

      <p className="mb-4 mt-8 text-balance break-keep text-18sb">{children}</p>

      <div
        className={`flex gap-4 text-balance mo:justify-center ${buttonRightStyle}`}
      >
        <Button href="/" variant="secondary" className="w-[140px]">
          {SITE_NAME} 홈
        </Button>
        <Button href="/mypage" variant="primary" className="w-[140px]">
          마이 페이지
        </Button>
      </div>
    </div>
  );
}
