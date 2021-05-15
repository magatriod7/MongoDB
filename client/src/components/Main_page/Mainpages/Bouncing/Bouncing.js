import React from "react";
import { motion } from "framer-motion";

const ballStyle = {
  display: "block",
  width: "1rem",
  height: "1rem",
  backgroundColor: "black",
  borderRadius: "0.5rem"
};

const bounceTransition = {
  y: {
    duration: 0.4,
    yoyo: Infinity,
    ease: "easeOut"
  },
  backgroundColor: {
    duration: 0,
    yoyo: Infinity,
    ease: "easeOut",
    repeatDelay: 0.8
  }
};

const BouncingBall = () => {
  return (
    <div className="bouncing_ball"
      style={{
        display: "flex",
      }}
    >
      <motion.div
        transition={bounceTransition}
        animate={{
          y: ["100%", "-100%"]
        }}
      >
          <h1>MAZE</h1>
      </motion.div>
    </div>
  );
}

export default BouncingBall;