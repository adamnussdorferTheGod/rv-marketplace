import { useEffect, useRef } from 'react';
import Icon from '@components/ui/Icon/Icon';
import { useAiMode } from '../AiModeContext';
import MessageBubble from '../MessageBubble/MessageBubble';
import SuggestedPrompts from '../SuggestedPrompts/SuggestedPrompts';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import AuthGateInline from '../AuthGateInline/AuthGateInline';
import styles from './ConversationThread.module.css';

const FITCHECK_PROMPTS = [
  'Off-roading RV that fits a family of four and a dog',
  "I'm looking for an RV to take off-roading that will fit a family of four.",
];

const PLAN_PROMPTS = [
  'Beach camping near me this weekend',
  'Plan a 3-day mountain getaway',
  'Best pet-friendly campgrounds nearby',
  'Weekend trip for two under $50/night',
];

interface ConversationThreadProps {
  listingTitle?: string;
}

export default function ConversationThread({ listingTitle }: ConversationThreadProps) {
  const {
    messages,
    isLoading,
    suggestedPrompts,
    exchangeCount,
    isAuthenticated,
    sendMessage,
  } = useAiMode();
  const { panelMode } = useAiMode();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages, isLoading]);

  const showAuthGate = exchangeCount >= 2 && !isAuthenticated;
  const hasMessages = messages.length > 0;
  const isFitcheck = panelMode !== 'plan';
  const isPlan = panelMode === 'plan';

  return (
    <div className={styles.thread} ref={scrollRef}>
      {!hasMessages && !isFitcheck && (
        <div className={styles.welcome}>
          <div className={styles.welcomeIcon}>
            <Icon name="sparkles" size={32} />
          </div>
          <h3 className={styles.welcomeTitle}>Explore this listing with AI</h3>
          <p className={styles.welcomeBody}>
            Ask me anything about this RV — pricing, specs, towing
            requirements, comparisons, and more.
          </p>
          <SuggestedPrompts
            prompts={suggestedPrompts}
            onSelect={sendMessage}
            variant="vertical"
          />
        </div>
      )}

      {!hasMessages && isFitcheck && (
        <div className={styles.fitcheckWelcome}>
          <div className={styles.fitcheckGlow} />
          <div className={styles.fitcheckCenter}>
            <div className={styles.fitcheckContent}>
              <Icon name="sparkles" size={24} className={styles.fitcheckSparkle} />
              <p className={styles.fitcheckHeading}>
                What kind of RV are you looking for?
              </p>
              <p className={styles.fitcheckSub}>
                Let&apos;s see if this {listingTitle || 'RV'} is a good fit.
              </p>
            </div>
          </div>
          <div className={styles.fitcheckPrompts}>
            {FITCHECK_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                type="button"
                className={styles.fitcheckCard}
                onClick={() => sendMessage(prompt)}
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      {!hasMessages && isPlan && (
        <div className={styles.welcome}>
          <div className={styles.welcomeIcon}>
            <Icon name="sparkles" size={32} />
          </div>
          <h3 className={styles.welcomeTitle}>Plan your next adventure</h3>
          <p className={styles.welcomeBody}>
            Tell me where you want to go or what kind of trip you&apos;re looking for.
            I&apos;ll help you find campgrounds, plan routes, and estimate costs.
          </p>
          <SuggestedPrompts
            prompts={PLAN_PROMPTS}
            onSelect={sendMessage}
            variant="vertical"
          />
        </div>
      )}

      {hasMessages && !showAuthGate && (
        <div className={styles.messages}>
          {messages.map((msg, i) => (
            <MessageBubble
              key={msg.id}
              role={msg.role}
              content={msg.content}
              isLatest={
                msg.role === 'assistant' && i === messages.length - 1 && !isLoading
              }
            />
          ))}

          {isLoading && <LoadingIndicator />}

          {!isLoading && suggestedPrompts.length > 0 && hasMessages && (
            <div className={styles.followUps}>
              <SuggestedPrompts
                prompts={suggestedPrompts}
                onSelect={sendMessage}
                variant="horizontal"
              />
            </div>
          )}
        </div>
      )}

      {hasMessages && showAuthGate && (
        <>
          <div className={styles.gatedOuter}>
            <div className={styles.messages}>
              {messages.map((msg, i) => (
                <MessageBubble
                  key={msg.id}
                  role={msg.role}
                  content={msg.content}
                  isLatest={false}
                />
              ))}
            </div>
            <div className={styles.gatedGradient} />
          </div>
          <AuthGateInline />
        </>
      )}
    </div>
  );
}
