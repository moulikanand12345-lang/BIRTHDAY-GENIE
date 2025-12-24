
import { GoogleGenAI, Type } from "@google/genai";
import { BirthdayInfo, CardContent } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateBirthdayCard = async (info: BirthdayInfo): Promise<CardContent> => {
  const prompt = `Generate a personalized birthday card content for ${info.name} who is turning ${info.age}. 
  Relationship to sender: ${info.relationship}.
  Hobbies/Interests: ${info.hobbies}.
  The theme of the card is '${info.theme}'. 
  
  Instructions:
  1. Incorporate their hobbies/interests naturally into the wish or the poem.
  2. The tone should reflect the relationship (${info.relationship}).
  3. The response should be in JSON format.

  JSON structure:
  {
    "title": "A catchy thematic title",
    "wish": "A short, punchy birthday wish mentioning their age",
    "poem": "A 4-line original rhyming verse related to their age, hobbies, and the theme",
    "message": "A longer, heartfelt message (2-3 sentences) that feels unique to them"
  }
  
  Theme-specific Tones:
  - Classic: Warm, traditional, nostalgic.
  - Futuristic: Sci-fi, space, high-tech, forward-looking.
  - Minimalist: Simple, clean, profound.
  - Party: High energy, confetti-filled, fun-loving.
  - Elegant: Sophisticated, classy, refined.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            wish: { type: Type.STRING },
            poem: { type: Type.STRING },
            message: { type: Type.STRING },
          },
          required: ["title", "wish", "poem", "message"]
        },
      },
    });

    return JSON.parse(response.text.trim()) as CardContent;
  } catch (error) {
    console.error("Error generating card content:", error);
    throw new Error("Failed to generate birthday magic. Please check your connection.");
  }
};
