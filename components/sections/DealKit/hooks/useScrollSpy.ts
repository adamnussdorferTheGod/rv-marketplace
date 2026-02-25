import { useEffect, useRef, useCallback } from 'react';
import { DEAL_KIT_SECTIONS } from '../../../../app/src/data/dealKitTypes';
import { useDealKit } from '../DealKitContext';

export function useScrollSpy(containerRef: React.RefObject<HTMLElement | null>) {
  const { setActiveSection } = useDealKit();
  const observerRef = useRef<IntersectionObserver | null>(null);

  const setup = useCallback(() => {
    if (!containerRef.current) return;

    observerRef.current?.disconnect();

    const root = containerRef.current;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Find the first section that's intersecting (from top)
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        root,
        rootMargin: '-80px 0px -60% 0px',
        threshold: 0,
      },
    );

    DEAL_KIT_SECTIONS.forEach(({ id }) => {
      const el = root.querySelector(`#${id}`);
      if (el) observerRef.current!.observe(el);
    });
  }, [containerRef, setActiveSection]);

  useEffect(() => {
    // Small delay to let DOM render
    const timer = setTimeout(setup, 100);
    return () => {
      clearTimeout(timer);
      observerRef.current?.disconnect();
    };
  }, [setup]);

  const scrollToSection = useCallback(
    (id: string) => {
      const el = containerRef.current?.querySelector(`#${id}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    },
    [containerRef],
  );

  return { scrollToSection };
}
