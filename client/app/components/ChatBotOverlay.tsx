import { useEffect, useState } from 'react';

export default function ChatBotOverlay() {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div className="fixed bottom-0 right-0 p-4">
            {isVisible ? (
                <div className="bg-white shadow-lg rounded-lg p-4 relative">
                    <h2 className="text-lg font-bold">Chatbot</h2>
                    <p>How can I assist you today?</p>
                    <button
                        className="mt-2 bg-blue-500 text-white rounded px-4 py-2 absolute top-2 right-2"
                        onClick={() => setIsVisible(false)}
                    >
                        ×
                    </button>
                </div>
            ) : (
                <button
                    className="bg-blue-500 text-white rounded-full p-3 shadow-lg"
                    onClick={() => setIsVisible(true)}
                >
                    Weather Help
                </button>
            )}
        </div>
    );
}
