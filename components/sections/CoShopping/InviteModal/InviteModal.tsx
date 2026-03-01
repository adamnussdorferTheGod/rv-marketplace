import { useState, useRef, useEffect } from 'react';
import Icon from '@components/ui/Icon/Icon';
import Button from '@components/ui/Button/Button';
import styles from './InviteModal.module.css';

interface InviteModalProps {
  listName: string;
  members: { id: string; displayName: string; avatarColor: string; avatarInitials: string; avatarUrl?: string }[];
  onClose: () => void;
  onInviteSent?: (email: string) => void;
}

export default function InviteModal({ listName, members, onClose, onInviteSent }: InviteModalProps) {
  const [email, setEmail] = useState('');
  const [linkCopied, setLinkCopied] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState('');
  const emailRef = useRef<HTMLInputElement>(null);

  // Generate a demo share link
  const shareLink = `https://rvtrader.com/list/shared/${Date.now().toString(36)}`;

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
    } catch {
      // Fallback: select text
    }
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2500);
  };

  const validateEmail = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const handleSendInvite = () => {
    if (!email.trim()) {
      setEmailError('Enter an email address');
      emailRef.current?.focus();
      return;
    }
    if (!validateEmail(email)) {
      setEmailError('Enter a valid email address');
      emailRef.current?.focus();
      return;
    }
    setEmailError('');
    setEmailSent(true);
    onInviteSent?.(email);
    setTimeout(() => {
      setEmailSent(false);
      setEmail('');
    }, 2500);
  };

  const handleEmailKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendInvite();
    }
  };

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
          <Icon name="x_close" size={20} />
        </button>

        {/* Header */}
        <div className={styles.header}>
          <div className={styles.iconWrap}>
            <Icon name="person_add" size={28} />
          </div>
          <h2 className={styles.heading}>Invite a co-shopper</h2>
          <p className={styles.subtext}>
            Share <strong>{listName}</strong> to compare, react, and decide together.
          </p>
        </div>

        {/* Current members */}
        {members.length > 0 && (
          <div className={styles.membersSection}>
            <span className={styles.membersLabel}>
              {members.length} member{members.length !== 1 ? 's' : ''} on this list
            </span>
            <div className={styles.memberChips}>
              {members.map((m) => (
                <div key={m.id} className={styles.memberChip}>
                  <div
                    className={styles.chipAvatar}
                    style={m.avatarUrl ? undefined : { backgroundColor: m.avatarColor }}
                  >
                    {m.avatarUrl ? (
                      <img src={m.avatarUrl} alt={m.displayName} className={styles.chipAvatarImg} />
                    ) : (
                      m.avatarInitials
                    )}
                  </div>
                  <span>{m.displayName}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Divider */}
        <div className={styles.divider} />

        {/* Share link section */}
        <div className={styles.section}>
          <label className={styles.sectionLabel}>Share link</label>
          <button
            type="button"
            className={`${styles.linkField} ${linkCopied ? styles.linkFieldCopied : ''}`}
            onClick={handleCopyLink}
          >
            <Icon name={linkCopied ? 'check' : 'link'} size={18} />
            <span className={styles.linkText}>
              {linkCopied ? 'Copied to clipboard!' : shareLink}
            </span>
          </button>
          <p className={styles.sectionHint}>
            {linkCopied ? '\u00A0' : 'Click to copy — anyone with this link can join'}
          </p>
        </div>

        {/* Divider */}
        <div className={styles.divider} />

        {/* Email invite section */}
        <div className={styles.section}>
          <label className={styles.sectionLabel} htmlFor="invite-email">Send via email</label>
          <div className={`${styles.emailFieldWrap} ${emailError ? styles.emailFieldError : ''}`}>
            <Icon name="mail" size={18} />
            <input
              ref={emailRef}
              id="invite-email"
              type="email"
              className={styles.emailInput}
              placeholder="partner@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) setEmailError('');
              }}
              onKeyDown={handleEmailKeyDown}
            />
          </div>
          {emailError && <p className={styles.errorText}>{emailError}</p>}
          {emailSent && <p className={styles.successText}>Invite sent! (Demo)</p>}
          <Button
            variant="primary"
            size="lg"
            onClick={handleSendInvite}
            disabled={emailSent}
            className={styles.sendBtn}
            leadingIcon="mail"
          >
            {emailSent ? 'Sent!' : 'Send Invite'}
          </Button>
        </div>
      </div>
    </div>
  );
}
