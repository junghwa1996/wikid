import { useState } from 'react';

import Button from '@/components/Button';
import Dropdown from '@/components/Dropdown';
import LinkBar from '@/components/LinkBar';
import SnackBar from '@/components/SnackBar';

export default function Test() {
  const commonCellClass = 'border-r border-gray-300';
  const commonRowClass = 'flex flex-wrap items-end gap-2';

  // ----snackBar(start)----
  const [snackState, setSnackState] = useState<
    'fail' | 'success' | 'info' | 'null'
  >('null');

  const handleSuccess = () => {
    setSnackState('success');
    setTimeout(() => setSnackState('null'), 1500);
  };

  const handleFail = () => {
    setSnackState('fail');
    setTimeout(() => setSnackState('null'), 1500);
  };
  // ----snackBar(end)----

  //-----dropdown(start)-----
  const options = ['옵션1', '옵션2', '옵션3'];

  const handleOption1 = () => {
    console.log('옵션1');
  };

  const handleOption2 = () => {
    console.log('옵션2');
  };

  const handleOption3 = () => {
    console.log('옵션3');
  };

  const handleOptionSelect = (option: string) => {
    if (option === '옵션1') {
      handleOption1();
    } else if (option === '옵션2') {
      handleOption2();
    } else if (option === '옵션3') {
      handleOption3();
    }
  };
  //-----dropdown(end)-----

  return (
    <div className="px-4 py-10">
      <table className="w-full border-collapse border border-gray-300">
        <thead className="border-b border-gray-300">
          <tr>
            <th className={commonCellClass}>컴포넌트명</th>
            <th>스타일</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={commonCellClass}>inputfield</td>
            <td className={commonRowClass}>{/* <Signup /> */}</td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className={commonCellClass}>Button</td>
            <td className={commonRowClass}>
              <Button size="small">small</Button>
              <Button>normal</Button>
              <Button size="large">large</Button>
              <Button disabled>disabled</Button>
              <Button isLoading>isLoading</Button>
              <Button onClick={() => alert('button onClick')}>onClick</Button>
              <Button variant="secondary">secondary</Button>
              <Button variant="danger">danger</Button>
              <Button variant="dark">dark</Button>
              <Button variant="light">light</Button>
              <Button href="https://github.com/codeitFE11-part3-team7">
                link
              </Button>
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className={commonCellClass}>SnackBar</td>
            <td className={commonRowClass}>
              <SnackBar state="info" />
              <Button onClick={handleSuccess}>복사</Button>
              <Button onClick={handleFail}>에러</Button>
              {snackState !== 'null' && <SnackBar state={snackState} />}
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className={commonCellClass}>LinkBar</td>
            <td className={commonRowClass}>
              <LinkBar link="https://www.google.com" />

              <td className={commonCellClass}>inputfield</td>
              <td className={commonRowClass}>{/* <Signup /> */}</td>
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className={commonCellClass}>Dropdown</td>
            <td className={commonRowClass}>
              <Dropdown
                options={options}
                onSelect={handleOptionSelect}
                dropdownSize="w-40"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
