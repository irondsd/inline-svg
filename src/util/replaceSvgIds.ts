import randomizeString from './randomizeString';

/**
 * Replace all IDs in SVG content with unique randomized IDs.
 * This prevents ID conflicts when multiple instances of the same SVG are rendered on the page.
 *
 * Handles:
 * - id="..." attributes
 * - href="#..." and xlink:href="#..." references
 * - url(#...) in CSS properties
 */

const getAttributePattern = (attr: string): string => `(?:(?:\\s|\\:)${attr})`;

// Pattern to match all ID definitions and references in SVG
const idPattern = new RegExp(
  `(?:(${getAttributePattern('id')})="([^"]+)")|(?:(${getAttributePattern(
    'href',
  )}|${getAttributePattern('role')}|${getAttributePattern(
    'arcrole',
  )})="\\#([^"]+)")|(?:="url\\(\\#([^\\)]+)\\)")|(?:url\\(\\#([^\\)]+)\\))`,
  'g',
);

const replaceSvgIds = (svgText: string): string => {
  const svgId = randomizeString();
  const getId = (id: string): string => `${svgId}__${id}`;

  return svgText.replace(
    idPattern,
    (_match: string, p1: string, p2: string, p3: string, p4: string, p5: string, p6: string): string => {
      // ID definition: id="..."
      if (p2) {
        return `${p1}="${getId(p2)}"`;
      }

      // ID reference in href: href="#..."
      if (p4) {
        return `${p3}="#${getId(p4)}"`;
      }

      // ID reference in url() with quotes: ="url(#...)"
      if (p5) {
        return `="url(#${getId(p5)})"`;
      }

      // ID reference in url() without quotes: url(#...)
      if (p6) {
        return `url(#${getId(p6)})`;
      }

      return '';
    },
  );
};

export default replaceSvgIds;
