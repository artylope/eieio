import Image from 'next/image';
import SliderDemo from '@/components/SliderDemo';

export default function Home() {
  return (
    <div className="flex grow py-8">
      <div className="container mx-auto grow ">
        <div className="flex flex-col">
          <p>Sliders</p>
          <p>Dropdown</p>
          <p>Modal</p>
          <p>Sidebar collapse</p>
          <p>Stepper pages</p>
          <p>Loaders</p>
          <p>Skeleton loaders</p>
        </div>
        <SliderDemo />
      </div>
    </div>
  );
}
