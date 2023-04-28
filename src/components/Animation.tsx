import { HTMLMotionProps, motion } from 'framer-motion';

const slideAnimation = (direction: string): HTMLMotionProps<"div"> => {
    const animationProps: HTMLMotionProps<"div"> = {
        initial: {
            opacity: 0,
            x: direction === "right" ? -100 : 100,
            y: 0,
            z: -100,
        },
        animate: {
            opacity: 1,
            x: 0,
            y: 0,
            z: 0,
        },
        transition: {
            duration: 1,
            type: "spring",
            damping: 7,
            bounce: 0.5,
        },
    };
    return animationProps;
};

const Animation = () => {
    return (
        <div className="animation-container">
            <motion.div
                className="fade-in-left"
                {...slideAnimation("right")}
                key={'fade-in-left'}
                style={{ color: "#fff" }}
            >
                <h1>Text that fades in from the left</h1>
            </motion.div>
            <motion.div
                className="bounce-in-right"
                initial={{ opacity: 0, x: 200, scaleX: 1.2, scaleY: 0.8 }}
                animate={{ opacity: 1, x: 0, scaleX: 1, scaleY: 1 }}
                transition={{ duration: 1, ease: 'easeIn' }}
                key={'bounce-in-right'}
            >
                <h1>Text that bounces in from the right</h1>
            </motion.div>
        </div>
    );
};

export default Animation;

