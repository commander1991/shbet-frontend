import { useState } from "react";
import "./Works.scss";
import arrow from '../img/arrow.png'
import mobile from '../img/mobile.png'
import globe from '../img/globe.png'
import writing from '../img/writing.png'

export default function Works() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const data = [
    {
      id: "1",
      icon: writing,
      title: "Web Design",
      desc:
        "Design comprehensive Frontend and Backend interfaces for the website.",
      img:
        "https://99designs-blog.imgix.net/blog/wp-content/uploads/2018/10/attachment_100040756-e1538485934255.jpeg?auto=format&q=60&fit=max&w=930",
    },
    {
      id: "2",
      icon: mobile,
      title: "Mobile Application",
      desc:
        "Design mobile interface, convert to mobile app.",
      img:
        "https://i.pinimg.com/originals/e9/c9/2f/e9c92f7869d682a6fa5a97fb8a298f30.jpg",
    },
    {
      id: "3",
      icon: globe,
      title: "Branding",
      desc:
        "Every design in the brand identity that is designed synchronously and consistently can bring about high impact, promoting recognition and thereby generating emotions and behavior.",
      img:
        "https://i.pinimg.com/originals/a9/f6/94/a9f69465d972a004ad581f245d6ad581.jpg",
    },
  ];

  const handleClick = (way) => {
    way === "goleft"
      ? setCurrentSlide(currentSlide > 0 ? currentSlide - 1 : 2)
      : setCurrentSlide(currentSlide < data.length - 1 ? currentSlide + 1 : 0);
  };

  return (
    <div className="works" id="works">
      <div className="worksTitle">
          <h1>Work description</h1>
      </div>
      <div
        className="worksSlider"
        style={{ transform: `translateX(-${currentSlide * 100}vw)` }}
      >
        {data.map((d) => (
          <div className="containerWorks">
            <div className="itemWorks">
              <div className="leftWorks">
                <div className="leftContainerWorks">
                  <div className="imgContainerWorks">
                    <img src={d.icon} alt="" />
                  </div>
                  <h2>{d.title}</h2>
                  <p>{d.desc}</p>
                  <span>Projects</span>
                </div>
              </div>
              <div className="rightWorks">
                <img
                  src="https://99designs-blog.imgix.net/blog/wp-content/uploads/2018/10/attachment_100040756-e1538485934255.jpeg?auto=format&q=60&fit=max&w=930"
                  alt=""
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <img
        src={arrow}
        className="arrow goleft"
        alt=""
        onClick={() => handleClick("goleft")}
      />
      <img
        src={arrow}
        className="arrow goright"
        alt=""
        onClick={() => handleClick()}
      />
    </div>

  );
}
