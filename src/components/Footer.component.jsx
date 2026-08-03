import '../styles/Footer.styles.css';

function Footercomponent() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-left">
        <span>© {year} PSMS Uganda. All rights reserved.</span>
      </div>
      <div className="footer-links">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <a href="#">Contact Support</a>
      </div>
    </footer>
  );
}

export default Footercomponent;
