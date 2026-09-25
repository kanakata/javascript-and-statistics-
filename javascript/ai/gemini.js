import { GoogleGenAI } from '@google/genai';
const ai = new GoogleGenAI({});
async function main() {
  const response = await ai.models.generateContent({
    model: 'gemini-3.5-flash',
    contents: 'Explain how AI works in a few words',
  });
  document.write(response.text);
}
await main();
