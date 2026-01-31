import React from "react";

export const DnaHelix = ({
  className = "",
  color = "currentColor",
  opacity = "0.1",
}) => {
  // Generate coordinates for a more elegant, organic helix
  const points = Array.from({ length: 12 }, (_, i) => i);

  return (
    <svg
      viewBox="0 0 100 400"
      className={className}
      style={{ opacity }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Connection Rungs */}
      {points.map((p) => {
        const y = p * 35 + 10;
        const xOffset = Math.sin(p * 0.8) * 30;
        return (
          <line
            key={`rung-${p}`}
            x1={50 + xOffset}
            y1={y}
            x2={50 - xOffset}
            y2={y}
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="1 3"
          />
        );
      })}

      {/* Backbone Alpha */}
      <path
        d={`M ${points.map((p) => `${50 + Math.sin(p * 0.8) * 30} ${p * 35 + 10}`).join(" L ")}`}
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Backbone Beta */}
      <path
        d={`M ${points.map((p) => `${50 - Math.sin(p * 0.8) * 30} ${p * 35 + 10}`).join(" L ")}`}
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.5"
      />

      {/* Nucleotide Nodes */}
      {points.map((p) => {
        const y = p * 35 + 10;
        const xOffset = Math.sin(p * 0.8) * 30;
        return (
          <React.Fragment key={`nodes-${p}`}>
            <circle cx={50 + xOffset} cy={y} r="4" fill={color} />
            <circle
              cx={50 - xOffset}
              cy={y}
              r="3"
              fill="white"
              stroke={color}
              strokeWidth="1"
            />
          </React.Fragment>
        );
      })}
    </svg>
  );
};
