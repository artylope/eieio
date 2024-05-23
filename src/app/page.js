import Image from 'next/image';
import TypographySlider from '@/app/exercises/TypographySlider';
import SkeletonCard from './exercises/SkeletonCard';
import Sortable from './exercises/Sortable';

import Template from '@/app/exercises/Template';

export default function Home() {
  return (
    <div className="flex grow py-8 ">
      <div className="container mx-auto grow">
        <Template
          subtitle="1"
          date="14 Jan 2024"
          title="Typography Slider"
          description="The slider component that controls the text size with dynamic text input">
          <TypographySlider />
        </Template>
        <Template
          subtitle="2"
          date="14 Jan 2024"
          title="Loading card"
          description="Card loading skeleton until the content is ready and loaded">
          <SkeletonCard />
        </Template>

        <Template
          subtitle="3"
          date="22 May 2024"
          title="Drag and Drop Sortable List"
          description="Manage a list of item - create, edit, delete and reorder in the way you want it.">
          <Sortable />
        </Template>
      </div>
    </div>
  );
}
