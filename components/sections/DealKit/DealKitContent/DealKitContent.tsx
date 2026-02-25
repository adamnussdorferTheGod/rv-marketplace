import { useDealKit } from '../DealKitContext';
import DealKitNav from '../DealKitNav/DealKitNav';
import DealScoreSection from '../sections/DealScoreSection/DealScoreSection';
import OfferRangeSection from '../sections/OfferRangeSection/OfferRangeSection';
import InspectionChecklistSection from '../sections/InspectionChecklistSection/InspectionChecklistSection';
import QuestionsSection from '../sections/QuestionsSection/QuestionsSection';
import NegotiationPointsSection from '../sections/NegotiationPointsSection/NegotiationPointsSection';
import CostOfOwnershipSection from '../sections/CostOfOwnershipSection/CostOfOwnershipSection';
import RedFlagsSection from '../sections/RedFlagsSection/RedFlagsSection';
import styles from './DealKitContent.module.css';

export default function DealKitContent() {
  const { data } = useDealKit();

  if (!data) return null;

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <DealKitNav />
      </aside>
      <div className={styles.main}>
        <DealScoreSection data={data.dealScore} />
        <OfferRangeSection data={data.offerRange} />
        <InspectionChecklistSection items={data.inspectionChecklist} />
        <QuestionsSection questions={data.questions} />
        <NegotiationPointsSection points={data.negotiationPoints} />
        <CostOfOwnershipSection data={data.costOfOwnership} />
        <RedFlagsSection flags={data.redFlags} />
      </div>
    </div>
  );
}
