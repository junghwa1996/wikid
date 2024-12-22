import { useState } from 'react';

import Modal from '@/components/Modal/Modal';

const styles = {
  footer:
    'flex flex-col bg-gray-600 px-[48px] py-[80px] mo:px-[20px] mo:py-[20px] h-hug',
  copyright:
    'ta:text-[16px] mo:text-[10px] mb-[10px] block text-[16px] font-bold text-white',
  infoContainer: 'mb-[30px] flex flex-col gap-[1px]',
  info: 'mo:text-[8px] text-[14px] font-regular text-white',
  linkContainer: 'flex gap-[30px] mo:gap-[15px]',
  link: 'ta:text-[14px] mo:text-[8px] font-medium text-[14px] text-white cursor-pointer hover:opacity-80',
  modalTitle: 'text-[24px] font-bold mb-[20px]',
  modalContent: 'text-[16px] leading-[1.6] whitespace-pre-line',
};

const Footer = () => {
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isFinanceModalOpen, setIsFinanceModalOpen] = useState(false);

  return (
    <footer className={styles.footer}>
      <span className={styles.copyright}>
        Copyright ⓒ Wikied. All Rights Reserved <br />
      </span>
      <div className={styles.infoContainer}>
        <span className={styles.info}>
          사업자등록번호 000-00-00000 | 통신판매신고 제2020-서울-00000호 | 대표
          : 이지은
        </span>
        <span className={styles.info}>
          서울특별시 중구 청계천로 123, 위키드빌딩
        </span>
      </div>
      <div className={styles.linkContainer}>
        <span
          className={styles.link}
          onClick={() => setIsTermsModalOpen(true)}
          onKeyDown={(e) => e.key === 'Enter' && setIsTermsModalOpen(true)}
          role="button"
          tabIndex={0}
        >
          서비스 이용약관
        </span>
        <span
          className={styles.link}
          onClick={() => setIsPrivacyModalOpen(true)}
          onKeyDown={(e) => e.key === 'Enter' && setIsPrivacyModalOpen(true)}
          role="button"
          tabIndex={0}
        >
          개인정보 취급방침
        </span>
        <span
          className={styles.link}
          onClick={() => setIsFinanceModalOpen(true)}
          onKeyDown={(e) => e.key === 'Enter' && setIsFinanceModalOpen(true)}
          role="button"
          tabIndex={0}
        >
          전자금융거래 기본약관
        </span>
      </div>

      <Modal
        isOpen={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
        width="w-[800px]"
        closeOnBackgroundClick={true}
      >
        <div>
          <h2 className={styles.modalTitle}>서비스 이용약관</h2>
          <div className={styles.modalContent}>
            {`㈜코드잇 서비스 이용약관
환영합니다.

Codeit을 이용해주셔서 감사합니다. 서비스를 이용하시거나 회원으로 가입하실 경우 본 약관에 동의하시게 되므로, 잠시 시간을 내셔서 주의 깊게 살펴봐 주시기 바랍니다.

제 1 조 (목적)
본 약관은 ㈜코드잇이 제공하는 Codeit 서비스를 이용함에 있어 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.

제 2 조 (정의)
이 약관에서 사용하는 용어의 정의는 다음과 같습니다.

“서비스"란 맞춤형 온라인 코딩 교육 프로그램을 제공하는 Codeit의 제반 서비스를 말합니다. (URL : https://www.codeit.kr 또는 https://www.codeit.com )
회사란 Codeit을 운영하는 ㈜코드잇을 말합니다.
이용자란 Codeit에 접속하여 본 약관에 따라 Codeit이 제공하는 서비스를 받는 회원 및 비회원을 말합니다.
"회원"이라 함은 Codeit에 회원등록을 한 자로서, 계속적으로 Codeit이 제공하는 서비스를 이용할 수 있는 자를 말합니다.
"비회원"이라 함은 회원에 가입하지 않고 Codeit이 제공하는 제한된 서비스를 이용하는 자를 말합니다.
“이용계약”‘이라 함은 서비스 이용과 관련하여 회사와 이용자 간에 체결하는 계약을 말합니다.
“회원 ID”라 함은 이용자의 식별과 이용자의 서비스 이용을 위하여 이용자가 선정하고 회사가 부여하는 문자와 숫자의 조합을 말합니다.`}
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
        width="w-[800px]"
        closeOnBackgroundClick={true}
      >
        <div>
          <h2 className={styles.modalTitle}>개인정보 취급방침</h2>
          <div className={styles.modalContent}>
            {`코드잇 개인정보 처리방침
㈜코드잇(이하 "회사")는 이용자의 동의를 기반으로 개인정보를 수집·이용 및 제공하고 있으며 이용자의 권리를 적극적으로 보장합니다. 회사는 준수하여야 하는 대한민국의 관계 법령을 준수하고 있으며 이용자의 소중한 개인정보를 보호함으로써 이용자가 안심하고 서비스를 이용할 수 있도록 본 개인정보처리방침을 마련하여 준수하고 있습니다.

1. 수집 및 이용 목적
목적
회사는 회원 가입 시 또는 서비스 이용 과정에서 아래와 같은 서비스 제공을 위해 필요한 최소한의 개인정보를 수집하고 있습니다.`}
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isFinanceModalOpen}
        onClose={() => setIsFinanceModalOpen(false)}
        width="w-[800px]"
        closeOnBackgroundClick={true}
      >
        <div>
          <h2 className={styles.modalTitle}>전자금융거래 기본약관</h2>
          <div className={styles.modalContent}>
            {`㈜코드잇 전자금융거래 기본약관

제1조 (목적)
이 약관은 주식회사 코드잇(이하 "회사")이 제공하는 전자금융거래에 대한 기본적인 사항을 정함으로써 전자금융거래의 안정성과 신뢰성을 확보하고 회사와 이용자의 권리·의무 관계를 명확하게 하는 것을 목적으로 합니다.`}
          </div>
        </div>
      </Modal>
    </footer>
  );
};

export default Footer;
