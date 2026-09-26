import logo from '../assets/logo.png';

function Logo({ width = 190, height = 240 }) {
  return (
    <div className="logo-wrapper">
      <img
        src={logo}
        alt="Arroz con Leche Cremoso"
        className="logo-img"
        style={{ width, height }}
      />
    </div>
  );
}

export default Logo;