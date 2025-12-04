import getSvgData from './getSvgData';

type TSvgData = { body: string; svgAttributes: { [p: string]: string } };

const cache: Map<string, TSvgData | null> = new Map();
const pendingRequests: Map<string, Promise<TSvgData | null>> = new Map();

const request = async (src: string): Promise<TSvgData | null> => {
  // Return cached result if available
  if (cache.has(src)) {
    return cache.get(src) ?? null;
  }

  // Return pending request if already in progress
  const pending = pendingRequests.get(src);
  if (pending) {
    return pending;
  }

  // Create new request using fetch (modern, simpler, better error handling)
  const requestPromise = (async () => {
    try {
      const response = await fetch(src);

      if (!response.ok) {
        throw new Error(`InlineSvg: Request failed: ${src}, status: ${response.status}`);
      }

      const text = await response.text();

      if (!text) {
        throw new Error(`InlineSvg: Empty response: ${src}`);
      }

      const svgData = getSvgData(text);
      cache.set(src, svgData);

      return svgData;
    } catch (error) {
      cache.set(src, null);
      throw error;
    } finally {
      pendingRequests.delete(src);
    }
  })();

  pendingRequests.set(src, requestPromise);
  return requestPromise;
};

export default request;
