import Image from 'next/image';
import SliderDemo from '@/components/SliderDemo';

export default function Home() {
  return (
    <div className="flex grow py-8">
      <div className="container mx-auto grow ">
        <SliderDemo />
      </div>
    </div>
  );
}
