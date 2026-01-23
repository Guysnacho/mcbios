import { Database } from "@/lib/supabase/types";
import { Card } from "@chakra-ui/react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { useCallback, useState } from "react";

type Video = Database["public"]["Tables"]["videos"]["Row"];

export const MemberContent = ({ videos }: { videos?: Video[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedVideos, setLoadedVideos] = useState<Set<number>>(new Set());

  const isCurrentLoaded = loadedVideos.has(currentIndex);

  const handleLoadVideo = useCallback(() => {
    setLoadedVideos((prev) => new Set(prev).add(currentIndex));
  }, [currentIndex]);

  const handlePrevious = useCallback(() => {
    if (!videos?.length) return;
    setCurrentIndex((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
  }, [videos?.length]);

  const handleNext = useCallback(() => {
    if (!videos?.length) return;
    setCurrentIndex((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
  }, [videos?.length]);

  const handleThumbnailClick = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (!videos?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="text-6xl mb-4">🎬</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          No Recordings Available Yet
        </h3>
        <p className="text-gray-500 max-w-md">
          Conference recordings will appear here once they are uploaded. Check
          back after the next conference session.
        </p>
      </div>
    );
  }

  const currentVideo = videos[currentIndex];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Conference Recordings
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Catch up on sessions you missed or revisit your favorite
          presentations. Browse through our archive of past conference
          recordings below.
        </p>
      </div>

      {/* Main Video Player */}
      <Card.Root className="mb-6 overflow-hidden shadow-lg">
        <Card.Body className="p-0">
          <div className="relative aspect-video bg-gray-900">
            {!isCurrentLoaded ? (
              // Placeholder State - prevents iframe preloading
              <div
                className="absolute inset-0 flex items-center justify-center cursor-pointer group"
                onClick={handleLoadVideo}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="z-10 flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                    <Play className="w-8 h-8 text-gray-800 ml-1" />
                  </div>
                  <span className="mt-4 text-white text-sm font-medium">
                    Click to play
                  </span>
                </div>
              </div>
            ) : (
              <iframe
                src={currentVideo.path}
                className="w-full h-full"
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            )}
          </div>

          {/* Video Info */}
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-1">
                  {currentVideo.title || "Untitled Session"}
                </h3>
                <p className="text-gray-500 text-sm">
                  {formatDate(currentVideo.date)}
                </p>
              </div>
              <span className="text-sm text-gray-400">
                {currentIndex + 1} of {videos.length}
              </span>
            </div>
          </div>
        </Card.Body>
      </Card.Root>

      {/* Navigation Controls */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <button
          onClick={handlePrevious}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700 font-medium"
          aria-label="Previous video"
        >
          <ChevronLeft className="w-5 h-5" />
          Previous
        </button>
        <button
          onClick={handleNext}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700 font-medium"
          aria-label="Next video"
        >
          Next
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Thumbnail Strip */}
      {videos.length > 1 && (
        <div className="border-t pt-6">
          <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">
            All Recordings ({videos.length})
          </h4>
          <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-300">
            {videos.map((video, index) => (
              <button
                key={video.id}
                onClick={() => handleThumbnailClick(index)}
                className={`flex-shrink-0 w-48 rounded-lg overflow-hidden transition-all duration-200 ${
                  index === currentIndex
                    ? "ring-2 ring-blue-500 ring-offset-2"
                    : "opacity-70 hover:opacity-100"
                }`}
              >
                <div className="bg-gray-800 aspect-video flex items-center justify-center">
                  <Play className="w-8 h-8 text-white/60" />
                </div>
                <div className="p-2 bg-gray-50 text-left">
                  <p className="text-xs font-medium text-gray-700 truncate">
                    {video.title || "Untitled"}
                  </p>
                  <p className="text-xs text-gray-400">
                    {formatDate(video.date)}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Helper Text */}
      <p className="text-center text-sm text-gray-400 mt-6">
        Having trouble viewing? Try refreshing the page or contact support.
      </p>
    </div>
  );
};

export default MemberContent;
