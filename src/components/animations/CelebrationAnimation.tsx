import { motion } from "framer-motion";
import { useMemo } from "react";

interface CelebrationAnimationProps {
  isDarkTheme: boolean;
}

export const CelebrationAnimation = ({ isDarkTheme }: CelebrationAnimationProps) => {
    const particles = useMemo(() => {
      return Array.from({ length: 80 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: -10 + Math.random() * -20, // Comenzar desde arriba
        delay: Math.random() * 4,
        duration: 6 + Math.random() * 4,
        size: 2 + Math.random() * 4,
        opacity: 0.8 + Math.random() * 0.5,
        speed: 0.5 + Math.random() * 1.5,

        color: i % 3 === 0 ? "#10B981" : i % 3 === 1 ? "#3B82F6" : "#FFFFFF",
      }));
    }, []);

    const mistParticles = useMemo(() => {
      return Array.from({ length: 40 }, (_, i) => ({
        id: `mist-${i}`,
        left: Math.random() * 100,
        top: -20 + Math.random() * -40,
        delay: Math.random() * 6,
        duration: 8 + Math.random() * 6,
        size: 2 + Math.random() * 4,
        opacity: 0.8 + Math.random() * 0.5,
        color: i % 3 === 0 ? "#10B981" : i % 3 === 1 ? "#3B82F6" : "#FFFFFF",
      }));
    }, []);

  return (
    <div 
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{
        zIndex: 1,
        pointerEvents: 'none',
      }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute rounded-full pointer-events-none"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                width: `${particle.size}px`,
                height: `${particle.size * 2}px`,
                background: `linear-gradient(to top, ${particle.color}${Math.round(
                  particle.opacity * 255
                )
                  .toString(16)
                  .padStart(2, "0")}, ${particle.color}${Math.round(particle.opacity * 0.7 * 255)
                  .toString(16)
                  .padStart(2, "0")})`,
                boxShadow: `0 0 ${particle.size * 2}px ${particle.color}${Math.round(
                  particle.opacity * 0.5 * 255
                )
                  .toString(16)
                  .padStart(2, "0")}`,
                animation: `rainFall ${particle.duration}s linear infinite`,
                animationDelay: `${particle.delay}s`,
                willChange: "transform, opacity",
                transform: "translate3d(0, 0, 0)",
                backfaceVisibility: "hidden",
                perspective: 1000,
                pointerEvents: 'none',
                userSelect: 'none',
              }}
            />
          ))}

          {mistParticles.map((particle) => (
            <div
              key={particle.id}
              className="absolute rounded-full pointer-events-none"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                background: `radial-gradient(circle, ${particle.color}${Math.round(
                  particle.opacity * 255
                )
                  .toString(16)
                  .padStart(2, "0")}, transparent)`,
                animation: `mistFall ${particle.duration}s ease-out infinite`,
                animationDelay: `${particle.delay}s`,
                willChange: "transform, opacity",
                transform: "translate3d(0, 0, 0)",
                backfaceVisibility: "hidden",
                perspective: 1000,
                pointerEvents: 'none',
                userSelect: 'none',
              }}
            />
          ))}

        <style
          dangerouslySetInnerHTML={{
            __html: `
            @keyframes rainFall {
              0% {
                transform: translate3d(0, 0, 0) scale(1);
                opacity: 0;
              }
              10% {
                opacity: 1;
              }
              90% {
                opacity: 1;
              }
              100% {
                transform: translate3d(0, 120vh, 0) scale(0.8);
                opacity: 0;
              }
            }
            
            @keyframes mistFall {
              0% {
                transform: translate3d(0, 0, 0) scale(0.5);
                opacity: 0;
              }
              20% {
                opacity: 1;
                transform: translate3d(0, 10vh, 0) scale(1);
              }
              80% {
                opacity: 1;
                transform: translate3d(0, 80vh, 0) scale(1.2);
              }
              100% {
                transform: translate3d(0, 100vh, 0) scale(0.3);
                opacity: 0;
              }
            }
          `,
          }}
        />
      </div>
    </div>
  );
};
