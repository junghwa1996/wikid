import { useRouter } from 'next/router';

import Content from './components/Contents';

export default function Wiki() {
  const router = useRouter();
  const { code } = router.query;

  return (
    <>
      <div className="mt-[160px] w-full px-[100px]">
        <Content />
        <div>프로필 컴포넌트{code}</div>
      </div>
    </>
  );
}
