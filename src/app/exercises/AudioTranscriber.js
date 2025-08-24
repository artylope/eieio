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

    // 10 blob path data for true morphing
    const blobPaths = [
        "M26.7705 2.59292C31.5766 5.28916 34.7954 10.0212 35.7237 15.4018C36.6428 20.7294 35.2742 26.2958 31.5416 30.2484C27.9304 34.0725 22.5199 35.1185 17.2262 34.9897C11.7316 34.8559 5.8584 33.8817 2.55643 29.5431C-0.80301 25.1289 -0.380025 19.1724 1.14544 13.8601C2.6619 8.57933 5.57748 3.57142 10.6557 1.33855C15.8344 -0.93851 21.8415 -0.172261 26.7705 2.59292Z",
        "M19.1064 0.236005C22.395 0.791891 25.1739 2.73461 27.7886 4.9124C30.6327 7.28123 33.9831 9.58175 34.8002 13.3075C35.6256 17.0709 33.7357 20.8119 32.0245 24.2264C30.3942 27.4796 28.1967 30.2934 25.2786 32.3074C22.1759 34.4488 18.7004 36.2311 15.0013 35.9755C11.1876 35.712 7.61906 33.7374 4.90239 30.8994C2.24138 28.1197 0.690079 24.3851 0.160971 20.4728C-0.348459 16.706 0.373692 12.9 2.00957 9.50941C3.60074 6.2115 6.06731 3.45932 9.18568 1.7679C12.2329 0.115068 15.7235 -0.335803 19.1064 0.236005Z",
        "M24.9011 2.48144C29.7338 4.87925 33.9033 8.69475 35.3116 14.0289C36.7902 19.6293 35.9408 25.8995 32.2387 30.2729C28.6932 34.4614 22.9532 35.0282 17.5603 34.999C12.2173 34.97 6.50821 34.3393 3.08039 30.1148C-0.421598 25.7989 -0.519543 19.7329 0.728884 14.2557C1.96538 8.83087 4.76095 3.67697 9.6491 1.29596C14.4989 -1.06636 20.0679 0.0833439 24.9011 2.48144Z",
        "M27.3171 6.58869C29.8784 8.8399 32.8059 10.7885 34.0301 14.0098C35.2906 17.3267 35.333 21.1001 34.0957 24.4261C32.8981 27.6449 30.0562 29.7006 27.4043 31.8192C24.6726 34.0018 21.9755 36.4177 18.5374 36.8563C14.8524 37.3263 10.8515 36.6861 7.96019 34.2995C5.13302 31.9657 4.78843 27.8992 3.48261 24.4291C2.09446 20.7403 -0.524991 17.2949 0.09273 13.3926C0.74716 9.25829 3.49924 5.68974 6.83293 3.2639C10.1298 0.864876 14.2803 -0.486367 18.2748 0.161972C21.9892 0.764872 24.4631 4.08027 27.3171 6.58869Z",
        "M27.0003 1.44444C30.6026 3.42123 31.8493 7.47481 33.5571 11.0044C35.2466 14.4962 37.6467 18.0272 36.8383 21.7773C36.0291 25.5314 32.4842 28.0934 29.3356 30.5883C26.2909 33.0009 23.0462 35.3485 19.0694 35.857C15.038 36.3724 10.8387 35.4823 7.46414 33.3848C4.24157 31.3818 2.41312 28.0647 1.10467 24.6908C-0.110415 21.5577 -0.247312 18.2645 0.326239 14.9795C0.921514 11.57 1.89797 8.14977 4.43605 5.60989C7.11268 2.93136 10.7871 1.34999 14.6606 0.634916C18.8054 -0.130228 23.368 -0.548781 27.0003 1.44444Z",
        "M18.7647 0.215179C24.1409 0.890568 28.6646 3.90831 31.7637 8.0926C34.9833 12.4395 37.0077 17.6871 35.4818 22.7859C33.8848 28.1224 29.5176 32.5017 23.9291 34.2725C18.5373 35.9809 12.666 34.5282 7.97479 31.5017C3.64361 28.7075 1.50603 24.1025 0.620655 19.2352C-0.317892 14.0757 -0.656978 8.38384 3.06065 4.48672C6.88826 0.474315 13.0819 -0.498733 18.7647 0.215179Z",
        "M25.9803 1.41794C28.8802 3.22768 29.7529 6.92883 31.1477 10.0918C32.5035 13.1664 34.2624 16.172 33.9672 19.53C33.6558 23.072 32.1274 26.5527 29.4956 28.8842C26.9235 31.1627 23.3772 31.649 19.9813 31.92C16.7539 32.1775 13.5301 31.8507 10.6266 30.3899C7.63726 28.8858 5.23468 26.5079 3.47888 23.6172C1.5485 20.4391 -0.663142 16.8399 0.187311 13.203C1.03029 9.59803 4.85562 7.83254 7.70688 5.53658C10.2596 3.48098 12.7066 1.28055 15.882 0.564855C19.2629 -0.197151 23.0267 -0.425382 25.9803 1.41794Z",
        "M19.6764 0.00264944C23.5716 0.101705 27.1669 2.11854 30.055 4.74268C32.959 7.38137 35.1978 10.8014 35.8305 14.6806C36.4496 18.4763 35.3068 22.3086 33.4709 25.6851C31.7319 28.8832 29.0479 31.414 25.8221 33.0867C22.6856 34.713 19.1721 35.2092 15.653 34.9239C12.0263 34.6299 8.2806 33.8975 5.58486 31.446C2.87955 28.9858 1.9328 25.2775 1.11892 21.7065C0.283906 18.0427 -0.781229 14.0895 0.859016 10.7105C2.48647 7.35795 6.37302 6.06246 9.60615 4.22267C12.8498 2.37691 15.9485 -0.0921503 19.6764 0.00264944Z",
        "M19.4181 0.199324C22.8995 0.674362 26.0048 2.31913 28.7881 4.49693C31.7768 6.83546 35.2015 9.31747 35.8886 13.0868C36.5712 16.8308 33.9619 20.2084 32.2718 23.6067C30.6791 26.8092 29.285 30.2025 26.3696 32.2266C23.3162 34.3465 19.5862 35.1442 15.892 34.979C12.023 34.8059 8.05423 33.8921 5.15903 31.2779C2.25691 28.6575 0.886759 24.7547 0.256886 20.8615C-0.349305 17.1148 0.112827 13.2866 1.69141 9.84517C3.24736 6.45303 5.75515 3.56358 9.00163 1.79703C12.175 0.0702769 15.8505 -0.287475 19.4181 0.199324Z",
        "M26.5911 3.50743C29.8126 5.56161 33.0197 8.00438 34.3353 11.6287C35.6451 15.2374 34.8131 19.2118 33.6155 22.8605C32.4735 26.3398 30.5123 29.4408 27.7238 31.7717C24.9081 34.1253 21.5432 35.9726 17.8963 35.9998C14.326 36.0264 11.2443 33.8946 8.25193 31.9169C5.24935 29.9326 1.93227 27.9885 0.640243 24.5956C-0.655359 21.1933 0.228038 17.3935 1.40955 13.9487C2.52462 10.6975 4.6297 8.0461 7.11827 5.70805C9.78765 3.20014 12.5779 0.468511 16.1923 0.0600459C19.9072 -0.35977 23.4257 1.48903 26.5911 3.50743Z"
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
                setCurrentBlobIndex(prev => (prev + 1) % blobPaths.length);
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
    }, [recordingState, blobPaths.length]);

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
                            <div className="absolute inset-0 opacity-15">
                                <svg width="100%" height="100%" viewBox="0 0 37 37" className="w-full h-full">
                                    <defs>
                                        <radialGradient id="grad1" cx="50%" cy="50%" r="50%">
                                            <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.6" />
                                            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.8" />
                                        </radialGradient>
                                    </defs>
                                    <motion.path
                                        d={blobPaths[currentBlobIndex]}
                                        fill="url(#grad1)"
                                        initial={false}
                                        animate={{ d: blobPaths[currentBlobIndex] }}
                                        transition={{ duration: 2.0, ease: "easeInOut" }}
                                    />
                                </svg>
                            </div>

                            {/* Layer 2 - Middle blob */}
                            <div className="absolute inset-0 opacity-25">
                                <svg width="100%" height="100%" viewBox="0 0 37 37" className="w-full h-full">
                                    <defs>
                                        <radialGradient id="grad2" cx="40%" cy="60%" r="50%">
                                            <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.7" />
                                            <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.9" />
                                        </radialGradient>
                                    </defs>
                                    <motion.path
                                        d={blobPaths[(currentBlobIndex + 3) % blobPaths.length]}
                                        fill="url(#grad2)"
                                        initial={false}
                                        animate={{ d: blobPaths[(currentBlobIndex + 3) % blobPaths.length] }}
                                        transition={{ duration: 1.8, ease: "easeInOut" }}
                                    />
                                </svg>
                            </div>

                            {/* Layer 3 - Front blob */}
                            <div className="absolute inset-0 opacity-35">
                                <svg width="100%" height="100%" viewBox="0 0 37 37" className="w-full h-full">
                                    <defs>
                                        <radialGradient id="grad3" cx="60%" cy="40%" r="50%">
                                            <stop offset="0%" stopColor="#DBEAFE" stopOpacity="0.8" />
                                            <stop offset="100%" stopColor="#93C5FD" stopOpacity="1" />
                                        </radialGradient>
                                    </defs>
                                    <motion.path
                                        d={blobPaths[(currentBlobIndex + 6) % blobPaths.length]}
                                        fill="url(#grad3)"
                                        initial={false}
                                        animate={{ d: blobPaths[(currentBlobIndex + 6) % blobPaths.length] }}
                                        transition={{ duration: 1.5, ease: "easeInOut" }}
                                    />
                                </svg>
                            </div>
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