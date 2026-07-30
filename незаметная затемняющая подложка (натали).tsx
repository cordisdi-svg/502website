import React from "react";

interface GradientOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Position inset value. Adjusts how far the overlay extends beyond its parent container.
   * Format: "top right bottom left" or single value.
   * @default "-80px -100px"
   */
  inset?: string;

  /**
   * Radial gradient background configuration.
   * Eased gradient for smooth falloff without sharp lines.
   * @default "radial-gradient(ellipse at center, rgba(10, 6, 3, 0.8) 0%, rgba(10, 6, 3, 0.72) 15%, rgba(10, 6, 3, 0.56) 35%, rgba(10, 6, 3, 0.38) 55%, rgba(10, 6, 3, 0.2) 75%, rgba(10, 6, 3, 0.05) 90%, transparent 100%)"
   */
  background?: string;

  /**
   * Custom z-index.
   * @default -1
   */
  zIndex?: number | string;

  /**
   * Custom CSS styles to merge with the default positioning and background.
   */
  style?: React.CSSProperties;
}

/**
 * GradientOverlay Component
 * 
 * A reusable, performant React component designed to add a radial gradient 
 * darkening overlay behind text to improve readability over busy background images.
 */
export const GradientOverlay = React.forwardRef<HTMLDivElement, GradientOverlayProps>(
  (
    {
      inset = "-80px -100px",
      background = "radial-gradient(ellipse at center, rgba(10, 6, 3, 0.8) 0%, rgba(10, 6, 3, 0.72) 15%, rgba(10, 6, 3, 0.56) 35%, rgba(10, 6, 3, 0.38) 55%, rgba(10, 6, 3, 0.2) 75%, rgba(10, 6, 3, 0.05) 90%, transparent 100%)",
      zIndex = -1,
      style,
      className,
      ...props
    },
    ref
  ) => {
    const defaultStyles: React.CSSProperties = {
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
