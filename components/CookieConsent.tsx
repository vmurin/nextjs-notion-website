'use client';

import React from 'react'
import { hasCookie, setCookie } from "cookies-next";
import * as config from '@/lib/config'
import styles from './styles.module.css'
import { NavLink } from './NavLink';
import { cs } from 'react-notion-x';

const CookieConsent: React.FC = () => {
  const [showConsent, setShowConsent] = React.useState(true);

  React.useEffect(() => {
    setShowConsent(!hasCookie("localConsentGiven"));
  }, []);

  const acceptCookie = () => {
    setShowConsent(false);
    setCookie("localConsentGiven", "true", {});
  };

  if (!showConsent) {
    return null;
  }

  return (
    <div className={cs(styles.cookieConsent, showConsent ? '' : styles.hidden)}>
      <div>
        <span>
          Diese Website verwendet Cookies, um die Benutzerfreundlichkeit zu verbessern.
          Durch die Nutzung unserer Website erklären Sie sich mit der Verwendung von Cookies in Übereinstimmung mit unserer
          <span className={styles.cookieConsentLink}>
              <NavLink link={config.cookiePolicyLink} newTab={true} />
          </span>
          einverstanden.
        </span>
      </div>
      <button className={styles.cookieConsentClose} onClick={acceptCookie}>
            Accept
      </button>
    </div>
  );
}

export default CookieConsent
