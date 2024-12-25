import dynamic from 'next/dynamic';

import 'react-quill-new/dist/quill.snow.css';

// ref: https://www.npmjs.com/package/react-quill-new
const QuillEditor = dynamic(() => import('react-quill-new'), {
  ssr: false,
  loading: () => <p>편집기 불러오는 중...</p>,
});

interface Props {
  value?: string;
  onChange: (value: string) => void;
}

/**
 * 텍스트 에디터 컴포넌트
 * @param {object} props
 * @param {string} props.value - 초기 값
 * @param {function} props.onChange - 값 변경시 콜백 함수
 */
export default function TextEditor({ value = '', onChange }: Props) {
  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline'],
        [{ align: null }, { align: 'center' }, { align: 'right' }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['blockquote', 'link', 'image'],
      ],
    },
  };

  const handleChange = (value: string) => {
    onChange(value);
  };

  return (
    <QuillEditor
      theme="snow"
      value={value}
      onChange={handleChange}
      modules={modules}
      placeholder="본문을 입력해 주세요."
      className="quill-custom"
    />
  );
}
