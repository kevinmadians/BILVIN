import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface MessageFormProps {
    onCancel: () => void;
}

const MessageForm: React.FC<MessageFormProps> = ({ onCancel }) => {
    const [message, setMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const recipient = "kevinmadians@gmail.com"; // Replace with actual email if needed
        const subject = "Reply from Bilqis";
        const body = encodeURIComponent(message);

        // Open default mail client
        window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;

        // Optional: Close form after a short delay
        setTimeout(() => {
            onCancel();
        }, 1000);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white dark:bg-stone-900 w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden"
            >
                <div className="p-6">
                    <h3 className="text-xl font-serif text-rose-500 mb-2">Send a Reply</h3>
                    <p className="text-sm text-stone-500 dark:text-stone-400 mb-4">
                        Write something sweet back... (It will open your email app)
                    </p>

                    <form onSubmit={handleSubmit}>
                        <textarea
                            className="w-full h-32 p-3 rounded-xl bg-stone-50 dark:bg-black border border-stone-200 dark:border-stone-800 focus:outline-none focus:ring-2 focus:ring-rose-500 resize-none text-stone-700 dark:text-stone-300 font-sans"
                            placeholder="Type your message here..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                        />

                        <div className="flex gap-3 mt-6">
                            <button
                                type="button"
                                onClick={onCancel}
                                className="flex-1 py-3 px-4 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 font-medium hover:bg-stone-200 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="flex-1 py-3 px-4 rounded-xl bg-rose-500 text-white font-medium hover:bg-rose-600 shadow-lg shadow-rose-500/30 transition-all hover:scale-105"
                            >
                                Send ❤️
                            </button>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default MessageForm;
