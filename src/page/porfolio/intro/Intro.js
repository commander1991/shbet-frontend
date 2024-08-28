import "./Intro.scss";
import { init } from "ityped";
import { useEffect, useRef } from "react";
import avatar from "../img/avatar.png";
import downArrow from "../img/down.png";
import imgReact from "../img/logoReact192.png";
import imgNode from "../img/nodejs.png";
import imgMysql from "../img/mysql.png";
import imgMongo from "../img/mongo.png";
import imgVite from "../img/Vitejs-logo.svg";
import imgHtml from "../img/html.png";
import imgCss from "../img/css.png";
import imgJs from "../img/js.png";
import imgSass from "../img/sass.png";
import imgBootstrap from "../img/Bootstrap_logo.svg";
import imgMaterial from "../img/mui.png";
import imgNginx from "../img/nginx.png";
import imgGit from "../img/git.png";
import imgDocker from "../img/docker.png";
import imgAi from "../img/ai.jpg";

export default function Intro() {
  const textRef = useRef();

  useEffect(() => {
    init(textRef.current, {
      showCursor: true,
      backDelay: 1500,
      backSpeed: 60,
      strings: ["Developer", "Designer", "Content Creator"],
    });
  }, []);

  return (
    <div className="intro" id="intro">
      <div className="leftIntro">
        <div className="imgContainerIntro">
          <img className='imgAvatar' src={avatar} alt="avatar" />
        </div>
        <div className="imgBasicKnowledge">
          <img src={imgHtml} alt="" />
          <img src={imgCss} alt="" />
          <img src={imgJs} alt="" />
        </div>
      </div>
      <div className="rightIntro">
        <div className="wrapperIntro">
          <h2>Hi, I'm</h2>
          <h1>Phạm Đình Khôi</h1>
          <h3 className="mb-5">
            Freelance <span ref={textRef}></span>
          </h3>
          <h3>My target</h3>
          <h3>I hope to work as a Fullstack Developer, be able to apply the knowledge I have acquired and constantly learn to develop myself, as well as best complete the assigned work.</h3>
          <div className="imgBrands">
            <div className="imgBrandsGroup">
              <img className='logoBrands' src={imgReact} alt="" />
              <img className='logoBrands' src={imgBootstrap} alt="" />
              <img className='logoBrands' src={imgNode} alt="" />            
              <img className='logoBrands' src={imgMysql} alt="" />
              <img className='logoBrands' src={imgMongo} alt="" />
              <img className='logoBrands' src={imgMaterial} alt="" />
            </div>
            <div className="imgBrandsGroup">
              <img className='logoBrands' src={imgSass} alt="" />
              <img className='logoBrands' src={imgNginx} alt="" />
              <img className='logoBrands' src={imgGit} alt="" />            
              <img className='logoBrands' src={imgDocker} alt="" />
              <img className='logoBrands' src={imgVite} alt="" />
              <img className='logoBrands' src={imgAi} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
