import { FiDownload, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { profile } from '../../data/profile'

export const ContactSection = () => {
  const linkedIn = profile.socialLinks.find((l) => l.label === 'LinkedIn')
  const github = profile.socialLinks.find((l) => l.label === 'GitHub')

  return (
    <section id="contact" className="section" aria-labelledby="contact-heading">
      <div className="contact-card">
        <h2 id="contact-heading">Let&apos;s connect</h2>
        <p className="contact-lead">{profile.contactClosing}</p>
        <div className="contact-links">
          <a href={`mailto:${profile.email}`} className="contact-link">
            <FiMail aria-hidden />
            {profile.email}
          </a>
          {linkedIn ? (
            <a href={linkedIn.href} target="_blank" rel="noreferrer" className="contact-link">
              <FiLinkedin aria-hidden />
              LinkedIn
            </a>
          ) : null}
          {github ? (
            <a href={github.href} target="_blank" rel="noreferrer" className="contact-link">
              <FiGithub aria-hidden />
              GitHub
            </a>
          ) : null}
          {profile.resumeUrl ? (
            <a href={profile.resumeUrl} className="contact-link" download>
              <FiDownload aria-hidden />
              Download resume
            </a>
          ) : null}
          {profile.coverLetterUrl ? (
            <a href={profile.coverLetterUrl} className="contact-link" download>
              <FiDownload aria-hidden />
              Download cover letter
            </a>
          ) : null}
        </div>
      </div>
    </section>
  )
}