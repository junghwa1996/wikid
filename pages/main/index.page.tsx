import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

import Button from '@/components/Button';
import Footers from '@/components/Footers';
import { useProfileContext } from '@/hooks/useProfileContext';

import SectionTitle from './components/SectionTitle';

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
        <link
          href="https://cdn.jsdelivr.net/npm/@kfonts/nexon-lv1-gothic-low-otf@0.2.0/index.min.css"
          rel="stylesheet"
        />
        <style>
          {`
            body {
              font-family: 'NEXON Lv1 Gothic Low', sans-serif;
            }

            body {
              font-size: 6.25%;
            }

            /* 태블릿 */
            @media screen and (min-width: 744px) and (max-width: 1023px) {
              html {
                font-size: 1.3441vw;
              }
            }

            /* 모바일 */
            @media screen and (max-width: 743px) {
              html {
                font-size: 2.6667vw;
              }
            }
          `}
        </style>
      </Head>

      {/* 랜딩 본문 */}
      <main className="mt-[80px] font-['NEXON_Lv1_Gothic_Low'] tamo:mt-[60px]">
        {/* 나만의 위키 */}
        <section className="pt-[100px] mo:pt-[100px]">
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
              src="/images/img-wiki.svg"
              alt="위키 이미지"
              width={498}
              height={590}
              className="h-auto object-contain mo:w-[336px]"
              priority
            />
          </div>

          {/* bg */}
          <div className="absolute left-0 top-0 -z-10 h-[1100px] w-screen overflow-hidden bg-blue-50 mo:h-[820px]">
            <Image
              src="/images/img-landing-bg.svg"
              alt="배경 이미지"
              width={1920}
              height={400}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 mo:bottom-[195px] ta:bottom-[75px] ta:max-w-[1020px] ta:pb-[100px] pc:h-[400px] pc:max-w-[1920px]"
            />
            <div className="absolute bottom-0 left-0 w-full bg-gray-500 mo:h-[200px] ta:h-[180px] pc:hidden"></div>
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
                src="/images/img-write.svg"
                alt="타이핑 이미지"
                width={364}
                height={681}
                className="h-auto object-contain mo:w-[133px] ta:w-[262px]"
                priority
              />
            </div>

            <Image
              src="/images/img-text-dark.svg"
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
            src="/images/img-belt.svg"
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
            <div className="flex flex-wrap gap-10 mo:gap-4 ta:gap-[2.2rem]">
              <Image
                src="/images/img-comment.svg"
                className="h-auto w-full flex-1"
                alt="텍스트 이미지"
                width={924}
                height={280}
              />
              <div className="flex w-full gap-10 mo:gap-4 ta:gap-[2.2rem]">
                <Image
                  src="/images/img-bell.svg"
                  alt="벨 이미지"
                  width={280}
                  height={280}
                  className="h-auto w-full mo:w-[10.2rem] ta:w-[19.8rem]"
                />
                <Image
                  src="/images/img-alert.svg"
                  alt="알림 이미지"
                  width={604}
                  height={280}
                  className="h-auto w-full mo:w-[22.3rem] ta:w-[42.8rem]"
                />
              </div>
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
