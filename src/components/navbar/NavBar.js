import "./NavBar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMagnifyingGlass, faGlobe, faMoon,
    faBell, faMessage, faList
} from "@fortawesome/free-solid-svg-icons";
const NavBar = () => {
    return (
        <div className="navbar">
            <div className="wrapperNav">
                <div className="search">
                    <input type="text" placeholder="Search..." />
                    <FontAwesomeIcon icon={faMagnifyingGlass} className='iconNav' />
                </div>
                <div className="items">
                    {/* <div className="item">
                        <FontAwesomeIcon icon={faGlobe} className='iconNav me-1'/>
                        Eng
                    </div> 
                    <div className="item">
                        <FontAwesomeIcon icon={faBell} className='iconNav'/>
                        <div className="counter">1</div>
                    </div>
                    <div className="item">
                        <FontAwesomeIcon icon={faMessage} className='iconNav'/>
                        <div className="counter">2</div>
                    </div>
                    <div className="item">
                        <FontAwesomeIcon icon={faList} className='iconNav'/>
                    </div>
                    */}
                </div>
            </div>
        </div>
    )
}

export default NavBar;