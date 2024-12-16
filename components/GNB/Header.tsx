import { useRouter } from 'next/router';

export default function Header() {
  const router = useRouter();

  return (
    <div className="flex items-center gap-10">
      <button onClick={() => router.push('/')}>
        <img src="/logo.svg" alt="위키드 로고" />
      </button>
      <button className="mo:hidden" onClick={() => router.push('/wikilist')}>
        위키목록
      </button>
      <button className="mo:hidden" onClick={() => router.push('/boards')}>
        자유게시판
      </button>
    </div>
  );
}
