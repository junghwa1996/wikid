import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { Fragment } from 'react';

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
              className="mb-[54px] w-[170px] font-['Pretendard'] mo:mb-[44px] mo:text-20b"
            >
              {isAuthenticated && profile ? '내 위키 보기' : '위키 만들기'}
            </Button>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
            >
              <Image
                src="/images/img-wiki.png"
                alt="위키 이미지"
                width={498}
                height={590}
                className="h-auto w-auto object-contain mo:h-auto mo:w-[336px]"
                priority
              />
            </motion.div>
          </div>
        </section>
        {/* 친구의 위키 */}
        <section className={`mt-[-2px] bg-[#474d66] ${mainStyled.padding}`}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
          >
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
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                    y: [0, -10, 0], // 위아래로 부드럽게 움직임
                  }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 2,
                    y: {
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    },
                  }}
                >
                  <Image
                    src="/images/img-write.png"
                    alt="타이핑 이미지"
                    width={364}
                    height={681}
                    className="h-auto w-auto object-contain mo:h-[160px] mo:w-[133px] ta:h-[310px] ta:w-[262px]"
                    priority
                  />
                </motion.div>
              </div>

              <Image
                src="/images/img-text-dark.png"
                alt="텍스트 이미지"
                width={520}
                height={681}
                className="h-auto w-auto object-contain mo:w-[192px] ta:w-[365px]"
                priority
              />
            </div>{' '}
          </motion.div>
        </section>{' '}
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

          <div className="relative w-full overflow-hidden">
            <div
              className="animate-infinite-scroll flex gap-[70px] mo:gap-[10px] ta:gap-[20px]"
              style={{
                width: 'max-content',
              }}
            >
              {[1, 2, 3, 4, 5, 6].map((set) => (
                <Fragment key={`set-${set}`}>
                  <Image
                    key={`belt1-${set}`}
                    src="/images/img-belt1.png"
                    alt="벨트 이미지1"
                    width={360}
                    height={360}
                    className="size-[360px] object-cover mo:size-[76px] ta:size-[147px]"
                    priority
                  />
                  <Image
                    key={`belt2-${set}`}
                    src="/images/img-belt2.png"
                    alt="벨트 이미지2"
                    width={360}
                    height={360}
                    className="size-[360px] object-cover mo:size-[76px] ta:size-[147px]"
                    priority
                  />
                  <Image
                    key={`belt3-${set}`}
                    src="/images/img-belt3.png"
                    alt="벨트 이미지3"
                    width={360}
                    height={360}
                    className="size-[360px] object-cover mo:size-[76px] ta:size-[147px]"
                    priority
                  />
                  <Image
                    key={`belt4-${set}`}
                    src="/images/img-belt4.png"
                    alt="벨트 이미지4"
                    width={360}
                    height={360}
                    className="size-[360px] object-cover mo:size-[76px] ta:size-[147px]"
                    priority
                  />
                </Fragment>
              ))}
            </div>
          </div>
        </section>
        {/* view */}
        <section className={`bg-blue-50 ${mainStyled.padding} `}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
          >
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
                  className="h-auto w-auto object-contain"
                  alt="텍스트 이미지"
                  width={913}
                  height={309}
                  style={{ gridArea: 'image-comment' }}
                  priority
                />
                <div
                  className="relative size-full rounded-2xl bg-purple-100"
                  style={{ gridArea: 'image-notification' }}
                >
                  <motion.div
                    animate={{
                      rotate: [-10, 10, -10],
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="size-full"
                  >
                    <Image
                      src="/images/img-bell.png"
                      alt="벨 이미지"
                      width={297}
                      height={297}
                      className="size-full object-cover"
                      priority
                    />
                  </motion.div>
                </div>
                <Image
                  src="/images/img-text-white.png"
                  alt="알림 이미지"
                  width={575}
                  height={298}
                  className="size-full rounded-xl object-cover"
                  style={{ gridArea: 'image-notifications' }}
                  priority
                />
              </div>
            </div>{' '}
          </motion.div>
        </section>
        {/* final */}
        <section className={`bg-[#474d66] text-center ${mainStyled.padding}`}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
          >
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
            </Button>{' '}
          </motion.div>
        </section>
      </main>

      <Footers />
    </>
  );
}
