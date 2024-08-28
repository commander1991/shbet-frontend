import "./testimonials.scss";
import imgWorking from '../img/working.png'
import imgEducation from '../img/education.png'
import imgTrophy from '../img/trophy.png'
import imgHobbies from '../img/hobbies.png'
import imgLanguage from '../img/language.png'
import imgSkills from '../img/skills.png'

export default function Testimonials() {
  const data = [
    {
      id: 1,
      title: "Working",
      img: imgWorking,
      desc: [
        "<h6>Company X</h6>05/2011 - 01/2021<br />- Accounting IT<br />- Customer Service<br />- Training new member<br />",
        "<h6>Start-up homestay</h6>01/2011 - 01/2023<br />- Accounting IT<br />- Customer Service<br />- Homestay manager",
      ]
    },
    {
      id: 2,
      title: "Education",
      img: imgEducation,
      desc:
        [
          "<h6>VTC Academy</h6>04/2021<br />- Graduated: AI Engineer<br />- Grade:<br />1. Project Source Code: 95/100<br />2. Project Presentation: 95/100<br />3. Project Package: 85/100<br />",
          "<h6>Funix</h6>06/2023 - today<br />- Fullstack Developer course (70%)<br />"
        ]
    },
    {
      id: 3,
      title: "Activities",
      img: imgTrophy,
      desc:
        "<h6>Company X</h6>03/2019 - 05/2019<br /><br />- 3rd Price:<br />- Topic: Security and Hacking<br /><br />",
    },
    {
      id: 4,
      title: "Hobbies",
      img: imgHobbies,
      desc:
        "- Music<br />- Gaming<br />- Traveling<br />- Food<br />",
    },
    {
      id: 5,
      title: "Language",
      img: imgLanguage,
      desc:
        "- English: 65/100",
    },
    {
      id: 6,
      title: "Skills",
      img: imgSkills,
      desc:
        "- HTML/CSS: Fundamental<br />70%<br />- Javascript: Intermediate<br /> 75%<br />- NodeJS: Intermediate<br /> 80%<br />- Bootstrap: Fundamental<br />60%",
    },
  ];
  return (
    <div className="testimonials" id="testimonials">
      <h1>About me</h1>
      <div className="containerTestimonials">
        {data.map((d) => (
          <div className={d.featured ? "cardTestimonials featured" : "cardTestimonials"}>
            <div className="topTestimonials">
              <img
                className="userTestimonials"
                src={d.img}
                alt=""
              />
            </div>
            <div className="headerTestimonials">
              <h4>{d.title}</h4>
            </div>
            <div className="centerTestimonials">
              <div dangerouslySetInnerHTML={{ __html: d.desc }} />
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
