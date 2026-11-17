import { Link } from 'react-router-dom'
import { profile } from '../data/profile'

export const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <footer className="site-footer">
      <p>
        © {year} {profile.name}. Engineering leadership portfolio.
      </p>
      <Link to="/study" className="footer-study-link">
        Study vault
      </Link>
    </footer>
  )
}