'use client';
import { useState, useEffect, useRef } from 'react';
import { Download } from 'lucide-react';
import DownloadToast from './Downloader/DownloadToast';
import { AnimatePresence } from 'framer-motion';

const Downloader = () => {
  const [showToast, setShowToast] = useState(false);
  const [fileSizeDownloaded, setFileSizeDownloaded] = useState(0);
  const [isDownloadComplete, setIsDownloadComplete] = useState(false);
  const downloadIntervalRef = useRef(null);

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

  const handleCancelDownload = () => {
    if (downloadIntervalRef.current) {
      clearInterval(downloadIntervalRef.current); // Clear the interval to stop the download
      downloadIntervalRef.current = null; // Reset the interval reference
    }
    setShowToast(false);
    setFileSizeDownloaded(0); // Reset the downloaded size
    setIsDownloadComplete(false);
  };
  const simulateFileDownload = (
    totalSize,
    setFileSizeDownloaded,
    setIsDownloadComplete
  ) => {
    const downloadDuration = 5000; // 5 seconds
    const updateInterval = 150; // update every 100ms
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

    downloadIntervalRef.current = interval; // Store the interval reference

    return () => clearInterval(interval); // Clear interval on unmount
  };

  return (
    <div className="p-4 flex flex-col w-full h-[20rem] justify-center items-center relative gap-y-6 -mt-8 ">
      <button
        className="relative px-4 py-3 flex justify-center items-center rounded-md bg-zinc-900 text-zinc-50 gap-x-0.5 hover:bg-zinc-800 hover:text-white disabled:bg-zinc-300"
        onClick={handleDownloadClick}
        disabled={showToast}>
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
              handleCancel={handleCancelDownload}
            />
          )}{' '}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Downloader;
