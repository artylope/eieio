import Image from 'next/image';
import SliderDemo from '@/components/SliderDemo';

import Template from '@/components/Template';

export default function Home() {
  return (
    <div className="flex grow py-8">
      <div className="container mx-auto grow">
        <Template
          subtitle="Exercise 1"
          title="Slider and dynamic text display"
          description="The slider component that controls the text size with dynamic text input">
          <SliderDemo />
        </Template>
      </div>
    </div>
  );
}
