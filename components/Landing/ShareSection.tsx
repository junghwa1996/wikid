import Head from 'next/head';
import Image from 'next/image';

const styles = {
  // 섹션
  section:
    "relative flex flex-col items-center justify-center overflow-hidden bg-[#F1F4FD] h-[1051px] ta:h-[676px] mo:h-[376px] font-['NEXON_Lv1_Gothic_Low']",
  container: 'flex flex-col h-full items-center justify-center',
  contentWrapper:
    'flex flex-col w-full max-w-[924px] items-center gap-[120px] ta:gap-[80px] mo:gap-[40px]',
  // 텍스트
  textContainer: 'text-right w-full ta:pr-[48px] mo:pr-[20px]',
  caption: 'text-[30px] font-bold text-green-200 ta:text-[30px] mo:text-[20px]',
  title:
    'font-regular mt-[10px] text-[50px] leading-snug ta:text-[42px] mo:text-[26px]',
  // 이미지
  imageWrapper: 'w-screen relative',
  image: 'w-full h-auto object-cover',
};

export default function ShareSection() {
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
        <div className={styles.container}>
          <div className={styles.contentWrapper}>
            {/* 상단 텍스트 */}
            <div className={styles.textContainer}>
              <div className={styles.caption}>SHARE</div>
              <h2 className={styles.title}>
                내 위키 만들고
                <br />
                친구에게 공유해요
              </h2>
            </div>

            <div className={styles.imageWrapper}>
              <Image
                src="/images/img-belt.svg"
                alt="벨트 이미지"
                width={1920}
                height={200}
                className={styles.image}
                priority
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
