import Image from 'next/image';
import TypographySlider from '@/app/exercises/TypographySlider';
import SkeletonCard from '@/app/exercises/SkeletonCard';
import Sortable from '@/app/exercises/Sortable';
import Downloader from '@/app/exercises/Downloader';
import TextHighlighter from '@/app/exercises/TextHighlighter';

import Template from '@/app/exercises/Template';

export default function Home() {
  return (
    <div>
      <div className="flex grow py-8 ">
        <div className="container mx-auto grow">
          <Template
            id="1"
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
            id="2"
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
            id="3"
            date="22 May 2024"
            title="Drag and Drop Sortable List"
            description="Drag and drop items to manage your list. Create, rename, delete, duplicate, and reorder items exactly how you want. Enjoy smooth animations as you organise!"
            libraries={[
              { name: 'Tailwind', link: 'https://tailwindcss.com/' },
              {
                name: 'DnD Kit',
                link: 'https://dndkit.com/',
              },
              {
                name: 'Framer Motion',
                link: 'https://www.framer.com/motion/introduction/',
              },
            ]}>
            <Sortable />
          </Template>
          <Template
            id="4"
            date="23 May 2024"
            title="Download Feedback"
            description="Click the download button to simulate downloading a file to your computer. You'll receive clear and pleasant feedback on the progress. Note: This is a demo, and no actual file will be downloaded."
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
          <Template
            id="5"
            date="26 May 2024"
            title="Highlighter"
            description="Lorem Ipsum"
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
            <TextHighlighter />
          </Template>
        </div>
      </div>
    </div>
  );
}
