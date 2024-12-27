import { ReactNode } from 'react';
import Spinner from './Spinner';

interface Props {
  children?: ReactNode;
}

export default function FullCoverSpinner({ children }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-2 bg-[#ffffff66]">
      <Spinner />
      <span className="text-14sb text-gray-400">{children}</span>
    </div>
  );
}
