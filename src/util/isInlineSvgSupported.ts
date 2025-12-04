/**
 * Check if inline SVG is supported.
 * In 2025, all modern browsers support SVG, but we still check for SSR environments.
 */
const checkIsInlineSVGSupported = (): boolean => {
  // Check if we're in a browser environment (not SSR)
  if (typeof document === 'undefined') {
    return false;
  }

  // All modern browsers support SVG, but we keep this check for completeness
  // and to handle edge cases with very old browsers
  return Boolean(
    document.createElementNS && document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect,
  );
};

export default checkIsInlineSVGSupported();
