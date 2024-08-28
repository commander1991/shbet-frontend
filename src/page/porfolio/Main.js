import Topbar from "./topbar/Topbar";
import Intro from "./intro/Intro"
import Portfolio from "./portfolio/Portfolio"
import Works from "./works/Works"
import Testimonials from "./testimonials/Testimonials"
import Contact from "./contact/Contact"
import "../../App.scss";
import { useState } from "react";
import Menu from "./menu/Menu";

function Main() {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <div className="app">
      <Topbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <div className="sections">
        <Intro />
      </div>
      <div className="sections">
        <Testimonials />
      </div>
      <div className="sections">
        <Works />
      </div>
      <div className="sections">
        <Portfolio />
      </div>
      <div className="sections">
        <Contact />
      </div>
    </div>
  );
}

export default Main;
