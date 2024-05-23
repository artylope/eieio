import * as Toast from '@radix-ui/react-toast';
import { motion } from 'framer-motion';
import { Check, File } from 'lucide-react';

const DownloadToast = ({ fileSizeDownloaded, totalSize, open }) => {
  const progress = (fileSizeDownloaded / totalSize) * 100;
  const radius = 16; // radius of the circle
  const circumference = 2 * Math.PI * radius;

  return (
    <Toast.Provider swipeDirection="down">
      <Toast.Root
        className="w-[24rem] bg-white p-4 rounded-md shadow-lg flex items-start space-x-8"
        open={open}>
        {progress < 100 ? (
          <div className="flex items-center space-x-3">
            <motion.div
              className="relative flex justify-center items-center"
              style={{ width: 40, height: 40 }}>
              <div className="relative">
                <svg
                  className="flex justify-center items-center w-full h-full"
                  viewBox="0 0 36 36">
                  <circle
                    className="text-gray-200"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    cx="18"
                    cy="18"
                    r={radius}
                  />
                  <circle
                    className="text-indigo-500"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeDasharray={circumference}
                    strokeDashoffset={
                      circumference - (progress / 100) * circumference
                    }
                    strokeLinecap="round"
                    fill="none"
                    cx="18"
                    cy="18"
                    r={radius}
                  />
                </svg>
              </div>

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-zinc-600 text-xs font-medium justify-center items-center">
                <File className="text-zinc-500 w-4 h-4 stroke-2 animate-pulse" />
              </div>
            </motion.div>
            <div className="text-zinc-600 flex gap-x-2">
              <span>Downloading...</span>
              <span>{`${(fileSizeDownloaded / (1024 * 1024)).toFixed(1)}/${(
                totalSize /
                (1024 * 1024)
              ).toFixed(1)} MB`}</span>
            </div>
          </div>
        ) : (
          <motion.div
            className="flex items-center space-x-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}>
            <div className="w-10 h-10 flex justify-center items-center">
              <div className="w-8 h-8 flex justify-center items-center rounded-full bg-green-500">
                <Check className="text-white w-5 h-5 stroke-2" />
              </div>
            </div>
            <span className="text-zinc-600">Download Complete</span>
          </motion.div>
        )}
      </Toast.Root>
      <Toast.Viewport />
    </Toast.Provider>
  );
};

export default DownloadToast;
