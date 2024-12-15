import Signup from '@/pages/signup';
export default function Test() {
  const commonCellClass = 'border-r border-gray-300';
  const commonRowClass = 'flex flex-wrap items-end gap-2';

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
            <td className={commonRowClass}>
              <Signup />
            </td>
          </tr>
          <tr>
            <td className={commonCellClass}>컴포넌트명 입력</td>
            <td className={commonRowClass}>{/* 컴포넌트를 추가해주세요 */}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
