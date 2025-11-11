
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { getChatResponse } from '../services/geminiService';
import { GenerateContentResponse } from '@google/genai';

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = async () => {
        if (input.trim() === '' || isLoading) return;

        const userMessage: ChatMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const stream = await getChatResponse(messages, input);
            let fullResponse = "";
            setMessages(prev => [...prev, { role: 'model', content: "" }]);
            
            for await (const chunk of stream) {
                const chunkText = chunk.text;
                fullResponse += chunkText;
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1].content = fullResponse;
                    return newMessages;
                });
            }
        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, { role: 'model', content: "Desculpe, ocorreu um erro. Tente novamente." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 bg-green-800 text-white rounded-full p-4 shadow-lg hover:bg-green-700 transition-transform transform hover:scale-110 focus:outline-none z-50"
                aria-label="Open chatbot"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9.5 13.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm5 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
                </svg>
            </button>
            {isOpen && (
                <div className="fixed bottom-24 right-6 w-full max-w-sm h-full max-h-[600px] bg-white rounded-lg shadow-2xl flex flex-col z-50 border border-gray-200">
                    <header className="bg-green-800 text-white p-4 flex justify-between items-center rounded-t-lg">
                        <h3 className="font-bold text-lg">Assistente Virtual</h3>
                        <button onClick={() => setIsOpen(false)} className="text-white hover:text-green-200">&times;</button>
                    </header>
                    <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-xs md:max-w-sm rounded-lg px-4 py-2 my-1 ${msg.role === 'user' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-800'}`}>
                                    <p className="whitespace-pre-wrap">{msg.content}</p>
                                </div>
                            </div>
                        ))}
                         {isLoading && (
                             <div className="flex justify-start">
                                 <div className="bg-gray-200 text-gray-800 rounded-lg px-4 py-2 my-1">
                                     <div className="flex items-center space-x-2">
                                         <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
                                         <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-75"></div>
                                         <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-150"></div>
                                     </div>
                                 </div>
                             </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="p-4 border-t bg-white rounded-b-lg">
                        <div className="flex">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Digite sua mensagem..."
                                className="flex-1 border rounded-l-md p-2 focus:ring-green-500 focus:border-green-500"
                                disabled={isLoading}
                            />
                            <button onClick={handleSend} disabled={isLoading} className="bg-green-800 text-white px-4 rounded-r-md hover:bg-green-700 disabled:bg-gray-400">
                                Enviar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Chatbot;
