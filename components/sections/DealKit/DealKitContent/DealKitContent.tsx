import { useState } from 'react';
import { useDealKit } from '../DealKitContext';
import DealKitNav from '../DealKitNav/DealKitNav';
import DealScoreSection from '../sections/DealScoreSection/DealScoreSection';
import OfferRangeSection from '../sections/OfferRangeSection/OfferRangeSection';
import InspectionChecklistSection from '../sections/InspectionChecklistSection/InspectionChecklistSection';
import QuestionsSection from '../sections/QuestionsSection/QuestionsSection';
import NegotiationPointsSection from '../sections/NegotiationPointsSection/NegotiationPointsSection';
import CostOfOwnershipSection from '../sections/CostOfOwnershipSection/CostOfOwnershipSection';
import RedFlagsSection from '../sections/RedFlagsSection/RedFlagsSection';
import ContentGate from '../../../pages/DestinationDetailPage/ContentGate';
import styles from './DealKitContent.module.css';

export default function DealKitContent() {
  const { data } = useDealKit();
  const [isUnlocked, setIsUnlocked] = useState(false);

  if (!data) return null;

  return (
    <>
      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <DealKitNav />
        </aside>
        <div className={styles.main}>
          <DealScoreSection data={data.dealScore} />
          <OfferRangeSection data={data.offerRange} />
        </div>
      </div>
      <ContentGate
        gated={!isUnlocked}
        onAuthenticate={() => setIsUnlocked(true)}
        heading="Sign in to unlock your full Deal Kit"
        subtext="Get your inspection checklist, negotiation points, cost of ownership breakdown, and more."
        contained
      >
        <div className={styles.layout}>
          <aside className={styles.sidebarSpacer} aria-hidden="true" />
          <div className={styles.main}>
            <InspectionChecklistSection items={data.inspectionChecklist} />
            <QuestionsSection questions={data.questions} />
            <NegotiationPointsSection points={data.negotiationPoints} />
            <CostOfOwnershipSection data={data.costOfOwnership} />
            <RedFlagsSection flags={data.redFlags} />
            <p className={styles.disclaimer}>
              AI-generated estimates based on public data. Not a substitute for professional inspection or appraisal. Always verify details independently before making purchase decisions.
            </p>
          </div>
        </div>
      </ContentGate>
    </>
  );
}
