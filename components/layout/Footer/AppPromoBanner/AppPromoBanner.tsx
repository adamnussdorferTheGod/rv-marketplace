import Icon from '@components/ui/Icon/Icon';
import styles from './AppPromoBanner.module.css';

export default function AppPromoBanner() {
  return (
    <section className={styles.banner}>
      <img
        src="/images/footer/forest-bg.png"
        alt=""
        className={styles.bgImage}
        aria-hidden="true"
      />
      <div className={styles.content}>
        {/* Left side — phone mockups */}
        <div className={styles.phones}>
          <img
            src="/images/footer/phones-mockup.png"
            alt="RV Trader app screenshots"
            className={styles.phonesImage}
          />
        </div>

        {/* Right side — text + badges */}
        <div className={styles.textSide}>
          <div className={styles.copy}>
            <h2 className={styles.heading}>Find your dream RV easily on our app</h2>
            <p className={styles.subtext}>
              Explore top RV models, exclusive offers, and thousands of listings
              &ndash; all in one app. Start your adventure now!
            </p>
          </div>
          <div className={styles.badges}>
            <div className={styles.qrCard}>
              <img
                src="/images/footer/qr-code.png"
                alt="Scan to download the app"
                className={styles.qrImage}
              />
              <span className={styles.qrLabel}>Scan to download</span>
            </div>
            <div className={styles.storeBadges}>
              <a href="#" className={styles.storeBadge}>
                <Icon name="apple" size={20} />
                <div className={styles.storeBadgeText}>
                  <span className={styles.storeBadgeSmall}>Download on the</span>
                  <span className={styles.storeBadgeLarge}>App Store</span>
                </div>
              </a>
              <a href="#" className={styles.storeBadge}>
                <Icon name="play" size={20} />
                <div className={styles.storeBadgeText}>
                  <span className={styles.storeBadgeSmall}>GET IT ON</span>
                  <span className={styles.storeBadgeLarge}>Google Play</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
