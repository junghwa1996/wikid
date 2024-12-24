import Image from 'next/image';
import SectionTitle from './SectionTitle';



function ViewSection() {
  return (
    <section className="mo:px-[20px] mo:py-[100px] ta:px-[48px] ta:py-[160px] flex w-full items-center justify-center bg-blue-100 py-[120px] font-['NEXON_Lv1_Gothic_Low']">
      <div className="w-full max-w-[924px]">
        <SectionTitle
          caption="VIEW"
          title={
            <>
              친구들이 달아준
              <br />
              내용을 확인해 봐요
            </>
          }
          align="left"
        />
        <div>
          <div className="mo:mt-[40px] mo:gap-[10px] ta:mt-[80px] ta:gap-[22px] pc:gap-[40px] mt-[120px] flex flex-col rounded-lg">
            <Image
              src="/images/img-text-green.svg"
              className="h-auto w-full"
              alt="텍스트 이미지"
              width={924}
              height={280}
            />

            <div className="mo:gap-[10px] ta:gap-[22px] pc:gap-[40px] flex justify-between">
              <div className="rounded-lg bg-purple-100">
                <Image
                  src="/images/img-bell.svg"
                  alt="벨 이미지"
                  width={280}
                  height={280}
                />
              </div>
              <div>
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
      </div>
    </section>
  );
}

export default ViewSection;
