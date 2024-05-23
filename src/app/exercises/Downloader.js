'use client';
import { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import DownloadToast from './Downloader/DownloadToast';
import { AnimatePresence } from 'framer-motion';

const Downloader = () => {
  const [showToast, setShowToast] = useState(false);
  const [fileSizeDownloaded, setFileSizeDownloaded] = useState(0);
  const [isDownloadComplete, setIsDownloadComplete] = useState(false);

  const totalSize = 3 * 1024 * 1024;

  useEffect(() => {
    if (isDownloadComplete) {
      handleDownloadComplete();
    }
  }, [isDownloadComplete]);

  const handleDownloadClick = () => {
    setShowToast(true);
    setIsDownloadComplete(false);
    setFileSizeDownloaded(0);
    simulateFileDownload(
      totalSize,
      setFileSizeDownloaded,
      setIsDownloadComplete
    );
  };

  const handleDownloadComplete = () => {
    setTimeout(() => {
      setShowToast(false);
    }, 1000); // Hide the toast 1 second after download completes
  };

  const simulateFileDownload = (
    totalSize,
    setFileSizeDownloaded,
    setIsDownloadComplete
  ) => {
    const downloadDuration = 5000; // 5 seconds
    const updateInterval = 100; // update every 100ms
    const totalSteps = downloadDuration / updateInterval;
    const incrementSize = totalSize / totalSteps;

    let currentSize = 0;

    const interval = setInterval(() => {
      currentSize += incrementSize;
      setFileSizeDownloaded(currentSize);
      if (currentSize >= totalSize) {
        clearInterval(interval);
        setIsDownloadComplete(true);
      }
    }, updateInterval);

    return () => clearInterval(interval); // Clear interval on unmount
  };

  return (
    <div className="p-4 flex flex-col w-full h-[20rem] justify-center items-center relative gap-y-6 -mt-12">
      <p className="italic text-sm text-zinc-600 text-center">
        This is a demo. No real file is <s>harmed</s> downloaded in the process.
      </p>
      <button
        className="px-4 py-3 flex justify-center items-center rounded-md bg-zinc-900 text-zinc-50 gap-x-0.5 hover:bg-zinc-800 hover:text-white"
        onClick={handleDownloadClick}>
        <Download className="w-5 h-5" />
        <span className="px-2">Download</span>
      </button>

      <div className="absolute bottom-0 mb-4 flex grow w-full justify-center items-end">
        <AnimatePresence
          onExitComplete={() => setShowToast(false)} // Ensure state changes only after exit animation
        >
          {showToast && (
            <DownloadToast
              fileSizeDownloaded={fileSizeDownloaded}
              totalSize={totalSize}
            />
          )}{' '}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Downloader;
