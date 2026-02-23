import { useEffect, useRef } from 'react';
import Icon from '@components/ui/Icon/Icon';
import { useAiMode } from '../AiModeContext';
import MessageBubble from '../MessageBubble/MessageBubble';
import SuggestedPrompts from '../SuggestedPrompts/SuggestedPrompts';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import AuthGateInline from '../AuthGateInline/AuthGateInline';
import styles from './ConversationThread.module.css';

export default function ConversationThread() {
  const {
    messages,
    isLoading,
    suggestedPrompts,
    exchangeCount,
    isAuthenticated,
    sendMessage,
  } = useAiMode();

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages, isLoading]);

  const showAuthGate = exchangeCount >= 2 && !isAuthenticated;
  const hasMessages = messages.length > 0;

  return (
    <div className={styles.thread} ref={scrollRef}>
      {!hasMessages && (
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

      {hasMessages && (
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

          {showAuthGate && <AuthGateInline />}

          {!isLoading && !showAuthGate && suggestedPrompts.length > 0 && hasMessages && (
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
    </div>
  );
}
