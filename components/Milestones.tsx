import React from 'react';
import { motion } from 'framer-motion';
import { MILESTONES } from '../constants';

const Milestones: React.FC = () => {
    return (
        <div className="w-full min-h-full pb-36 pt-24 px-6 flex flex-col gap-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-4"
            >
                <h2 className="font-serif text-3xl text-rose-500 mb-2">Our Milestones</h2>
                <p className="text-stone-500 font-sans text-sm">Dates that mean the world to me</p>
            </motion.div>

            <div className="relative border-l-2 border-rose-200 dark:border-rose-900 ml-4 space-y-8">
                {MILESTONES.map((milestone, index) => (
                    <motion.div
                        key={milestone.id}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className="relative pl-8"
                    >
                        {/* Dot */}
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-rose-500 border-4 border-stone-100 dark:border-stone-900" />

                        <div className="bg-white dark:bg-stone-800 p-4 rounded-xl shadow-sm border border-rose-100 dark:border-stone-700">
                            <span className="text-2xl mb-2 block">{milestone.icon}</span>
                            <span className="text-xs font-bold tracking-widest text-rose-400 uppercase mb-1 block">
                                {milestone.date}
                            </span>
                            <h3 className="font-serif text-xl text-stone-800 dark:text-stone-200 mb-1">
                                {milestone.title}
                            </h3>
                            <p className="text-stone-600 dark:text-stone-400 text-sm font-sans leading-relaxed">
                                {milestone.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="text-center mt-8 p-6 bg-rose-50 dark:bg-stone-900 rounded-2xl border border-rose-100 dark:border-stone-800"
            >
                <p className="text-stone-600 dark:text-stone-400 font-serif italic">
                    "And many more memories yet to come..."
                </p>
            </motion.div>
        </div>
    );
};

export default Milestones;
