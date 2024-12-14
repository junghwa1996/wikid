export default function Test() {
  return (
    <div className="px-4 py-10">
      <table className="w-full border-collapse border border-gray-300">
        <thead className="border-b border-gray-300">
          <tr>
            <th className="border-r border-gray-300">컴포넌트명</th>
            <th>스타일</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border-r border-gray-300">컴포넌트명 입력</td>
            <td className="flex flex-wrap items-end gap-2">
              {/* 컴포넌트를 추가해주세요 */}
            </td>
          </tr>
          <tr>
            <td className="border-r border-gray-300">컴포넌트명 입력</td>
            <td className="flex flex-wrap items-end gap-2">
              {/* 컴포넌트를 추가해주세요 */}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
