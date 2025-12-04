'use client';

import React, { forwardRef, useEffect, useCallback, useState } from 'react';

import isInlineSvgSupported from './util/isInlineSvgSupported';
import request from './util/request';

type SvgData = {
  body: string;
  svgAttributes: object;
};

export type InlineSvgProps = {
  className?: string;
  src: string;
  aspect?: number;
};

export const InlineSvg = React.memo(
  forwardRef<SVGSVGElement, InlineSvgProps>((props, ref) => {
    const { className, src, aspect = 1 } = props;

    const [svgData, setSvgData] = useState<SvgData | null>(null);

    const handleLoad = useCallback((src: string) => {
      let isCancelled = false;

      (async () => {
        try {
          const svgData = await request(src);
          if (!isCancelled) setSvgData(svgData);
        } catch (error) {
          if (!isCancelled) console.warn('InlineSvg: Failed to load SVG:', error);
        }
      })();

      // Cleanup function to prevent state updates on unmounted component
      return () => {
        isCancelled = true;
      };
    }, []);

    useEffect(() => {
      if (!isInlineSvgSupported) {
        console.warn('InlineSVG: Unsupported browser');

        return;
      }

      if (src) {
        return handleLoad(src);
      }

      console.error('InlineSVG: Empty src');
    }, [src, handleLoad]);

    const { body, svgAttributes } = svgData || {};

    if (body && svgAttributes) {
      return React.createElement('svg', {
        className,
        draggable: false,
        ...svgAttributes,
        dangerouslySetInnerHTML: { __html: body },
        role: 'icon',
      });
    }

    return <svg ref={ref} className={className} viewBox={`0 0 ${aspect} 1`} role="icon" />;
  }),
);

InlineSvg.displayName = 'InlineSvg';
