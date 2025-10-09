import React from "react";
import s from "./About.module.css";

const About = () => {
  return (
    <section>
      <div className={` ${s.aboutContainer} container`}>
        <div className={s.aboutContent}>
          <h2 className={s.aboutTitle}>About</h2>
        </div>
      </div>
    </section>
  );
};

export default About;
