'use client';

import { useState, useEffect, useRef } from 'react';
import { MicrophoneIcon, PlayIcon, PauseIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';

// Individual clip component
const AudioClip = ({ clip, isPlaying, onPlayPause }) => {
    const [currentWordIndex, setCurrentWordIndex] = useState(-1);
    const [audioBars] = useState(Array(clip.words.length * 3).fill(0).map(() => Math.random() * 80 + 20));

    useEffect(() => {
        if (isPlaying) {
            const wordInterval = setInterval(() => {
                setCurrentWordIndex(prev => {
                    if (prev >= clip.words.length - 1) {
                        onPlayPause(); // Stop playing when done
                        return -1;
                    }
                    return prev + 1;
                });
            }, 400);

            return () => clearInterval(wordInterval);
        } else {
            setCurrentWordIndex(-1);
        }
    }, [isPlaying, clip.words.length, onPlayPause]);

    return (
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-zinc-200 w-full max-w-md mb-3">
            {/* Play button and audio bars */}
            <div className="flex items-center space-x-3 mb-3">
                <div>
                    <button
                        onClick={onPlayPause}
                        className="w-10 h-10 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white flex items-center justify-center transition-all duration-300 shadow-sm"
                    >
                        {isPlaying ? <PauseIcon className="w-4 h-4" /> : <PlayIcon className="w-4 h-4" />}
                    </button>
                </div>


                {/* Audio bars */}
                <div className="flex items-center justify-start space-x-1 h-12 flex-1 overflow-hidden">
                    <div
                        className={`flex items-center space-x-1 transition-transform duration-300 ease-linear ${isPlaying ? 'animate-scroll-left' : ''
                            }`}
                        style={{
                            animationDuration: `${clip.words.length * 0.4}s`,
                            animationDelay: '2s'
                        }}
                    >
                        {audioBars.map((height, index) => (
                            <div
                                key={index}
                                className={`w-1 flex-shrink-0 rounded-full transition-all duration-150 ${isPlaying && index <= (currentWordIndex / clip.words.length) * audioBars.length
                                    ? 'bg-zinc-900'
                                    : 'bg-zinc-300'
                                    }`}
                                style={{ height: `${Math.max(0, height * 0.33)}px` }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Transcript with highlighting */}
            <div className="text-sm leading-relaxed text-zinc-700">
                {clip.words.map((word, index) => (
                    <span
                        key={index}
                        className={`rounded-sm outline outline-transparent outline-1 ${index === currentWordIndex
                            ? 'bg-zinc-900 text-white outline-zinc-900 '
                            : index < currentWordIndex
                                ? 'text-zinc-400'
                                : 'text-zinc-700'
                            }`}
                    >
                        {word}{' '}
                    </span>
                ))}
            </div>
        </div>
    );
};

const AudioTranscriber = () => {
    const [recordingState, setRecordingState] = useState('idle'); // 'idle', 'recording', 'transcribing'
    const [clips, setClips] = useState([]);
    const [playingClipId, setPlayingClipId] = useState(null);
    const [volumeBars, setVolumeBars] = useState(Array(8).fill(0));
    const [activeBlobIndices, setActiveBlobIndices] = useState([0, 1, 2]);
    const intervalRef = useRef(null);

    // 10 custom blob SVGs
    const blobSvgs = [
        '/audiotranscriber/blob_01.svg',
        '/audiotranscriber/blob_02.svg',
        '/audiotranscriber/blob_03.svg',
        '/audiotranscriber/blob_04.svg',
        '/audiotranscriber/blob_05.svg',
        '/audiotranscriber/blob_06.svg',
        '/audiotranscriber/blob_07.svg',
        '/audiotranscriber/blob_08.svg',
        '/audiotranscriber/blob_09.svg',
        '/audiotranscriber/blob_10.svg'
    ];

    const [currentBlobIndex, setCurrentBlobIndex] = useState(0);

    // Sample sentences for different clips
    const sampleTexts = [
        "Our attention is limited. There's no way we can process the tidal waves of information flowing past us constantly.",
        "Technology has fundamentally changed how we communicate and share information with one another.",
        "The future of artificial intelligence will likely reshape many aspects of our daily lives and work.",
        "Climate change represents one of the most significant challenges facing humanity in the 21st century.",
        "Innovation in renewable energy sources continues to accelerate at an unprecedented pace."
    ];

    // Animate volume bars and morph blobs during recording
    useEffect(() => {
        if (recordingState === 'recording') {
            intervalRef.current = setInterval(() => {
                setVolumeBars(bars => bars.map(() => Math.random() * 100));
            }, 150);

            // Morph blobs every 2-3 seconds
            const morphInterval = setInterval(() => {
                setCurrentBlobIndex(prev => (prev + 1) % blobSvgs.length);
            }, 2500);

            return () => {
                clearInterval(intervalRef.current);
                clearInterval(morphInterval);
            };
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            setVolumeBars(Array(8).fill(0));
            setCurrentBlobIndex(0); // Reset to first blob
        }
    }, [recordingState, blobSvgs.length]);

    const handleMicClick = () => {
        if (recordingState === 'idle') {
            setRecordingState('recording');
            setTimeout(() => {
                setRecordingState('transcribing');
                setTimeout(() => {
                    // Create new clip
                    const newClip = {
                        id: Date.now(),
                        text: sampleTexts[clips.length % sampleTexts.length],
                        words: sampleTexts[clips.length % sampleTexts.length].split(' ')
                    };
                    setClips(prev => [...prev, newClip]); // Add to end of array
                    setRecordingState('idle'); // Reset to idle for next recording
                }, 1000);
            }, 3000);
        } else if (recordingState === 'recording') {
            setRecordingState('transcribing');
            setTimeout(() => {
                // Create new clip
                const newClip = {
                    id: Date.now(),
                    text: sampleTexts[clips.length % sampleTexts.length],
                    words: sampleTexts[clips.length % sampleTexts.length].split(' ')
                };
                setClips(prev => [newClip, ...prev]); // Add to beginning of array
                setRecordingState('idle'); // Reset to idle for next recording
            }, 1000);
        }
    };

    const handleClipPlayPause = (clipId) => {
        if (playingClipId === clipId) {
            setPlayingClipId(null); // Stop playing
        } else {
            setPlayingClipId(clipId); // Start playing this clip
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 p-8">
            {/* Clips container - stacked above recording button */}
            {clips.length > 0 && (
                <div className="flex flex-col items-center mb-8 max-h-96 overflow-y-auto">
                    {clips.map((clip) => (
                        <AudioClip
                            key={clip.id}
                            clip={clip}
                            isPlaying={playingClipId === clip.id}
                            onPlayPause={() => handleClipPlayPause(clip.id)}
                        />
                    ))}
                </div>
            )}

            {/* Recording section */}
            <div className="relative">
                {/* Main button container */}
                <div className="relative flex flex-col items-center">
                    {/* Animated blob background behind button - only visible during recording */}
                    {recordingState === 'recording' && (
                        <div className="absolute inset-0 -m-20 pointer-events-none">
                            {/* Layer 1 - Background blob */}
                            <motion.div className="absolute inset-0 opacity-15">
                                <motion.img
                                    key={`layer1-${currentBlobIndex}`}
                                    src={blobSvgs[currentBlobIndex]}
                                    alt=""
                                    className="w-full h-full object-contain animate-pulse"
                                    style={{ animationDuration: '4s' }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 1.5, ease: "easeInOut" }}
                                />
                            </motion.div>

                            {/* Layer 2 - Middle blob */}
                            <motion.div className="absolute inset-0 opacity-25">
                                <motion.img
                                    key={`layer2-${currentBlobIndex}`}
                                    src={blobSvgs[(currentBlobIndex + 1) % blobSvgs.length]}
                                    alt=""
                                    className="w-full h-full object-contain animate-ping"
                                    style={{ animationDuration: '3s' }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 1.2, ease: "easeInOut" }}
                                />
                            </motion.div>

                            {/* Layer 3 - Front blob */}
                            <motion.div className="absolute inset-0 opacity-35">
                                <motion.img
                                    key={`layer3-${currentBlobIndex}`}
                                    src={blobSvgs[(currentBlobIndex + 2) % blobSvgs.length]}
                                    alt=""
                                    className="w-full h-full object-contain animate-bounce"
                                    style={{ animationDuration: '2s' }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.8, ease: "easeInOut" }}
                                />
                            </motion.div>
                        </div>
                    )}

                    {/* Recording/Mic Button with volume bars inside */}
                    <div className="relative z-10">
                        <button
                            onClick={handleMicClick}
                            disabled={recordingState === 'transcribing'}
                            className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 relative overflow-hidden ${recordingState === 'recording'
                                ? 'bg-red-500 hover:bg-red-600 scale-110'
                                : recordingState === 'transcribing'
                                    ? 'bg-zinc-400 cursor-not-allowed'
                                    : 'bg-zinc-900 hover:bg-zinc-800'
                                } text-white shadow-lg`}
                        >
                            {/* Volume bars inside the button during recording */}
                            {recordingState === 'recording' && (
                                <div className="absolute inset-0 flex items-center justify-center opacity-30">
                                    <div className="flex items-end justify-center space-x-1 h-8">
                                        {volumeBars.map((height, index) => (
                                            <div
                                                key={index}
                                                className="w-1 bg-white rounded-full transition-all duration-150"
                                                style={{ height: `${Math.max(4, height * 0.3)}px` }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            <MicrophoneIcon className="w-7 h-7 relative z-10" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Status text */}
            <div className="mt-8 text-center">
                {recordingState === 'idle' && (
                    <p className="text-zinc-600">Click to start recording</p>
                )}
                {recordingState === 'recording' && (
                    <p className="text-red-600 animate-pulse">Recording... Click to stop</p>
                )}
                {recordingState === 'transcribing' && (
                    <p className="text-blue-600">Transcribing...</p>
                )}
            </div>
        </div>
    );
};

export default AudioTranscriber;