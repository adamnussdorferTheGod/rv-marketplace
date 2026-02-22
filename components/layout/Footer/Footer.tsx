import Icon from '@components/ui/Icon/Icon';
import Divider from '@components/ui/Divider/Divider';
import styles from './Footer.module.css';

const COLUMN_1 = {
  title: 'Explore RV Trader',
  links: [
    'Find RVs for Sale',
    'Sell My RV',
    'RV Values',
    'RV Research',
    'Cash Offers',
    'RV Trader Blog',
    'RV Trader Reviews',
  ],
};

const COLUMN_2 = {
  title: 'Looking for something else?',
  links: [
    'Motorcycles for Sale',
    'ATVs for Sale',
    'Trucks for Sale',
    'Boats for Sale',
    'Airplanes for Sale',
    'Snowmobiles for Sale',
    'Jet Skis for Sale',
    'Commercial Trucks for Sale',
  ],
};

const COLUMN_3 = {
  title: 'Private Sellers',
  cta: 'Sell My RV',
  links: ['Private seller resources'],
};

const COLUMN_4 = {
  title: 'Dealers',
  cta: 'Dealer login',
  links: ['Become a dealer', 'Dealer resources'],
};

const SEO_TEXT =
  'RV Trader is the go-to site for RV enthusiasts to buy and sell their recreational vehicles. With thousands of listings from private sellers and dealers across the country, you can find the perfect RV, motorhome, travel trailer, camper, or fifth wheel to suit your lifestyle and budget. Whether you\'re looking for a new or used RV, RV Trader has the largest selection of RVs for sale anywhere.';

function handleScrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Navigation columns */}
        <div className={styles.columns}>
          {/* Column 1 */}
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

          {/* Column 2 */}
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

          {/* Column 3 */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>{COLUMN_3.title}</h3>
            <a href="#" className={styles.ctaButton}>{COLUMN_3.cta}</a>
            <ul className={styles.columnList}>
              {COLUMN_3.links.map((link) => (
                <li key={link}>
                  <a href="#" className={styles.columnLink}>{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>{COLUMN_4.title}</h3>
            <a href="#" className={styles.ctaButton}>{COLUMN_4.cta}</a>
            <ul className={styles.columnList}>
              {COLUMN_4.links.map((link) => (
                <li key={link}>
                  <a href="#" className={styles.columnLink}>{link}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Divider />

        {/* SEO Copy */}
        <div className={styles.seoSection}>
          <h2>Find RVs for sale on RV Trader</h2>
          <p>{SEO_TEXT}</p>
        </div>

        {/* Copyright row */}
        <div className={styles.copyrightRow}>
          <div className={styles.copyrightLinks}>
            <span>&copy; 2025 Trader Interactive</span>
            <a href="#">Privacy Policy</a>
            <span>|</span>
            <a href="#">Terms of Use</a>
            <span>|</span>
            <a href="#">Advertiser Agreement</a>
          </div>
          <button className={styles.scrollToTop} onClick={handleScrollToTop}>
            <Icon name="arrow_upward" size={24} />
          </button>
        </div>
      </div>
    </footer>
  );
}
