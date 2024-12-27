export default function CommentEmpty() {
  return (
    <div className="mt-[56px] flex h-[192px] w-full flex-col items-center justify-center gap-[20px] rounded-custom text-gray-400 mo:h-[184px] mo:gap-[16px]">
      <div className="text-center text-16 mo:text-14">
        <p>아직 작성된 댓글이 없네요.</p>
        <p>댓글을 남겨주세요!</p>
      </div>
    </div>
  );
}
