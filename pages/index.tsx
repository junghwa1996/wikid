import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

import Button from '@/components/Button';
import Footers from '@/components/Footers';
import { useProfileContext } from '@/hooks/useProfileContext';

import SectionTitle from '../components/main.page/SectionTitle';

export default function LandingPage() {
  const router = useRouter();
  const { isAuthenticated, profile } = useProfileContext();

  const handleButtonClick = async () => {
    try {
      if (!isAuthenticated) {
        await router.push('/login');
      } else if (!profile) {
        await router.push('/mypage');
      } else {
        await router.push(profile.code ? `/wiki/${profile.code}` : '/wiki');
      }
    } catch (error) {
      console.error('Navigation failed:', error);
    }
  };

  const mainStyled = {
    container: 'container max-w-[1020px] px-[48px] mo:px-8 ta:px-[48px]',
    padding: 'py-[200px] mo:py-[100px] ta:py-[160px]',
  };

  return (
    <>
      <Head>
        <style>
          {`
            body {
              font-family: 'NEXON Lv1 Gothic Low', sans-serif;
            }
          `}
        </style>
      </Head>

      {/* 랜딩 본문 */}
      <main className="mt-[80px] font-['NEXON_Lv1_Gothic_Low'] tamo:mt-[60px]">
        {/* 나만의 위키 */}
        <section className="my-wikied">
          <div className={`flex flex-col items-center ${mainStyled.container}`}>
            <h1 className="mb-[40px] text-center">
              <p className="flex flex-col gap-[15px] text-[90px] font-bold leading-none text-gray-500 mo:text-[60px]">
                <span className="text-[60px] font-thin leading-none mo:text-[40px]">
                  남들이 만드는
                </span>
                나만의 위키
              </p>
            </h1>
            <Button
              onClick={handleButtonClick}
              variant="dark"
              size="large"
              className="mb-[54px] font-['Pretendard'] mo:mb-[44px] mo:text-20b"
            >
              {isAuthenticated && profile ? '위키 구경하기' : '위키 만들기'}
            </Button>
            <Image
              src="/images/img-wiki.png"
              alt="위키 이미지"
              width={498}
              height={590}
              className="h-auto object-contain mo:w-[336px]"
              priority
            />
          </div>
        </section>

        {/* 친구의 위키 */}
        <section className={`mt-[-2px] bg-[#474d66] ${mainStyled.padding}`}>
          <div
            className={`flex items-center justify-center gap-10 mo:gap-[10px] ta:gap-5 ${mainStyled.container}`}
          >
            <div>
              <SectionTitle
                caption="WRITE"
                className="mb-[60px] text-[#fff] mo:mb-[30px] ta:mb-[40px]"
                title={
                  <>
                    친구의 위키,
                    <br />
                    직접 작성해 봐요
                  </>
                }
                align="left"
              />
              <Image
                src="/images/img-write.png"
                alt="타이핑 이미지"
                width={364}
                height={681}
                className="h-auto object-contain mo:w-[133px] ta:w-[262px]"
                priority
              />
            </div>

            <Image
              src="/images/img-text-dark.png"
              alt="텍스트 이미지"
              width={520}
              height={681}
              className="h-auto object-contain mo:w-[192px] ta:w-[365px]"
              priority
            />
          </div>
        </section>

        {/* share */}
        <section className={mainStyled.padding}>
          <SectionTitle
            caption="SHARE"
            className={`mb-[120px] mo:mb-[40px] ta:mb-[80px] ${mainStyled.container}`}
            align="right"
            title={
              <>
                내 위키 만들고
                <br />
                친구에게 공유해요
              </>
            }
          />

          <Image
            src="/images/img-belt.png"
            alt="벨트 이미지"
            width={1920}
            height={200}
            className="w-full object-cover"
            priority
          />
        </section>

        {/* view */}
        <section className={`bg-blue-50 ${mainStyled.padding} `}>
          <div className={mainStyled.container}>
            <SectionTitle
              caption="VIEW"
              className="mb-[120px] mo:mb-[40px] ta:mb-[80px]"
              title={
                <>
                  친구들이 달아준
                  <br />
                  내용을 확인해 봐요
                </>
              }
              align="left"
            />
            <div
              className="grid gap-10 mo:gap-[0.7rem] ta:gap-8"
              style={{
                gridTemplateAreas: `
                "image-comment image-comment"
                "image-notification image-notifications"
              `,
                gridTemplateColumns: '297fr 575fr',
              }}
            >
              <Image
                src="/images/img-text-green.png"
                className="h-auto w-full object-cover"
                alt="텍스트 이미지"
                width={913}
                height={309}
                style={{ gridArea: 'image-comment' }}
              />
              <Image
                src="/images/img-bell.png"
                alt="벨 이미지"
                width={297}
                height={297}
                className="size-full rounded-2xl object-cover"
                style={{ gridArea: 'image-notification' }}
              />
              <Image
                src="/images/img-text-white.png"
                alt="알림 이미지"
                width={575}
                height={298}
                className="size-full rounded-xl object-cover"
                style={{ gridArea: 'image-notifications' }}
              />
            </div>
          </div>
        </section>

        {/* final */}
        <section className={`bg-[#474d66] text-center ${mainStyled.padding}`}>
          <h2 className="text-[60px] font-bold leading-none text-white mo:text-[30px]">
            나만의 위키 만들어 보기
          </h2>
          <Button
            onClick={handleButtonClick}
            variant="light"
            size="large"
            className="mt-[40px] font-['Pretendard'] mo:h-[54px] mo:w-[169px] mo:text-20b"
          >
            지금 시작하기
          </Button>
        </section>
      </main>

      <Footers />
    </>
  );
}
