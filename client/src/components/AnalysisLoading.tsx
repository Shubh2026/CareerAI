import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrainCircuit, Search, TrendingUp, Map } from "lucide-react";

const steps = [
  { icon: Search, text: "Analyzing your profile data..." },
  { icon: BrainCircuit, text: "Consulting AI career models..." },
  { icon: TrendingUp, text: "Scanning current market trends..." },
  { icon: Map, text: "Constructing your personalized roadmap..." },
];

export function AnalysisLoading() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const StepIcon = steps[currentStep].icon;

  return (
    <div className="fixed inset-0 z-50 bg-background/90 backdrop-blur-3xl flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md flex flex-col items-center text-center space-y-8">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <motion.div
            key={currentStep}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative bg-card border border-white/10 p-8 rounded-full shadow-2xl"
          >
            <StepIcon className="w-16 h-16 text-primary animate-pulse" />
          </motion.div>
        </div>

        <div className="space-y-4">
          <AnimatePresence mode="wait">
            <motion.h2
              key={currentStep}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="text-2xl md:text-3xl font-bold font-display text-white"
            >
              {steps[currentStep].text}
            </motion.h2>
          </AnimatePresence>
          <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: "0%" }}
              animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
