import Image from 'next/image';
import TypographySlider from '@/app/exercises/TypographySlider';
import SkeletonCard from './exercises/SkeletonCard';
import Sortable from './exercises/Sortable';
import Downloader from './exercises/Downloader';
import Template from '@/app/exercises/Template';

export default function Home() {
  return (
    <div>
      <div className="flex grow py-8 ">
        <div className="container mx-auto grow">
          <Template
            subtitle="1"
            date="14 Jan 2024"
            title="Typography Slider"
            description="The slider component that controls the text size with dynamic text input"
            libraries={[
              {
                name: 'Tailwind CSS',
                link: 'https://tailwindcss.com/',
              },
              {
                name: 'Radix Slider',
                link: 'https://www.radix-ui.com/primitives/docs/components/slider',
              },
            ]}>
            <TypographySlider />
          </Template>
          <Template
            subtitle="2"
            date="14 Jan 2024"
            title="Loading card"
            description="Card loading skeleton until the content is ready and loaded"
            libraries={[
              {
                name: 'Tailwind CSS',
                link: 'https://tailwindcss.com/',
              },
            ]}>
            <SkeletonCard />
          </Template>

          <Template
            subtitle="3"
            date="22 May 2024"
            title="Drag and Drop Sortable List"
            description="Manage a list of items - create, rename, delete, duplicate and reorder in the way you want it."
            libraries={[
              { name: 'Tailwind', link: 'https://tailwindcss.com/' },
              {
                name: 'DnD Kit',
                link: 'https://dndkit.com/',
              },
            ]}>
            <Sortable />
          </Template>
          <Template
            subtitle="4"
            date="23 May 2024"
            title="Download Feedback"
            description="Delight your customers with a nice download effect."
            libraries={[
              {
                name: 'Radix Toast',
                link: 'https://www.radix-ui.com/primitives/docs/components/toast',
              },
              {
                name: 'Framer Motion',
                link: 'https://www.framer.com/motion/introduction/',
              },
            ]}>
            <Downloader />
          </Template>
        </div>
      </div>
    </div>
  );
}
