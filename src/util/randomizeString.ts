/**
 * Generate a random alphanumeric string.
 * Used to create unique IDs for SVG elements to prevent conflicts.
 */
const randomizeString = (length = 8): string => {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  let result = '';
  for (let i = 0; i < length; i++) {
    result += charset[Math.floor(Math.random() * charset.length)];
  }

  return result;
};

export default randomizeString;
