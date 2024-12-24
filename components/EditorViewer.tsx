/**
 * @param {string} content - 에디터 리턴 content
 */
export default function EditorViewer({ content }: { content: string }) {
  if (!content) return null;

  return (
    <div
      dangerouslySetInnerHTML={{ __html: content }}
      className="contentStyle"
    />
  );
}
