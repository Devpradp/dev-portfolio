'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react'

interface MediaItem {
  type: 'image' | 'video'
  url: string
  alt?: string
}

interface ProjectSlideshowProps {
  media: MediaItem[]
}

export default function ProjectSlideshow({ media }: ProjectSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [volume, setVolume] = useState(1)
  const [showControls, setShowControls] = useState(false)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % media.length)
  }, [media.length])

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + media.length) % media.length)
  }, [media.length])

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index)
  }, [])

  const togglePlayPause = useCallback((e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation()
    }
    const currentVideo = videoRefs.current[currentIndex]
    if (currentVideo) {
      if (currentVideo.paused) {
        currentVideo.play().then(() => {
          setIsPlaying(true)
        }).catch((err) => {
          console.log('Play failed:', err)
          setIsPlaying(false)
        })
      } else {
        // Pause immediately
        currentVideo.pause()
        setIsPlaying(false)
        // Double-check that it's actually paused
        if (!currentVideo.paused) {
          currentVideo.pause()
        }
      }
    }
  }, [currentIndex])

  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    const currentVideo = videoRefs.current[currentIndex]
    if (currentVideo) {
      currentVideo.volume = newVolume
      currentVideo.muted = newVolume === 0
    }
  }, [currentIndex])


  const showControlsTemporarily = useCallback(() => {
    setShowControls(true)
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false)
    }, 3000)
  }, [])

  // Pause and reset all videos when switching slides - IMMEDIATE
  useEffect(() => {
    // Immediately pause, mute, and reset ALL videos
    videoRefs.current.forEach((video, index) => {
      if (video) {
        // Force pause and stop
        video.pause()
        video.currentTime = 0
        // Mute ALL videos first
        video.muted = true
        // Reload to stop any ongoing playback
        video.load()
      }
    })
    // Reset play state for the new slide
    setIsPlaying(false) // Start as paused, will be set to true when video actually plays
  }, [currentIndex])

  // Auto-play video when it becomes active
  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    let playTimeoutId: NodeJS.Timeout
    let currentVideo: HTMLVideoElement | null = null
    let cleanupFunctions: (() => void)[] = []

    // Immediately ensure all other videos are paused and muted
    videoRefs.current.forEach((video, index) => {
      if (video && index !== currentIndex) {
        video.pause()
        video.currentTime = 0
        video.muted = true
        // Stop any ongoing playback
        video.load()
      }
    })

    // Delay to ensure video element is mounted and animation is complete
    timeoutId = setTimeout(() => {
      currentVideo = videoRefs.current[currentIndex]
      if (!currentVideo || media[currentIndex]?.type !== 'video') {
        return
      }

      // Ensure this video is not muted (unless volume is 0)
      currentVideo.muted = volume === 0
      
      // Set initial volume (will be updated by separate effect)
      currentVideo.volume = volume

      // Handle play/pause events
      const handlePlay = () => {
        setIsPlaying(true)
      }
      const handlePause = () => {
        setIsPlaying(false)
      }

      // Function to reset and play video
      const resetAndPlay = () => {
        if (!currentVideo) return
        
        // Ensure video is paused and reset
        currentVideo.pause()
        currentVideo.currentTime = 0
        
        // Wait a bit for the reset to take effect, then play
        playTimeoutId = setTimeout(() => {
          if (currentVideo) {
            // Double check it's still the current video
            if (videoRefs.current[currentIndex] === currentVideo) {
              currentVideo.play().then(() => {
                setIsPlaying(true)
              }).catch((err) => {
                console.log('Video autoplay failed:', err)
                setIsPlaying(false)
              })
            }
          }
        }, 100)
      }

      // Wait for video to be ready to play
      const handleCanPlay = () => {
        resetAndPlay()
      }

      // Check if video is already ready
      if (currentVideo.readyState >= 2) {
        // Video can play, reset and play
        resetAndPlay()
      } else {
        // Wait for video to be ready to play
        currentVideo.addEventListener('canplay', handleCanPlay, { once: true })
        cleanupFunctions.push(() => {
          currentVideo?.removeEventListener('canplay', handleCanPlay)
        })
      }

      currentVideo.addEventListener('play', handlePlay)
      currentVideo.addEventListener('pause', handlePause)

      cleanupFunctions.push(() => {
        currentVideo?.removeEventListener('play', handlePlay)
        currentVideo?.removeEventListener('pause', handlePause)
        // Ensure video is paused on cleanup
        if (currentVideo) {
          currentVideo.pause()
          currentVideo.currentTime = 0
          currentVideo.muted = true
        }
      })
    }, 350) // Wait for animation to complete (300ms) + buffer

    return () => {
      clearTimeout(timeoutId)
      if (playTimeoutId) {
        clearTimeout(playTimeoutId)
      }
      cleanupFunctions.forEach((cleanup) => cleanup())
      // IMMEDIATE cleanup: pause, mute, and reset ALL videos
      videoRefs.current.forEach((video) => {
        if (video) {
          video.pause()
          video.currentTime = 0
          video.muted = true
        }
      })
    }
  }, [currentIndex, media])

  // Separate effect to update volume without resetting video
  useEffect(() => {
    const currentVideo = videoRefs.current[currentIndex]
    if (currentVideo && media[currentIndex]?.type === 'video') {
      currentVideo.volume = volume
      currentVideo.muted = volume === 0
    }
    // Ensure all other videos remain muted
    videoRefs.current.forEach((video, index) => {
      if (video && index !== currentIndex) {
        video.muted = true
      }
    })
  }, [volume, currentIndex, media])

  // Reset to first slide when media changes
  useEffect(() => {
    setCurrentIndex(0)
  }, [media])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }
    }
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPrevious()
      } else if (e.key === 'ArrowRight') {
        goToNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goToNext, goToPrevious])

  if (!media || media.length === 0) return null

  const currentMedia = media[currentIndex]

  return (
    <div 
      className="relative w-full aspect-video bg-black rounded-t-2xl overflow-hidden group"
      onMouseEnter={showControlsTemporarily}
      onMouseMove={showControlsTemporarily}
      onMouseLeave={() => {
        if (controlsTimeoutRef.current) {
          clearTimeout(controlsTimeoutRef.current)
        }
        setShowControls(false)
      }}
    >
      {/* Media Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0"
        >
          {currentMedia.type === 'video' ? (
            <video
              ref={(el) => {
                if (el) {
                  videoRefs.current[currentIndex] = el
                }
              }}
              src={currentMedia.url}
              className="w-full h-full object-cover cursor-pointer"
              onClick={(e) => {
                e.stopPropagation()
                togglePlayPause(e)
              }}
              loop
              playsInline
              preload="metadata"
            />
          ) : (
            <img
              src={currentMedia.url}
              alt={currentMedia.alt || `Slide ${currentIndex + 1}`}
              className="w-full h-full object-cover"
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Video Controls Overlay - Minimal Volume Control */}
      {currentMedia.type === 'video' && (
        <AnimatePresence>
          {showControls && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 z-20 pointer-events-none"
            >
              {/* Volume Control - Left Corner */}
              <div className="absolute bottom-4 left-4 pointer-events-auto">
                <div className="flex items-center gap-2">
                  <motion.button
                    onClick={() => {
                      const newVolume = volume === 0 ? 1 : 0
                      setVolume(newVolume)
                      const currentVideo = videoRefs.current[currentIndex]
                      if (currentVideo) {
                        currentVideo.volume = newVolume
                        currentVideo.muted = newVolume === 0
                      }
                    }}
                    className="p-1.5 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={volume === 0 ? 'Unmute' : 'Mute'}
                  >
                    {volume === 0 ? (
                      <VolumeX className="w-3.5 h-3.5 text-white" />
                    ) : (
                      <Volume2 className="w-3.5 h-3.5 text-white" />
                    )}
                  </motion.button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-20 h-0.5 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, #FF6B35 0%, #FF6B35 ${volume * 100}%, rgba(255, 255, 255, 0.2) ${volume * 100}%, rgba(255, 255, 255, 0.2) 100%)`
                    }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Navigation Arrows */}
      {media.length > 1 && (
        <>
          <motion.button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </motion.button>

          <motion.button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </motion.button>
        </>
      )}

      {/* Dot Indicators */}
      {media.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {media.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'w-8 bg-accent-light dark:bg-accent-dark'
                  : 'w-2 bg-white/50 hover:bg-white/70'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Media Type Indicator */}
      <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm">
        <span className="text-xs font-medium text-white">
          {currentMedia.type === 'video' ? 'VIDEO' : 'IMAGE'} {currentIndex + 1}/{media.length}
        </span>
      </div>
    </div>
  )
}

