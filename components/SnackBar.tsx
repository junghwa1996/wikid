interface SnackBarProps {
  state: 'fail' | 'success' | 'info' | 'null';
}

// state props styles object
const stateConfig = {
  fail: {
    style:
      'bg-red-50 border-red-100 fixed left-1/2 transform -translate-x-1/2 top-[120px] mx-auto mo:bottom-[80px] mo:top-auto w-[384px] mo:w-[328px] whitespace-nowrap',
    text: '다른 친구가 편집하고 있어요. 나중에 다시 시도해 주세요.',
    icon: '/icon/icon-fail.svg',
    textStyle: 'text-red-100 text-14sb mo:text-12sb',
  },
  success: {
    style:
      'bg-green-100 border-green-200 fixed left-1/2 transform -translate-x-1/2 top-[120px] mx-auto mo:bottom-[80px] mo:top-auto w-[247px] mo:w-[210px] whitespace-nowrap',
    text: '내 위키 링크가 복사되었습니다.',
    icon: '/icon/icon-success.svg',
    textStyle: 'text-green-300 text-14sb mo:text-12sb',
  },
  info: {
    style: 'bg-background border-white',
    text: '앞 사람의 편집이 끝나면 위키 참여가 가능합니다.',
    icon: '/icon/icon-info.svg',
    textStyle: 'text-gray-500 text-14 mo:text-12',
  },
  null: {
    style: 'hidden',
    text: '',
    icon: '',
    textStyle: '',
  },
};

/**
 * SnackBar 컴포넌트
 * @param {SnackBarProps} { state } - state: 'fail' | 'success' | 'info' | 'null'
 */
export default function SnackBar({ state }: SnackBarProps) {
  const { style, text, icon, textStyle } = stateConfig[state];

  return (
    <div
      className={`rounded-custom ${style} animate-fadeIn flex items-center gap-[15px] border px-5 py-[11px] shadow-custom mo:px-[15px] mo:py-[11px]`}
    >
      {icon && <img src={icon} alt="snackbar icon" className="h-5 w-5" />}
      <p className={`${textStyle} break-words mo:break-words`}>{text}</p>
    </div>
  );
}
