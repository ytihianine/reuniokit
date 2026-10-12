"use client";

import React, { useState } from "react";
import "./connexion.scss";
//import HomeIcon from '@/src/components/HomeIcon/HomeIcon';
//import HelpIcon from '@/src/components/Icons/HelpIcon/HelpIcon';
import Button from "@/src/components/Buttons/Button/Button";

//import '@gouvfr/dsfr/dist/utility/icons/icons.css';

const bubble_txt_connexion__icon =
  process.env.NEXT_PUBLIC_ASSETS + "/connexion/img/bubble_text_icon.svg";

// Déclaration de la fonction
const Connexion: React.FC = () => {
  // etat local pour gerer les données du formulaire
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    provider: "db",
    refresh: true,
  });
  // Fonction pour gérer les changements le formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "/api/v1/security/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      },
    );
    if (!response.ok) {
      throw new Error("Failed to get token");
    }
    const data = await response.json();
    document.cookie = "token=" + data["access_token"] + "; SameSite=Lax";
    setFormData({
      username: "",
      password: "",
      provider: "db",
      refresh: true,
    });
  };

  return (
    <>
      <div className="loginPage">
        {/*    <div className="leftSection">
                    <img className='reuniokit' src={process.env.NEXT_PUBLIC_ASSETS + "/list/img/reuniokit__logo.svg"} alt="reuniokit" />
                    <img className='bercylab' src={process.env.NEXT_PUBLIC_ASSETS + "/list/img/bercylab__logo.svg"} alt="reuniokit" />
                </div>
                <div className='rightSection'>
                    <HomeIcon></HomeIcon>
                    <HelpIcon></HelpIcon>
                </div> */}
        <h1 className="h1">Connexion</h1>
        <h3 className="h3">Rentrez vos identifiants pour vous connecter</h3>
        <div className="sectionContainer">
          <div className="leftSection">
            <img src={bubble_txt_connexion__icon} alt="" />
          </div>
          <div className="rightSection">
            <form onSubmit={handleSubmit}>
              <label>
                Adresse électronique
                <input
                  className="log"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </label>
              <br />
              <label>
                Mot de passe
                <input
                  className="log"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <div className="mdp">Mot de passe oublié ?</div>
              </label>
              <Button text="Valider" buttonType="primary"></Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Connexion;
