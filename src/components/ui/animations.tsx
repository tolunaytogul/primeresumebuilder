'use client';

import { motion, HTMLMotionProps, Variants } from 'framer-motion';
import { ReactNode } from 'react';

// Animation variants
const fadeInVariants: Variants = {
  hidden: { 
    opacity: 0 
  },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

const slideUpVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

const slideInFromLeftVariants: Variants = {
  hidden: { 
    opacity: 0, 
    x: -30 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

const slideInFromRightVariants: Variants = {
  hidden: { 
    opacity: 0, 
    x: 30 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

const scaleInVariants: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.95 
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

// Animation component interfaces
interface AnimationProps extends Omit<HTMLMotionProps<'div'>, 'variants' | 'initial' | 'animate'> {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

interface StaggerContainerProps extends AnimationProps {
  staggerDelay?: number;
}

// FadeIn Component
export function FadeIn({ 
  children, 
  delay = 0, 
  duration = 0.6, 
  className,
  ...props 
}: AnimationProps) {
  const customVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <motion.div
      variants={customVariants}
      initial="hidden"
      animate="visible"
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// SlideUp Component
export function SlideUp({ 
  children, 
  delay = 0, 
  duration = 0.5, 
  className,
  ...props 
}: AnimationProps) {
  const customVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <motion.div
      variants={customVariants}
      initial="hidden"
      animate="visible"
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// SlideInFromLeft Component
export function SlideInFromLeft({ 
  children, 
  delay = 0, 
  duration = 0.5, 
  className,
  ...props 
}: AnimationProps) {
  return (
    <motion.div
      variants={slideInFromLeftVariants}
      initial="hidden"
      animate="visible"
      style={{ transitionDelay: `${delay}s` }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// SlideInFromRight Component
export function SlideInFromRight({ 
  children, 
  delay = 0, 
  duration = 0.5, 
  className,
  ...props 
}: AnimationProps) {
  return (
    <motion.div
      variants={slideInFromRightVariants}
      initial="hidden"
      animate="visible"
      style={{ transitionDelay: `${delay}s` }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ScaleIn Component
export function ScaleIn({ 
  children, 
  delay = 0, 
  duration = 0.4, 
  className,
  ...props 
}: AnimationProps) {
  const customVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <motion.div
      variants={customVariants}
      initial="hidden"
      animate="visible"
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// StaggerContainer Component
export function StaggerContainer({ 
  children, 
  staggerDelay = 0.1, 
  delay = 0.1,
  className,
  ...props 
}: StaggerContainerProps) {
  const customVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay
      }
    }
  };

  return (
    <motion.div
      variants={customVariants}
      initial="hidden"
      animate="visible"
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// StaggerItem Component (to be used inside StaggerContainer)
export function StaggerItem({ 
  children, 
  className,
  ...props 
}: Omit<AnimationProps, 'delay' | 'duration'>) {
  return (
    <motion.div
      variants={slideUpVariants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Page transition wrapper
export function PageTransition({ 
  children, 
  className 
}: { 
  children: ReactNode; 
  className?: string; 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
} 