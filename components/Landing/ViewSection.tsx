import Image from 'next/image';

const styles = {
  // 섹션
  section:
    "bg-landing-bold w-full font-['NEXON_Lv1_Gothic_Low'] py-[120px] ta:py-[160px] mo:py-[100px] ta:px-[48px] mo:px-[20px] flex items-center justify-center",
  contentWrapper: 'w-full max-w-[924px]',

  // 텍스트 컨테이너
  textContainer: 'text-left w-full',
  caption: 'text-[30px] font-bold text-green-200 ta:text-[30px] mo:text-[20px]',
  title:
    'font-regular mt-[10px] text-[50px] leading-snug ta:text-[42px] mo:text-[26px]',

  // 콘텐츠 영역
  contentBox:
    'ta:mt-20 mt-[120px] ta:gap-[22px] gap-[40px] mt-10 flex flex-col gap-[10px]',
  greenImage: 'h-auto w-full',

  // 알림 영역
  notificationContainer:
    'ta:gap-[22px] gap-[40px] flex justify-between gap-[10px]',
  bellBox: 'rounded-[10px] bg-purple-100',
  messageBox: '',
};

const ViewSection = () => {
  return (
    <section className={styles.section}>
      <div className={styles.contentWrapper}>
        <div className={styles.textContainer}>
          <p className={styles.caption}>VIEW</p>
          <p className={styles.title}>
            친구들이 달아준
            <br />
            내용을 확인해 봐요
          </p>
        </div>

        <div className={styles.contentBox}>
          <Image
            src="/images/img-text-green.svg"
            className={styles.greenImage}
            alt="텍스트 이미지"
            width={924}
            height={280}
          />

          <div className={styles.notificationContainer}>
            <div className={styles.bellBox}>
              <Image
                src="/images/img-bell.svg"
                alt="벨 이미지"
                width={280}
                height={280}
              />
            </div>
            <div className={styles.messageBox}>
              <Image
                src="/images/img-text-white.svg"
                alt="알림 텍스트"
                width={604}
                height={280}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ViewSection;
