import styles from './DealerAdCard.module.css';

interface DealerAdCardProps {
  dealerName: string;
  dealerPhoto: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
}

export default function DealerAdCard({
  dealerName,
  dealerPhoto,
  description,
  ctaLabel,
  ctaHref,
}: DealerAdCardProps) {
  return (
    <article className={styles.card}>
      <span className={styles.sponsoredLabel}>Sponsored</span>

      {/* ── Photo ── */}
      <div className={styles.photoWrapper}>
        <img
          src={dealerPhoto}
          alt={dealerName}
          className={styles.photo}
          loading="lazy"
        />
      </div>

      {/* ── Content ── */}
      <div className={styles.content}>
        <h3 className={styles.dealerName}>{dealerName}</h3>
        <p className={styles.description}>{description}</p>
        <a href={ctaHref} className={styles.ctaButton}>
          {ctaLabel}
        </a>
      </div>
    </article>
  );
}
