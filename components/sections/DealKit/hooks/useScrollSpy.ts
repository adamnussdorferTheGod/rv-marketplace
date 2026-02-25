import { useEffect, useRef, useCallback } from 'react';
import { DEAL_KIT_SECTIONS } from '../../../../app/src/data/dealKitTypes';
import { useDealKit } from '../DealKitContext';

export function useScrollSpy(containerRef: React.RefObject<HTMLElement | null>) {
  const { step, setActiveSection } = useDealKit();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastId = DEAL_KIT_SECTIONS[DEAL_KIT_SECTIONS.length - 1].id;

  const setup = useCallback(() => {
    if (!containerRef.current) return;

    observerRef.current?.disconnect();

    const root = containerRef.current;
    const sectionEls: Element[] = [];

    DEAL_KIT_SECTIONS.forEach(({ id }) => {
      const el = root.querySelector(`#${id}`);
      if (el) sectionEls.push(el);
    });

    // Don't set up observer if sections aren't rendered yet
    if (sectionEls.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
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

    sectionEls.forEach((el) => observerRef.current!.observe(el));
  }, [containerRef, setActiveSection]);

  // Re-run setup when step changes (loading → ready renders the sections)
  useEffect(() => {
    if (step !== 'ready') return;

    const timer = setTimeout(setup, 100);
    return () => {
      clearTimeout(timer);
      observerRef.current?.disconnect();
    };
  }, [step, setup]);

  // Activate last section when scrolled to bottom
  useEffect(() => {
    const root = containerRef.current;
    if (!root || step !== 'ready') return;

    const handleScroll = () => {
      const atBottom = Math.abs(root.scrollHeight - root.scrollTop - root.clientHeight) < 40;
      if (atBottom) setActiveSection(lastId);
    };

    root.addEventListener('scroll', handleScroll, { passive: true });
    return () => root.removeEventListener('scroll', handleScroll);
  }, [containerRef, step, setActiveSection, lastId]);

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
