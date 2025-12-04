# InlineSVG

A lightweight TypeScript/React library that makes it effortless to inline SVG files directly into your applications. Load SVG files and insert them into the DOM with automatic ID conflict resolution and caching.

## Features

✨ **Simple API** - Just pass an SVG source path and get it rendered  
🚀 **Performance** - Built-in caching and request deduplication  
🔄 **ID Conflict Resolution** - Automatically handles ID conflicts when multiple SVG instances exist  
📦 **Lightweight** - Minimal dependencies (React only as peer dependency)  
🌐 **Browser Compatible** - Works with all modern browsers  
⚙️ **Server-Side Rendering Safe** - Detects SSR environments and handles gracefully  
📝 **TypeScript** - Fully typed for excellent developer experience  

## Installation

```bash
npm install @irondsd/inline-svg
```

## Quick Start

```tsx
import { InlineSvg } from '@irondsd/inline-svg';

export function MyComponent() {
  return <InlineSvg src="/path/to/icon.svg" />;
}
```

## API

### `InlineSvg` Component

A React component that inlines SVG files into your application.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | Required | Path to the SVG file to load and inline |
| `className` | `string` | - | CSS class name to apply to the rendered SVG element |
| `aspect` | `number` | `1` | Aspect ratio for the SVG viewBox when no SVG data is loaded (useful for preventing layout shift) |
| `ref` | `ForwardedRef<SVGSVGElement>` | - | Ref to the SVG element |

## Usage Examples

### Basic Icon

```tsx
import { InlineSvg } from '@irondsd/inline-svg';

export function IconButton() {
  return (
    <button>
      <InlineSvg src="/icons/heart.svg" />
      Like
    </button>
  );
}
```

### With Styling

```tsx
export function StyledIcon() {
  return <InlineSvg src="/icons/star.svg" className="w-8 h-8 text-blue-500" />;
}
```

### With Custom Aspect Ratio

```tsx
export function LogoPlaceholder() {
  // Prevents layout shift while SVG is loading
  return <InlineSvg src="/logo.svg" aspect={16 / 9} />;
}
```

### With Ref

```tsx
import { useRef } from 'react';

export function InteractiveSvg() {
  const svgRef = useRef<SVGSVGElement>(null);

  const handleClick = () => {
    if (svgRef.current) {
      svgRef.current.classList.toggle('active');
    }
  };

  return <InlineSvg ref={svgRef} src="/icons/toggle.svg" onClick={handleClick} />;
}
```

## How It Works

1. **Fetches SVG** - When the component mounts, it fetches the SVG file from the provided source
2. **Parses Content** - Extracts the SVG body and attributes from the fetched content
3. **Resolves ID Conflicts** - Automatically randomizes all IDs in the SVG to prevent conflicts when multiple instances of the same SVG are rendered
4. **Caches Result** - Subsequent requests for the same SVG are served from cache
5. **Renders** - The SVG is rendered inline with all attributes preserved

### ID Conflict Resolution

The library automatically handles:
- `id=""` attributes
- `href="#..."` and `xlink:href="#..."` references
- `url(#...)` in CSS properties
- `role="#..."` and `arcrole="#..."` attributes

This ensures that multiple instances of the same SVG on a page don't have conflicting IDs.

## Browser Support

- ✅ Chrome/Edge (all versions)
- ✅ Firefox (all versions)
- ✅ Safari 10+
- ✅ All modern browsers

The library detects SSR environments and safely handles them without errors.

## Performance Considerations

**Caching** - SVG files are cached after the first request, so subsequent renders are instant

**Request Deduplication** - If multiple components request the same SVG simultaneously, the request is only made once

**Memoization** - The component is memoized to prevent unnecessary re-renders

## Error Handling

The library gracefully handles errors:
- Network failures are logged as warnings
- Missing SVG sources are logged as errors
- The component renders an empty SVG placeholder if loading fails

```tsx
// Console output on error
// "InlineSvg: Failed to load SVG: ..."
// "InlineSVG: Unsupported browser"
// "InlineSVG: Empty src"
```

## Migration from Previous Versions

If you've been using this component in your projects, migration is straightforward:

```tsx
// Before: Copy-pasting the component
import InlineSvg from './components/InlineSvg';

// After: Import from package
import { InlineSvg } from '@irondsd/inline-svg';
```

## TypeScript Support

The package is fully typed. You can import the type definitions:

```tsx
import { InlineSvg, InlineSvgProps } from '@irondsd/inline-svg';

const props: InlineSvgProps = {
  src: '/icon.svg',
  className: 'icon',
  aspect: 1,
};
```

## Requirements

- **React** 16.8+ (for hooks support)
- **Node.js** 14+ (for development)

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Publish
npm publish --access public
```

## License

MIT © [irondsd](https://github.com/irondsd)

## Repository

[github.com/irondsd/inline-svg](https://github.com/irondsd/inline-svg)

---

**Happy inlining SVGs!** 🎨
