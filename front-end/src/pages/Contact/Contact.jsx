import React from "react";
import s from "./Contact.module.css";

const Contact = () => {
  return (
    <section>
      <div className={`${s.contactContainer} container`}>
        <div className={s.conactContent}>
          <h2 className={s.contactTitle}>Contact</h2>
        </div>
      </div>
    </section>
  );
};

export default Contact;
