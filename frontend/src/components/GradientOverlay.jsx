import React from "react";

/**
 * GradientOverlay Component
 * 
 * Reusable React component that creates a smooth radial gradient backplate 
 * behind titles, subtitles, and buttons to guarantee text contrast over dynamic background images.
 */
export const GradientOverlay = React.forwardRef(
  (
    {
      inset = "-80px -100px",
      background = "radial-gradient(ellipse at center, rgba(12, 10, 9, 0.85) 0%, rgba(12, 10, 9, 0.75) 20%, rgba(12, 10, 9, 0.55) 45%, rgba(12, 10, 9, 0.3) 70%, rgba(12, 10, 9, 0.08) 88%, transparent 100%)",
      zIndex = 0,
      style,
      className = "",
      ...props
    },
    ref
  ) => {
    const defaultStyles = {
      position: "absolute",
      inset,
      background,
      pointerEvents: "none",
      zIndex,
    };

    return (
      <div
        ref={ref}
        aria-hidden="true"
        style={{ ...defaultStyles, ...style }}
        className={className}
        {...props}
      />
    );
  }
);

GradientOverlay.displayName = "GradientOverlay";

export default GradientOverlay;
