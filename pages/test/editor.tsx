import { useState } from 'react';

import TextEditor from '@/components/TextEditor';

const cellStyle = 'px-4 py-2';
const trStyle = 'border-b';

export default function Editor() {
  const [value, setValue] = useState('');

  const handleChange = (v: string) => {
    // console.log('value', v);
    setValue(v);
  };

  return (
    <div className="flex table-fixed items-center justify-center">
      <table className="w-[1000px]">
        <thead>
          <tr className={trStyle}>
            <th scope="col" className={cellStyle}>
              props
            </th>
            <th scope="col" className={cellStyle}>
              example
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className={trStyle}>
            <td className={cellStyle}>
              <ul>
                <li>value: string</li>
                <li>onChange: (value: string) =&gt; void</li>
              </ul>
            </td>
            <td className={cellStyle}>
              <div className="h-[300px] w-[600px]">
                <TextEditor value={value} onChange={handleChange} />
              </div>
              <hr className="my-4" />
              <p className="font-bold">
                참고: 에디터의 크기는 에디터 부모의 100%가 적용되니 부모의
                크기를 정의하시면 됩니다.
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
