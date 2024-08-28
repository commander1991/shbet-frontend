import "./topbar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser, faMailBulk, faBirthdayCake, faLocation, faGlobe
} from "@fortawesome/free-solid-svg-icons";
import { faReact, faSass } from "@fortawesome/free-brands-svg-icons";

const Topbar = ({ menuOpen, setMenuOpen }) => {
  return (
    <div className={"topbarTopbar " + (menuOpen && "activeTopbar")}>
      <div className="wrapperPorfolioTopbar">
        <div className="leftPorfolioTopbar">
          <a href="#intro" className="logoPorfolioTopbar">
            Power by
            <FontAwesomeIcon icon={faReact} className="mx-2" />
             + 
            <FontAwesomeIcon icon={faSass} className="mx-2"/>
          </a>
          {/* <div className="itemContainerPorfolioTopbar">
            <FontAwesomeIcon icon={faGlobe} className="iconP" />
            <span>1024.vn</span>
          </div>
          <div className="itemContainerPorfolioTopbar">
            <FontAwesomeIcon icon={faUser} className="iconP" />
            <span>+84 055 9205 055</span>
          </div>
          <div className="itemContainerPorfolioTopbar">
            <FontAwesomeIcon icon={faBirthdayCake} className="iconP" />
            <span>14/09/1991</span>
          </div>
          <div className="itemContainerPorfolioTopbar">
            <FontAwesomeIcon icon={faLocation} className="iconP" />
            <span>Hoc Mon, Ho Chi Minh city</span>
          </div>
          <div className="itemContainerPorfolioTopbar">
            <FontAwesomeIcon icon={faMailBulk} className="iconP" />
            <span>khoipdfx19995@funix.edu.vn</span>
          </div> */}
        </div>
        <div className="rightPorfolioTopbar">
          <div className="hamburgerPorfolioTopbar" onClick={() => setMenuOpen(!menuOpen)}>
            <span className="line1"></span>
            <span className="line2"></span>
            <span className="line3"></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
