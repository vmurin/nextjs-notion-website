import * as React from 'react'

import { FaGithub } from '@react-icons/all-files/fa/FaGithub'
import { FaLinkedin } from '@react-icons/all-files/fa/FaLinkedin'
import { FaTwitter } from '@react-icons/all-files/fa/FaTwitter'

import * as config from '@/lib/config'
import styles from './styles.module.css'
import { NavigationLinks } from './NavigationLinks'
import CookieConsent from './CookieConsent'

export function FooterImpl() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.copyright}>
        Copyright {currentYear} {config.author}
      </div>

      <div className={styles.footerNavLinks}>
        <NavigationLinks navigationLinks={config.footerNavigationLinks} />
      </div>

      <div className={styles.social}>
        {config.twitter && (
          <a
            className={styles.twitter}
            href={`https://x.com/${config.twitter}`}
            title={`X @${config.twitter}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <FaTwitter />
          </a>
        )}

        {config.github && (
          <a
            className={styles.github}
            href={`https://github.com/${config.github}`}
            title={`GitHub @${config.github}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <FaGithub />
          </a>
        )}

        {config.linkedin && (
          <a
            className={styles.linkedin}
            href={`https://www.linkedin.com/in/${config.linkedin}`}
            title={`LinkedIn ${config.author}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <FaLinkedin />
          </a>
        )}
      </div>
      <CookieConsent />
    </footer>
  )
}

export const Footer = React.memo(FooterImpl)
