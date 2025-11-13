import { GoogleGenAI, GenerateContentResponse, Chat } from "@google/genai";
import { ChatMessage } from '../types';

let ai: GoogleGenAI | null = null;

function getAiInstance(): GoogleGenAI {
    // FIX: Switched to process.env.API_KEY to follow @google/genai guidelines.
    // The environment variable is exposed to the client via vite.config.ts.
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        console.error("API_KEY environment variable not set. Please configure it in your .env file.");
        throw new Error("API_KEY environment variable not set");
    }
    if (!ai) {
        ai = new GoogleGenAI({ apiKey });
    }
    return ai;
}

export const generateText = async (prompt: string) => {
    try {
        const aiInstance = getAiInstance();
        const response = await aiInstance.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });
        return response;
    } catch (error) {
        console.error("Error generating text:", error);
        throw new Error("Failed to generate text with Gemini API.");
    }
};


export const findNearbyPlaces = async (query: string, location: { latitude: number; longitude: number; }) => {
    try {
        const aiInstance = getAiInstance();
        const response = await aiInstance.models.generateContent({
            model: "gemini-2.5-flash",
            contents: query,
            config: {
                tools: [{ googleMaps: {} }],
                toolConfig: {
                    retrievalConfig: {
                        latLng: {
                            latitude: location.latitude,
                            longitude: location.longitude
                        }
                    }
                }
            },
        });
        return response;
    } catch (error) {
        console.error("Error finding nearby places:", error);
        throw new Error("Failed to fetch data from Gemini API.");
    }
};

export const analyzeImage = async (prompt: string, imageBase64: string, mimeType: string) => {
    try {
        const aiInstance = getAiInstance();
        const imagePart = {
            inlineData: {
                data: imageBase64,
                mimeType,
            },
        };
        const textPart = { text: prompt };

        const response: GenerateContentResponse = await aiInstance.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: [imagePart, textPart] },
        });
        return response;
    } catch (error) {
        console.error("Error analyzing image:", error);
        throw new Error("Failed to analyze image with Gemini API.");
    }
};

export const getChatResponse = async (history: ChatMessage[], newMessage: string) => {
    try {
        const aiInstance = getAiInstance();
        const chat: Chat = aiInstance.chats.create({
            model: 'gemini-2.5-flash',
            history: history.map(msg => ({
                role: msg.role,
                parts: [{ text: msg.content }]
            }))
        });

        const responseStream = await chat.sendMessageStream({ message: newMessage });
        return responseStream;

    } catch (error) {
        console.error("Error in chat conversation:", error);
        throw new Error("Failed to get chat response from Gemini API.");
    }
};