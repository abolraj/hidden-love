export function simpleCipher(text: string, password: string, encrypt: boolean): string {
  if (!password) return text;
  
  let result = '';
  const key = password.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i);
    if (encrypt) {
      result += String.fromCharCode(charCode + key % 256);
    } else {
      result += String.fromCharCode(charCode - key % 256);
    }
  }
  
  return result;
}