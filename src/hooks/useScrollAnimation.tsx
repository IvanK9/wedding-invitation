import { useEffect, useRef, useState } from 'react';

export const useScrollAnimation = () => {
  const elementRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentElement = elementRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (currentElement) observer.unobserve(currentElement);
        }
      },
      {
        threshold: 0.02,
        rootMargin: '0px 0px -20px 0px'
      }
    );

    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) observer.unobserve(currentElement);
    };
  }, []);

  return { elementRef, isVisible };
};
