'use client';

import { Scroll } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

const Section = (props: any) => {
    return (
        <section
            className={`absolute w-full flex justify-center items-center p-10 ${props.className}`}
            style={{ top: props.top }}
        >
            {props.children}
        </section>
    );
};

const Card = ({ title, children }: { title: string, children: React.ReactNode }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="backdrop-blur-xl bg-black/30 border border-white/10 shadow-2xl rounded-3xl p-8 max-w-2xl w-full text-white"
        >
            <h3 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-white">{title}</h3>
            <div className="space-y-4">
                {children}
            </div>
        </motion.div>
    );
};

const Item = ({ title, desc }: { title: string, desc: string }) => (
    <div className="border-l-2 border-white/20 pl-4">
        <h4 className="text-xl font-semibold text-blue-100">{title}</h4>
        <p className="text-gray-200 text-sm mt-1">{desc}</p>
    </div>
);

export default function Overlay() {
    return (
        <Scroll html style={{ width: '100vw' }}>

            {/* 0% - Base Camp */}
            <Section top="10vh" className="flex-col text-center">
                <motion.h1
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 tracking-tighter"
                >
                    JOURNEY<br />TO THE<br />SUMMIT
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="mt-8 text-xl md:text-2xl text-white/80 font-light tracking-widest uppercase"
                >
                    Sujit Bhandari | Engineering Real-Time AI & Finance Systems
                </motion.p>
                <div className="mt-20 animate-bounce text-white/50">
                    Scroll to Ascend
                </div>
            </Section>

            {/* 20% - Experience */}
            <Section top="120vh">
                <Card title="The Ascent: Experience">
                    <Item
                        title="Mechadax Internship"
                        desc="Architected Python CAD engine reducing setup time by 95%."
                    />
                    <Item
                        title="Research"
                        desc="Built 99.4% accurate Hybrid AI pipeline for ECG analysis."
                    />
                </Card>
            </Section>

            {/* 45% - Finance Projects */}
            <Section top="270vh" className="justify-end pr-[10%]">
                <Card title="High Altitude: Financial Engineering">
                    <Item
                        title="FedScope"
                        desc="NLP-driven FOMC Volatility Analyzer (Python/FinBERT)."
                    />
                    <Item
                        title="Algo-Catalyst"
                        desc="C++ Low-latency HFT engine."
                    />
                </Card>
            </Section>

            {/* 70% - AI Projects */}
            <Section top="420vh" className="justify-start pl-[10%]">
                <Card title="The Crux: AI & Computer Vision">
                    <Item
                        title="DermaVoice"
                        desc="Real-time skin analysis via mobile Computer Vision."
                    />
                    <Item
                        title="TrustGraph-AI"
                        desc="Hallucination-resistant RAG pipeline."
                    />
                </Card>
            </Section>

            {/* 100% - The Summit */}
            <Section top="550vh" className="flex-col text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="bg-white/10 backdrop-blur-md p-12 rounded-full border border-white/20"
                >
                    <h2 className="text-5xl font-bold text-white mb-6">The Summit Goal</h2>
                    <p className="text-xl text-blue-100 mb-8">Ready to build the next peak? Contact me.</p>
                    <div className="flex gap-6 justify-center">
                        <button className="p-4 bg-white text-black rounded-full hover:bg-gray-200 transition-colors">
                            <Linkedin size={24} />
                        </button>
                        <button className="p-4 bg-gray-900 text-white rounded-full hover:bg-black transition-colors border border-white/20">
                            <Github size={24} />
                        </button>
                        <button className="p-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                            <Mail size={24} />
                        </button>
                    </div>
                </motion.div>
            </Section>

        </Scroll>
    );
}
