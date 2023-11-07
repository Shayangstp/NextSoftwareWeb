import React from "react";
import {
  faInstagram,
  faLinkedinIn,
  faWhatsapp,
  faTelegram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SocialMedia = () => {
  return (
    <div>
      <button className="mr-2 hover:text-secondary">
        <FontAwesomeIcon icon={faInstagram} />
      </button>
      <button className="mr-2 hover:text-secondary">
        <FontAwesomeIcon icon={faWhatsapp} />
      </button>
      <button className="mr-2 hover:text-secondary">
        <FontAwesomeIcon icon={faTelegram} />
      </button>
      <button className="mr-2 hover:text-secondary">
        <FontAwesomeIcon icon={faLinkedinIn} />
      </button>
    </div>
  );
};

export default SocialMedia;
