import Head from 'next/head';
import Image from 'next/image';
import Button from '@/components/Button';

const styles = {
  //첫번째 섹션
  titleLine1: 'text-[60px] font-thin leading-none text-gray-500 mo:text-[40px]',
  titleLine2: 'text-[90px] font-bold leading-none text-gray-500 mo:text-[60px]',
  caption: 'text-[30px] font-bold text-green-200 ta:text-[30px]',
  captionMo: 'text-[20px] text-green-200 font-bold',
  subtitleMo: 'font-regular mt-[10px] text-[26px] leading-snug',
  subtitle: 'font-regular mt-[10px] text-[50px] leading-snug ta:text-[42px]',
  container:
    'flex w-full max-w-[924px] items-center justify-between gap-[20px] mo:flex-col mo:items-stretch',
  wrapper: 'flex w-full items-end gap-[16px]',
  textContainer: 'flex h-full flex-col items-start justify-end mo:block',
  imageContainer: 'mt-[40px]',
  imageContainerMo: 'w-1/2',
  imageWrapper: 'w-1/2',
  //두번째 섹션
  section:
    "relative flex flex-col items-center justify-center overflow-hidden bg-[#F1F4FD] pt-[200px] font-['NEXON_Lv1_Gothic_Low'] mo:pt-[160px]",
  titleWrapper: 'mb-5 mb-[40px] flex flex-col gap-[15px] text-center',
  heroImage: 'mt-[54px]',
  backgroundImage: '-z-10 mt-[-300px] w-screen',
  backgroundImageStyle: 'w-full object-cover',
  contentContainer:
    'flex h-[1412px] h-full w-full items-center justify-center bg-gray-500 text-white pt-[100px] pb-[200px] ta:h-[1059px] ta:px-[20px] ta:pt-[200px] ta:pb-[150px] mo:h-auto mo:px-[20px] mo:pt-[300px] mo:pb-[100px]',
  mobileTextContainer: 'mb-[20px]',
  mobileLayout: 'hidden mo:block',
  image: 'h-auto w-full object-contain',
};

const isMobile = true;

export default function HeroSection() {
  return (
    <>
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/@kfonts/nexon-lv1-gothic-low-otf@0.2.0/index.min.css"
          rel="stylesheet"
        />
        <style>{`
          body {
            font-family: 'NEXON Lv1 Gothic Low', sans-serif;
          }
        `}</style>
      </Head>
      <section className={styles.section}>
        <div className="z-0 flex flex-col items-center">
          <h1 className={styles.titleWrapper}>
            <div className={styles.titleLine1}>남들이 만드는</div>
            <div className={styles.titleLine2}>나만의 위키</div>
          </h1>
          <Button href="/signup" variant="dark" size="large">
            위키 만들기
          </Button>
          <div className={styles.heroImage}>
            <Image
              src="/images/img-wiki.svg"
              alt="위키 이미지"
              width={498}
              height={590}
              priority
            />
          </div>
          {/* 배경 이미지 */}
          <div className={styles.backgroundImage}>
            <Image
              src="/images/img-bg-bottom.svg"
              alt="배경 이미지"
              width={3000}
              height={590}
              className={styles.backgroundImageStyle}
              priority
            />
          </div>
        </div>
        <div className={styles.contentContainer}>
          <div className={styles.container}>
            {/* 텍스트와 이미지 영역 */}
            <div className={styles.textContainer}>
              {/* 모바일 레이아웃 */}
              <div className={styles.mobileLayout}>
                <div className={styles.mobileTextContainer}>
                  <div className={isMobile ? styles.captionMo : styles.caption}>
                    WRITE
                  </div>
                  <h2
                    className={isMobile ? styles.subtitleMo : styles.subtitle}
                  >
                    친구의 위키,
                    <br />
                    직접 작성해 봐요
                  </h2>
                </div>
                <div className={styles.wrapper}>
                  <div className={styles.imageWrapper}>
                    <Image
                      src="/images/img-write.svg"
                      alt="타이핑 이미지"
                      width={364}
                      height={681}
                      className={styles.image}
                      priority
                    />
                  </div>
                  <div className={styles.imageWrapper}>
                    <Image
                      src="/images/img-text-dark.svg"
                      alt="다크모드 텍스트 이미지"
                      width={364}
                      height={681}
                      className={styles.image}
                      priority
                    />
                  </div>
                </div>
              </div>

              {/* PC/태블릿 레이아웃 */}
              <div className="mo:hidden">
                <div className={styles.caption}>WRITE</div>
                <h2 className={styles.subtitle}>
                  친구의 위키,
                  <br />
                  직접 작성해 봐요
                </h2>
                <div className="mt-[40px]">
                  <Image
                    src="/images/img-write.svg"
                    alt="타이핑 이미지"
                    width={364}
                    height={681}
                    className="h-full w-auto object-contain"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* 오른쪽 이미지 - PC/태블릿 */}
            <div className="flex h-full items-start mo:hidden">
              <Image
                src="/images/img-text-dark.svg"
                alt="다크모드 텍스트 이미지"
                width={364}
                height={681}
                className="h-full w-auto object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
