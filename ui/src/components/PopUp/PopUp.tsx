import { useState } from "react";
import styles from "./popUp.module.scss";

const PopUp = ({ onClose }: any) => {
  const [message, setMessage] = useState("");

  const handleInputChange = (e: any) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async () => {
    const url = window.location.href; // Récupère l'URL actuelle
    const payload = {
      message: message,
      url: url,
    };

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/api/v1/annexe/frustration",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok) {
        throw new Error("Something went wrong with the API");
      }

      const responseData = await response.json();
      onClose(); // Ferme le PopUp après envoi réussi
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={styles.popUpContainer}>
      <div className={styles.popUpTop}>
        <p>Noter une frustration</p>
        <p>
          A chaque fois que vous avez un problème, une frustration, que l'outil
          ne vous permet pas de faire ce que vous voulez.
        </p>
      </div>
      <div className={styles.popUpMiddle}>
        <p>Ma frustration</p>
        <textarea
          name="popup_textarea"
          id="popup_textarea"
          value={message}
          onChange={handleInputChange}
        ></textarea>
      </div>
      <div className={styles.popUpBottom}>
        <button className={styles.buttonCancel} onClick={onClose}>
          Annuler
        </button>
        <button className={styles.buttonValidate} onClick={handleSubmit}>
          Envoyer
        </button>
      </div>
    </div>
  );
};

export default PopUp;
