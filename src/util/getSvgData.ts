import replaceSvgIds from './replaceSvgIds';

type SvgData = {
  body: string;
  svgAttributes: Record<string, string>;
};

const getSvgData = (html: string): SvgData | null => {
  try {
    // Remove XML declaration
    const svgText = html.replace(/<\?xml[^>]*\?>\s*/, '');

    // Extract opening SVG tag
    const svgTagMatch = svgText.match(/<svg[^>]*>/);
    if (!svgTagMatch) {
      throw new Error('No SVG tag found');
    }

    const svgTag = svgTagMatch[0].replace(/[\n\t]/g, ' ');

    // Extract SVG body (content between opening and closing tags)
    let body = svgText
      .replace(/<svg[^>]*>/, '')
      .replace(/<\/svg>/, '')
      .trim();

    // Randomize IDs to prevent conflicts when multiple SVGs are on the page
    body = replaceSvgIds(body);

    // Parse SVG attributes using DOMParser (more robust than regex)
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgTag + '</svg>', 'image/svg+xml');
    const svgElement = doc.querySelector('svg');

    if (!svgElement) {
      throw new Error('Failed to parse SVG element');
    }

    // Extract all attributes
    const svgAttributes: Record<string, string> = {};
    for (let i = 0; i < svgElement.attributes.length; i++) {
      const attr = svgElement.attributes[i];
      svgAttributes[attr.name] = attr.value;
    }

    return {
      body,
      svgAttributes,
    };
  } catch (err) {
    console.error('InlineSvg: Failed to parse SVG data:', err);
    return null;
  }
};

export default getSvgData;
