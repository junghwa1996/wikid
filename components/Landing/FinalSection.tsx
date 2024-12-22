import Button from '@/components/Button';

const styles = {
  section:
    "relative flex flex-col items-center justify-center overflow-hidden bg-gray-500 py-[200px] font-['NEXON_Lv1_Gothic_Low'] ta:py-[160px] mo:py-[100px]",
  title: 'text-[60px] font-bold leading-none text-white mo:text-[30px]',
  button: 'mt-[40px] mo:h-[54px] mo:w-[169px]',
  imageWrapper: 'relative mt-[54px]',
  image: 'h-auto w-full object-contain',
};

export default function FinalSection() {
  return (
    <section className={styles.section}>
      <div className="flex h-full flex-col items-center justify-center">
        <h2 className={styles.title}>나만의 위키 만들어 보기</h2>
        <Button
          href="/signup"
          variant="light"
          size="large"
          className={styles.button}
        >
          지금 시작하기
        </Button>
      </div>
    </section>
  );
}
