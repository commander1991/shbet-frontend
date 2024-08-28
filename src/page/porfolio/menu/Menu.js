import "./Menu.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMailBulk, faBirthdayCake, faLocation, faGlobe,
  faPhone
} from "@fortawesome/free-solid-svg-icons";
import { faReact, faSass } from "@fortawesome/free-brands-svg-icons";


const Menu = ({ menuOpen, setMenuOpen }) => {
  return (
    <div className={"menu " + (menuOpen && "active")}>
      <div className="menuHeader">
        <a href='/login'>Login</a>
      </div>
      <ul>
        <li onClick={() => setMenuOpen(false)}>
          <FontAwesomeIcon icon={faGlobe} className="me-2" />
          <span>main.1024.vn</span>
        </li>
        <li onClick={() => setMenuOpen(false)}>
          <FontAwesomeIcon icon={faPhone} className="me-2" />
          <span>+84 55 9205 055</span>
        </li>
        <li onClick={() => setMenuOpen(false)}>
          <FontAwesomeIcon icon={faBirthdayCake} className="me-2" />
          <span>14/09/1991</span>
        </li>
        <li onClick={() => setMenuOpen(false)}>
          <FontAwesomeIcon icon={faLocation} className="me-2" />
          <span>Hoc Mon, Ho Chi Minh city</span>
        </li>
        <li onClick={() => setMenuOpen(false)}>
          <FontAwesomeIcon icon={faMailBulk} className="me-2" />
          <span>khoipdfx19995@funix.edu.vn</span>
        </li>
      </ul>
      <div className="footerMenu">
        Power by
        <FontAwesomeIcon icon={faReact} className="mx-2" />
        +
        <FontAwesomeIcon icon={faSass} className="mx-2" />
      </div>
    </div>
  );
}

export default Menu;
