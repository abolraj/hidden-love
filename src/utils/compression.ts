import words from '../data/words.json';
import websites from '../data/websites.json';

export function sanitizeText(text: string): string {
  return text.trim().replace(/\s+/g, ' ')
    .replaceAll('$', ''); // Ignore it cause of conflict with compression system.
}

export function compressText(text: string): string {
  return text.split(' ').map(word => {
    // const cleanWord = word.replace(/[^a-zA-Z0-9]/g, '');
    const cleanWord = word;
    const index = words.indexOf(cleanWord.toLowerCase());
    if (index !== -1) {
      return word.replace(cleanWord, `$${index}`);
    }
    return word;
  }).join(' ');
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