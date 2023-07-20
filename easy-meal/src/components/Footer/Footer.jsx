import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__creator">
        <p className="footer__creator_text">&#169;{new Date().getFullYear()}</p>
        <p className="footer__creator_text">
          Made by{' '}
          <a
            className="footer__link"
            href="https://github.com/mintolime"
            target="_blank"
            rel="noreferrer"
          >
            mintolime{' '}
          </a>
          &#38;
          <a
            className="footer__link"
            href="https://github.com/Alveek"
            target="_blank"
            rel="noreferrer"
          >
            {' '}
            alveek
          </a>
        </p>
      </div>
      <div className="footer__creator">
        <Link className="footer__link">
          <p className="footer__creator_text">TheMealDB</p>
        </Link>
        <Link className="footer__link">
          <p className="footer__creator_text">GitHub</p>
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
