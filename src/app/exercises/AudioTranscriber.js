'use client';

import { useState, useEffect, useRef } from 'react';
import { MicrophoneIcon, PlayIcon, PauseIcon } from '@heroicons/react/24/solid';

// Individual clip component
const AudioClip = ({ clip, isPlaying, onPlayPause }) => {
    const [currentWordIndex, setCurrentWordIndex] = useState(-1);
    const [audioBars] = useState(Array(20).fill(0).map(() => Math.random() * 80 + 20));
    
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
        <div className="bg-white rounded-lg p-4 shadow-sm border border-zinc-200 w-full max-w-md mb-3">
            {/* Play button and audio bars */}
            <div className="flex items-center space-x-3 mb-3">
                <button
                    onClick={onPlayPause}
                    className="w-10 h-10 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center transition-all duration-300 shadow-sm"
                >
                    {isPlaying ? <PauseIcon className="w-4 h-4" /> : <PlayIcon className="w-4 h-4" />}
                </button>
                
                {/* Audio bars */}
                <div className="flex items-end justify-center space-x-1 h-8 flex-1">
                    {audioBars.map((height, index) => (
                        <div
                            key={index}
                            className={`w-1 rounded-full transition-all duration-150 ${
                                isPlaying && index <= (currentWordIndex / clip.words.length) * 20
                                    ? 'bg-green-500'
                                    : 'bg-zinc-300'
                            }`}
                            style={{ height: `${Math.max(6, height * 0.25)}px` }}
                        />
                    ))}
                </div>
            </div>
            
            {/* Transcript with highlighting */}
            <div className="text-sm leading-relaxed text-zinc-700">
                {clip.words.map((word, index) => (
                    <span
                        key={index}
                        className={`transition-colors duration-200 ${
                            index === currentWordIndex
                                ? 'bg-yellow-300 text-black'
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

    // 10 different organic blob shapes
    const blobPaths = [
        "M100,20 C140,25 175,60 170,100 C175,140 140,175 100,170 C60,175 25,140 30,100 C25,60 60,25 100,20 Z",
        "M100,15 C145,20 180,55 175,100 C180,145 145,180 100,175 C55,180 20,145 25,100 C20,55 55,20 100,15 Z",
        "M100,25 C135,30 165,65 160,100 C165,135 135,165 100,160 C65,165 35,135 40,100 C35,65 65,30 100,25 Z",
        "M100,30 C130,20 170,50 175,100 C170,150 130,180 100,170 C70,180 30,150 25,100 C30,50 70,20 100,30 Z",
        "M100,22 C142,28 172,62 168,100 C172,138 142,172 100,168 C58,172 28,138 32,100 C28,62 58,28 100,22 Z",
        "M100,18 C138,15 185,58 180,100 C185,142 138,185 100,182 C62,185 15,142 20,100 C15,58 62,15 100,18 Z",
        "M100,35 C125,25 155,55 165,100 C155,145 125,175 100,165 C75,175 45,145 35,100 C45,55 75,25 100,35 Z",
        "M100,28 C132,22 178,68 172,100 C178,132 132,178 100,172 C68,178 22,132 28,100 C22,68 68,22 100,28 Z",
        "M100,32 C128,35 165,72 160,100 C165,128 128,165 100,160 C72,165 35,128 40,100 C35,72 72,35 100,32 Z",
        "M100,26 C134,24 176,66 174,100 C176,134 134,176 100,174 C66,176 24,134 26,100 C24,66 66,24 100,26 Z"
    ];

    // Gradient definitions
    const gradients = [
        { id: 'grad1', colors: ['#3B82F6', '#1D4ED8'] },
        { id: 'grad2', colors: ['#60A5FA', '#2563EB'] },
        { id: 'grad3', colors: ['#93C5FD', '#3B82F6'] },
        { id: 'grad4', colors: ['#DBEAFE', '#60A5FA'] },
        { id: 'grad5', colors: ['#1E40AF', '#3730A3'] }
    ];

    // Sample sentences for different clips
    const sampleTexts = [
        "Our attention is limited. There's no way we can process the tidal waves of information flowing past us constantly.",
        "Technology has fundamentally changed how we communicate and share information with one another.",
        "The future of artificial intelligence will likely reshape many aspects of our daily lives and work.",
        "Climate change represents one of the most significant challenges facing humanity in the 21st century.",
        "Innovation in renewable energy sources continues to accelerate at an unprecedented pace."
    ];

    // Animate volume bars during recording and change blob patterns
    useEffect(() => {
        if (recordingState === 'recording') {
            intervalRef.current = setInterval(() => {
                setVolumeBars(bars => bars.map(() => Math.random() * 100));
                // Change active blobs every 2 seconds for more organic movement
                if (Math.random() < 0.3) {
                    setActiveBlobIndices([
                        Math.floor(Math.random() * blobPaths.length),
                        Math.floor(Math.random() * blobPaths.length),
                        Math.floor(Math.random() * blobPaths.length)
                    ]);
                }
            }, 150);
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            setVolumeBars(Array(8).fill(0));
            setActiveBlobIndices([0, 1, 2]); // Reset to default
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
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
                {/* Animated blob background during recording */}
                {recordingState === 'recording' && (
                    <div className="absolute -inset-16 pointer-events-none">
                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
                            <defs>
                                {gradients.map(grad => (
                                    <radialGradient key={grad.id} id={grad.id} cx="50%" cy="50%" r="50%">
                                        <stop offset="0%" stopColor={grad.colors[0]} />
                                        <stop offset="100%" stopColor={grad.colors[1]} />
                                    </radialGradient>
                                ))}
                            </defs>
                            
                            {/* Layer 1 - Largest, slowest */}
                            <g className="opacity-15 animate-pulse" style={{ animationDuration: '4s', animationDelay: '0s' }}>
                                <path d={blobPaths[activeBlobIndices[0]]} fill={`url(#${gradients[0].id})`} 
                                      transform="scale(1.2) translate(-20, -20)" />
                            </g>
                            
                            {/* Layer 2 - Medium, medium speed */}
                            <g className="opacity-20 animate-ping" style={{ animationDuration: '3s', animationDelay: '0.5s' }}>
                                <path d={blobPaths[activeBlobIndices[1]]} fill={`url(#${gradients[1].id})`} 
                                      transform="scale(1.0) translate(0, 0)" />
                            </g>
                            
                            {/* Layer 3 - Smallest, fastest */}
                            <g className="opacity-25 animate-bounce" style={{ animationDuration: '2s', animationDelay: '1s' }}>
                                <path d={blobPaths[activeBlobIndices[2]]} fill={`url(#${gradients[2].id})`} 
                                      transform="scale(0.8) translate(25, 25)" />
                            </g>
                        </svg>
                    </div>
                )}

                {/* Main button container */}
                <div className="relative z-10 flex flex-col items-center">
                    {/* Recording/Mic Button */}
                    <button
                        onClick={handleMicClick}
                        disabled={recordingState === 'transcribing'}
                        className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
                            recordingState === 'recording'
                                ? 'bg-red-500 hover:bg-red-600 scale-110'
                                : recordingState === 'transcribing'
                                ? 'bg-zinc-400 cursor-not-allowed'
                                : 'bg-blue-500 hover:bg-blue-600'
                        } text-white shadow-lg`}
                    >
                        <MicrophoneIcon className="w-7 h-7" />
                    </button>

                    {/* Volume bars during recording */}
                    {recordingState === 'recording' && (
                        <div className="flex items-end justify-center space-x-1 mt-4 h-12">
                            {volumeBars.map((height, index) => (
                                <div
                                    key={index}
                                    className="w-2 bg-blue-500 rounded-t transition-all duration-150"
                                    style={{ height: `${Math.max(4, height * 0.4)}px` }}
                                />
                            ))}
                        </div>
                    )}
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