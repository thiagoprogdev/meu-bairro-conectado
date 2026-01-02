
import { GoogleGenAI, GenerateContentResponse, Chat } from "@google/genai";
import { ChatMessage } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Use gemini-3-flash-preview for general text tasks
export const generateText = async (prompt: string): Promise<GenerateContentResponse> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt,
        });
        return response;
    } catch (error) {
        console.error("Error generating text:", error);
        throw new Error("Failed to generate text with Gemini API.");
    }
};

// Use gemini-2.5-flash for maps grounding tasks
export const findNearbyPlaces = async (query: string, location: { latitude: number; longitude: number; }): Promise<GenerateContentResponse> => {
    try {
        const response = await ai.models.generateContent({
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

// Use gemini-3-flash-preview for vision/multimodal tasks
export const analyzeImage = async (prompt: string, imageBase64: string, mimeType: string): Promise<GenerateContentResponse> => {
    try {
        const imagePart = {
            inlineData: {
                data: imageBase64,
                mimeType,
            },
        };
        const textPart = { text: prompt };

        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: { parts: [imagePart, textPart] },
        });
        return response;
    } catch (error) {
        console.error("Error analyzing image:", error);
        throw new Error("Failed to analyze image with Gemini API.");
    }
};

// Use gemini-3-flash-preview for chat tasks
export const getChatResponse = async (history: ChatMessage[], newMessage: string) => {
    try {
        const chat: Chat = ai.chats.create({
            model: 'gemini-3-flash-preview',
            history: history.map(msg => ({
                role: msg.role,
                parts: [{ text: msg.content }]
            })),
            config: {
                systemInstruction: `Você é o assistente virtual do site "Meu Bairro Conectado". Sua principal função é ajudar os usuários a encontrar informações sobre os estabelecimentos locais.`,
            }
        });

        const responseStream = await chat.sendMessageStream({ message: newMessage });
        return responseStream;

    } catch (error) {
        console.error("Error in chat conversation:", error);
        throw new Error("Failed to get chat response from Gemini API.");
    }
};
