import Button from '@/components/Button';

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
          <tr className="border-b border-gray-300">
            <td className="border-r border-gray-300">Button</td>
            <td className="flex flex-wrap items-end gap-2">
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
