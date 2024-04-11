import { Link } from "react-router-dom";
import "./Navbar.scss";
import Logo from "../Logo/Logo";

function Navbar() {
  return (
    <nav>
      <ul className="nav">
        <Link to="/">
          <li className="nav__logo">
            <Logo width={150}/>
          </li>
        </Link>
        <div className="nav__pages">
          <Link to="/vehicleModel">
            <li>Vehicle Model</li>
          </Link>
          <Link to="/vehicleMake">
            <li>Vehicle Make</li>
          </Link>
        </div>
      </ul>
    </nav>
  );
}

export default Navbar;
