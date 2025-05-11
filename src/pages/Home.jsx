import { motion } from 'framer-motion'; 

export default function HeroSection() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 sm:p-12 max-w-2xl w-full text-center shadow-xl"
      >
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 tracking-tight">
          Welcome to <span className="text-indigo-400">Xeno CRM</span>
        </h1>
        <p className="text-slate-300 text-base sm:text-lg lg:text-xl max-w-md mx-auto mb-8 leading-relaxed">
          Segment your audience, personalize campaigns, and track performance with ease.
        </p>
      </motion.div>
    </div>
  );
}