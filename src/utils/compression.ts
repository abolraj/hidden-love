import words from '../data/words.json';
import websites from '../data/websites.json';

export function sanitizeText(text: string): string {
  return text.trim().replace(/[ ]+/g, ' ')
    .replaceAll('$', ''); // Ignore it cause of conflict with compression system.
}

export function compressText(text: string): string {
  return text.replace(/[^\s]+/g, (match) => {
    const index = words.indexOf(match.toLowerCase());
    return index !== -1 ? `$${index}` : match;
  });
}

export function decompressText(text: string): string {
  return text.replace(/\$(\d+)/g, (_, index) => {
    const wordIndex = parseInt(index);
    return words[wordIndex] || `$${index}`;
  });
}

export function generateEncryptedUrl(encryptedData: string): string {
  const domain = websites[Math.floor(Math.random() * websites.length)];
  return `https://${domain}?q=${encryptedData}`;
}