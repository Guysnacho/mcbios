"use client";

export function WordCloud() {
  const words = [
    {
      text: "Healthcare",
      size: "text-4xl",
      color: "text-[var(--gold)]",
      top: "10%",
      left: "20%",
    },
    {
      text: "AI Medicine",
      size: "text-2xl",
      color: "text-[var(--off-white)]",
      top: "25%",
      left: "60%",
    },
    {
      text: "Digital Health",
      size: "text-xl",
      color: "text-[var(--gold)]/80",
      top: "40%",
      left: "10%",
    },
    {
      text: "Precision Medicine",
      size: "text-lg",
      color: "text-[var(--off-white)]/90",
      top: "55%",
      left: "70%",
    },
    {
      text: "Data Science",
      size: "text-3xl",
      color: "text-[var(--gold)]",
      top: "20%",
      left: "40%",
    },
    {
      text: "Innovation",
      size: "text-2xl",
      color: "text-[var(--off-white)]",
      top: "65%",
      left: "30%",
    },
    {
      text: "Biomarkers",
      size: "text-xl",
      color: "text-[var(--gold)]/80",
      top: "35%",
      left: "50%",
    },
    {
      text: "Therapeutics",
      size: "text-3xl",
      color: "text-[var(--off-white)]",
      top: "50%",
      left: "15%",
    },
    {
      text: "Clinical AI",
      size: "text-lg",
      color: "text-[var(--gold)]/70",
      top: "70%",
      left: "60%",
    },
    {
      text: "Health Tech",
      size: "text-xl",
      color: "text-[var(--off-white)]/80",
      top: "15%",
      left: "75%",
    },
    {
      text: "Omics",
      size: "text-base",
      color: "text-[var(--gold)]/60",
      top: "80%",
      left: "20%",
    },
    {
      text: "Drug Discovery",
      size: "text-lg",
      color: "text-[var(--off-white)]/70",
      top: "30%",
      left: "80%",
    },
    {
      text: "Personalized",
      size: "text-xl",
      color: "text-[var(--gold)]/80",
      top: "75%",
      left: "45%",
    },
  ];

  return (
    <div className="relative w-96 h-96 mx-auto">
      {/* Background Circle */}
      <div className="absolute inset-0 rounded-full border-2 border-[var(--gold)]/30 bg-gradient-to-br from-[var(--maroon)]/20 to-transparent"></div>

      {/* Word Cloud */}
      <div className="relative w-full h-full">
        {words.map((word, index) => (
          <div
            key={index}
            className={`absolute ${word.size} ${word.color} font-medium transition-all duration-500 hover:scale-110 cursor-default select-none`}
            style={{
              top: word.top,
              left: word.left,
              transform: "translate(-50%, -50%)",
              textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
              animation: `float ${3 + index * 0.2}s ease-in-out infinite`,
              animationDelay: `${index * 0.1}s`,
            }}
          >
            {word.text}
          </div>
        ))}
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translate(-50%, -50%) translateY(0px);
          }
          50% {
            transform: translate(-50%, -50%) translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
}
