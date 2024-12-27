import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import Button from './Button';
import { SITE_NAME } from 'constants/terms';

interface Props {
  code?: string;
  title: string;
  children: ReactNode;
}

export default function ErrorMessage({ code, title, children }: Props) {
  const router = useRouter();

  return (
    <div>
      {code?.trim() && (
        <div className="my-2 flex items-end gap-3">
          <span className="text-8xl font-bold text-green-200">{code}</span>
          <span className="text-32b">ERROR</span>
        </div>
      )}
      <h1 className="mb-4 text-32b mo:text-24b">{title}</h1>

      <p className="mb-8 text-balance break-keep text-18sb">{children}</p>

      <div className="flex gap-4 mo:justify-center">
        <Button onClick={router.back} variant="secondary" className="w-[140px]">
          이전 페이지
        </Button>
        <Button href="/" variant="primary" className="w-[140px]">
          {SITE_NAME} 홈
        </Button>
      </div>
    </div>
  );
}
