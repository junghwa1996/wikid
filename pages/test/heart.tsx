import Heart from '@/components/Heart/Heart';

export default function HeartTest() {
  return (
    <>
      <Heart initialCount={10} />
      <Heart initialCount={10} onClick={() => console.log('클릭')} />
    </>
  );
}
