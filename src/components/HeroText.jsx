import { FlipWords } from "./FlipWords";
import { motion } from "motion/react";

const HeroText = () => {
  const words = ["Creative", "Innovative", "Intelligent"];
  const variants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };
  return (
    <div className="z-10 absolute top-0 left-0 flex items-center justify-center w-full h-full md:left-[20vw] md:w-auto md:justify-start">
      {/* Desktop View — capped at 48vw, sits right next to the astronaut */}
      <div className="flex-col hidden md:flex c-space max-w-[48vw]">
        <motion.h1
          className="text-4xl font-semibold"
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1 }}
        >
          Hi, I'm Abir
        </motion.h1>
        <div className="flex flex-col items-start">
          <motion.p
            className="text-4xl font-medium text-neutral-300"
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.2 }}
          >
            A AI&ML Student <br /> Dedicated to Building
          </motion.p>
          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.5 }}
          >
            <FlipWords
              words={words}
              className="font-black text-white text-6xl lg:text-7xl"
            />
          </motion.div>
          <motion.p
            className="text-4xl font-medium text-neutral-300"
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.8 }}
          >
            AI &amp; ML Solutions
          </motion.p>
        </div>
      </div>

      {/* Mobile View — constrained to left half so text never overlaps the 3D astronaut */}
      <div className="flex flex-col items-start w-[48%] space-y-3 text-left md:hidden c-space relative -top-[15vh]">
        <motion.p
          className="text-xl font-medium text-white"
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1 }}
        >
          Hi, I'm Abir
        </motion.p>
        <div>
          <motion.p
            className="text-xl font-black text-neutral-300"
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.2 }}
          >
            Exploring
          </motion.p>
          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.5 }}
          >
            <FlipWords
              words={words}
              className="font-bold text-white text-2xl"
            />
          </motion.div>
          <motion.p
            className="text-xl font-black text-neutral-300"
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.8 }}
          >
            AI &amp; ML Ideas
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default HeroText;
