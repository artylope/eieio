import Image from 'next/image';
import TypographySlider from '@/app/exercises/TypographySlider';

import Template from '@/app/exercises/Template';

export default function Home() {
  return (
    <div className="flex grow py-8">
      <div className="container mx-auto grow">
        <Template
          subtitle="1"
          date="14 Jan 2024"
          title="Slider to control text size and and dynamic text display"
          description="The slider component that controls the text size with dynamic text input">
          <TypographySlider />
        </Template>
      </div>
    </div>
  );
}
