import Icon from '@components/ui/Icon/Icon';
import Button from '@components/ui/Button/Button';
import AppPromoBanner from './AppPromoBanner/AppPromoBanner';
import styles from './Footer.module.css';

const COLUMN_1 = {
  title: 'Explore RV Trader',
  links: [
    'About RV Trader',
    'RV Trader Blog',
    'Site map',
    'Need help?',
    'Email us feedback',
    'Security Center',
    'Community Guidelines',
  ],
};

const COLUMN_2 = {
  title: 'Looking for something else?',
  links: [
    'Airplanes for sale',
    'ATVs for sale',
    'Trucks for sale',
    'Motorcycles for sale',
    'Heavy equipment for sale',
    'Jet skis for sale',
    'Snowmobiles for sale',
    'Boats for sale',
  ],
};

const SEO_TEXT =
  'RVTrader.com is the online source for all your RV needs. Looking to sell a RV or find a RV Park? We can help. Place your RV ad in front of millions of monthly visitors today. Ready to buy a cheap RV? We can help with that too \u2014 browse over 200,000 new and used RVs for sale nationwide from all of your favorite RV makes or types like Travel Trailer, Pop Up Camper, Fifth Wheel, Toy Hauler, Truck Camper, Class A, Class B, Class C, Fish House, Park Model or locate a specific RV Brand like Newmar RVs. You can easily estimate monthly payments, get insurance quotes, and set up price alerts for the RVs you\u2019re interested in while you search. Make sure to follow us on social media for everything RV, on and off the road!';

const SOCIAL_ICONS = ['x', 'facebook', 'instagram', 'youtube', 'pinterest', 'linkedin'] as const;

function handleScrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export default function Footer() {
  return (
    <>
    <AppPromoBanner />
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Navigation columns */}
        <div className={styles.columns}>
          {/* Column 1 — Explore */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>{COLUMN_1.title}</h3>
            <ul className={styles.columnList}>
              {COLUMN_1.links.map((link) => (
                <li key={link}>
                  <a href="#" className={styles.columnLink}>{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2 — Other marketplaces */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>{COLUMN_2.title}</h3>
            <ul className={styles.columnList}>
              {COLUMN_2.links.map((link) => (
                <li key={link}>
                  <a href="#" className={styles.columnLink}>{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Sellers & Dealers */}
          <div className={styles.column}>
            <div className={styles.columnGroup}>
              <h3 className={styles.columnTitle}>Private sellers</h3>
              <Button variant="primary" size="sm">Sell my RV</Button>
              <a href="#" className={styles.underlineLink}>Edit my listing</a>
            </div>
            <div className={styles.columnGroup}>
              <h3 className={styles.columnTitle}>Dealers</h3>
              <Button variant="tertiary" size="sm">TraderTraxx login</Button>
              <a href="#" className={styles.underlineLink}>
                <span className={styles.underlineText}>Advertise your inventory</span> with us!
              </a>
              <a href="#" className={styles.columnLink}>Registration data insights</a>
            </div>
          </div>

          {/* Column 4 — App, Newsletter, Social */}
          <div className={`${styles.column} ${styles.columnWide}`}>
            <div className={styles.columnGroup}>
              <h3 className={styles.columnTitle}>Get our app</h3>
              <div className={styles.appBadges}>
                <a href="#" className={styles.appBadge}>
                  <Icon name="apple" size={20} />
                  <div className={styles.appBadgeText}>
                    <span className={styles.appBadgeSmall}>Download on the</span>
                    <span className={styles.appBadgeLarge}>App Store</span>
                  </div>
                </a>
                <a href="#" className={styles.appBadge}>
                  <Icon name="play" size={20} />
                  <div className={styles.appBadgeText}>
                    <span className={styles.appBadgeSmall}>GET IT ON</span>
                    <span className={styles.appBadgeLarge}>Google Play</span>
                  </div>
                </a>
              </div>
            </div>

            <div className={styles.columnGroup}>
              <h3 className={styles.columnTitle}>Subscribe to our newsletter</h3>
              <div className={styles.newsletterRow}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={styles.newsletterInput}
                />
                <Button variant="primary" size="sm">Submit</Button>
              </div>
            </div>

            <div className={styles.socialIcons}>
              {SOCIAL_ICONS.map((icon) => (
                <a key={icon} href="#" className={styles.socialIcon}>
                  <Icon name={icon} size={24} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className={styles.divider} />

        {/* SEO Copy */}
        <div className={styles.seoSection}>
          <h2>Find RVs for sale on RV Trader</h2>
          <p>{SEO_TEXT}</p>
        </div>

        {/* Copyright row */}
        <div className={styles.copyrightRow}>
          <div className={styles.copyrightContent}>
            <div className={styles.copyrightLinks}>
              <span>RVTrader.com &copy; 2024 Trader Interactive</span>
              <span>All rights reserved</span>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Use</a>
              <a href="#">Advertiser Agreement</a>
            </div>
            <p className={styles.recaptcha}>
              This site is protected by reCAPTCHA and the Google{' '}
              <a href="#">Privacy Policy</a> and{' '}
              <a href="#">Terms of Service</a> apply
            </p>
          </div>
          <button className={styles.scrollToTop} onClick={handleScrollToTop}>
            <Icon name="arrow_upward" size={24} />
          </button>
        </div>
      </div>
    </footer>
    </>
  );
}
