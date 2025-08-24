import Image from 'next/image';
import TypographySlider from '@/app/exercises/TypographySlider';
import SkeletonCard from '@/app/exercises/SkeletonCard';
import Sortable from '@/app/exercises/Sortable';
import Downloader from '@/app/exercises/Downloader';
import TextHighlighter from '@/app/exercises/TextHighlighter';
import AnimatedTextMessages from './exercises/AnimatedTextMessages';
import CoolMenu from '@/app/exercises/CoolMenu';
import ChartCard from '@/app/exercises/ChartCard';
import AudioTranscriber from '@/app/exercises/AudioTranscriber';

import Template from '@/app/exercises/Template';

// Define projects data
const projects = [
  {
    id: '1',
    date: '2024-01-14',
    title: 'Typography Slider',
    description:
      'The slider component that controls the text size with dynamic text input',
    libraries: [
      { name: 'Tailwind', link: 'https://tailwindcss.com/' },
      {
        name: 'Radix Slider',
        link: 'https://www.radix-ui.com/primitives/docs/components/slider',
      },
    ],
    component: <TypographySlider />,
  },
  {
    id: '2',
    date: '2024-01-15',
    title: 'Loading card',
    description: 'Card loading skeleton until the content is ready and loaded',
    libraries: [{ name: 'Tailwind', link: 'https://tailwindcss.com/' }],
    component: <SkeletonCard />,
  },
  {
    id: '3',
    date: '2024-05-22',
    title: 'Drag and Drop Sortable List',
    description:
      'Drag and drop items to manage your list. Create, rename, delete, duplicate, and reorder items exactly how you want. Enjoy smooth animations as you organise!',
    libraries: [
      { name: 'Tailwind', link: 'https://tailwindcss.com/' },
      { name: 'DnD Kit', link: 'https://dndkit.com/' },
      {
        name: 'Framer Motion',
        link: 'https://www.framer.com/motion/introduction/',
      },
    ],
    component: <Sortable />,
  },
  {
    id: '4',
    date: '2024-05-23',
    title: 'Download Feedback',
    description:
      "Click the download button to simulate downloading a file to your computer. You'll receive clear and pleasant feedback on the progress. Note: This is a demo, and no actual file will be downloaded.",
    libraries: [
      {
        name: 'Radix Toast',
        link: 'https://www.radix-ui.com/primitives/docs/components/toast',
      },
      {
        name: 'Framer Motion',
        link: 'https://www.framer.com/motion/introduction/',
      },
    ],
    component: <Downloader />,
  },
  {
    id: '5',
    date: '2024-06-16',
    title: 'Highlight and save to notebook',
    description:
      'Text heavy interfaces (e.g. e-books) often require interactions like highlight to save so that users can store important pieces of information they want to refer to in future. Highlight the phrases you want and click save',
    libraries: [
      { name: 'Tailwind', link: 'https://tailwindcss.com/' },
      {
        name: 'Radix Dialog',
        link: 'https://www.radix-ui.com/primitives/docs/components/dailog',
      },
    ],
    component: <TextHighlighter />,
  },
  {
    id: '6',
    date: '2024-06-19',
    title: 'Animated text messages',
    description:
      'A practice of making text messages appearing one after another',
    libraries: [
      { name: 'Tailwind', link: 'https://tailwindcss.com/' },
      {
        name: 'Framer Motion',
        link: 'https://www.framer.com/motion/introduction/',
      },
    ],
    component: <AnimatedTextMessages />,
  },
  {
    id: '7',
    date: '2024-07-07',
    title: 'Cool minimalist menu',
    description:
      'A cool minimalist menu with tooltips, for use in high touch interfaces with recurring users',
    libraries: [
      { name: 'Tailwind', link: 'https://tailwindcss.com/' },
      {
        name: 'Radix Tooltip',
        link: 'https://www.radix-ui.com/primitives/docs/components/tooltip',
      },
    ],
    component: <CoolMenu />,
  },
  {
    id: '8',
    date: '2024-09-22',
    title: 'Chart',
    description: 'Data visualisation of step count daily, weekly, and monthly.',
    libraries: [
      { name: 'Tailwind', link: 'https://tailwindcss.com/' },
      {
        name: 'Radix Tabs',
        link: 'https://www.radix-ui.com/primitives/docs/components/tabs',
      },
      { name: 'Recharts', link: 'https://recharts.org/en-US/' },
    ],
    component: <ChartCard />,
  },
  {
    id: '9',
    date: '2025-08-24',
    title: 'Record and transcribe audio',
    description:
      'Voice to text transcription with a cool UI',
    libraries: [
      { name: 'Tailwind', link: 'https://tailwindcss.com/' },
      {
        name: 'Radix Tabs',
        link: 'https://www.radix-ui.com/primitives/docs/components/tabs',
      },
      { name: 'Recharts', link: 'https://recharts.org/en-US/' },
    ],
    component: <AudioTranscriber />,
  },
];

export default function Home() {
  // Sort projects by date (most recent first)
  const sortedProjects = projects.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  // Create a date formatter
  const dateFormatter = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div>
      <div className="flex py-8 grow ">
        <div className="container mx-auto grow">
          {sortedProjects.map((project) => (
            <Template
              key={project.id}
              id={project.id}
              date={dateFormatter.format(new Date(project.date))}
              title={project.title}
              description={project.description}
              libraries={project.libraries}>
              {project.component}
            </Template>
          ))}
        </div>
      </div>
    </div>
  );
}
