import IconFaceDizzy from '@/components/Svg/IconFaceDizzy';
import ErrorMessage from '@/components/ErrorMessage';

export default function PageNotFound() {
  return (
    <div className="min-h-screen">
      <div className="container flex min-h-screen items-center justify-center">
        <div className="inline-flex gap-8 px-4 mo:flex-col mo:gap-2">
          <IconFaceDizzy width={180} height={180} className="mo:mx-auto" />

          <ErrorMessage title="페이지를 찾을 수 없습니다." code="404">
            페이지가 존재하지 않거나, 사용할 수 없는 페이지입니다.
            <br />
            입력하신 주소가 정확한지 다시 한 번 확인해주세요.
          </ErrorMessage>
        </div>
      </div>
    </div>
  );
}
