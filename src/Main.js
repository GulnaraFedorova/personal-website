import React, { useState } from "react";
import ModalWindow from "./ModalWindow";
import Theme from "./Themes";
import { useTranslation } from "react-i18next";
import useLocalStorage from "./hooks/use-localstorage";
import i18next from "./i18next";

const Main = () => {
  const { t } = useTranslation();
  const [language, setLanguage] = useLocalStorage("language", "en");

  const handleLanguageChange = () => {
    if (language === "ru") {
      i18next.changeLanguage("en");
      setLanguage("en");
    } else if (language === "en") {
      i18next.changeLanguage("ru");
      setLanguage("ru");
    }
  };

  const { theme, setTheme } = Theme();
  const [isLightTheme, setIsLightTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "light";
  });
  const toggleTheme = () => {
    if (isLightTheme) {
      darkTheme();
    } else {
      lightTheme();
    }
    setIsLightTheme(!isLightTheme);
  };
  const darkTheme = () => {
    setTheme("dark");
  };
  const lightTheme = () => {
    setTheme("light");
  };

  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const upButton = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const toBlock = (height) => {
    window.scrollTo({ top: Number(height), left: 0, behavior: "smooth" });
  };

  const PDF_FILE_URL =
    language === "en"
      ? "https://gulnarafedorova.vercel.app/GulnaraFedorova_EN.pdf"
      : "https://gulnarafedorova.vercel.app/GulnaraFedorova_RU.pdf";

  const downloadFileAtURL = (url) => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const blobURL = window.URL.createObjectURL(new Blob([blob]));
        const fileName = url.split("/").pop();
        const aTag = document.createElement("a");
        aTag.href = blobURL;
        aTag.setAttribute("download", fileName);
        document.body.appendChild(aTag);
        aTag.click();
        aTag.remove();
      });
  };

  return (
    <div>
      <div className="switch">
        <button className="lang-switch" onClick={handleLanguageChange}>
          {language === "en" ? t("russian") : t("english")}
        </button>
        <div className="theme-switch" onClick={toggleTheme}>
          <div
            className={theme === "dark" ? "theme dark" : "theme light"}
            style={{
              transform: isLightTheme ? "translateX(38px)" : "translateX(0px)",
            }}
          ></div>
        </div>
      </div>
      <div className="container">
        <header>
          <div className="navigation">
            <div className="header-top">
              <h1>{t("owner name")}</h1>
              <h2>Junior Frontend Developer</h2>

              <div className="header-resume">
                <button
                  onClick={() => downloadFileAtURL(PDF_FILE_URL)}
                  className="btn"
                >
                  {t("download resume")}
                </button>
                <button
                  className="btn"
                  onClick={() =>
                    window.open(
                      language === "en" ? "/GulnaraFedorova_EN.pdf" : "/GulnaraFedorova_RU.pdf",
                      "_blank",
                      "noopener,noreferrer"
                    )
                  }
                >
                  {t("view resume")}
                </button>
              </div>

              <div className="header-menu">
                <button
                  className="header-text"
                  onClick={(e) => {
                    e.preventDefault();
                    upButton();
                  }}
                >
                  {t("about")}
                </button>
                <button
                  className="header-text"
                  data-height="320"
                  onClick={(e) => {
                    e.preventDefault();
                    toBlock(e.currentTarget.getAttribute("data-height"));
                  }}
                >
                  {t("tech stack")}
                </button>
                <button
                  className="header-text"
                  data-height="490"
                  onClick={(e) => {
                    e.preventDefault();
                    toBlock(e.currentTarget.getAttribute("data-height"));
                  }}
                >
                  {t("portfolio")}
                </button>
              </div>
            </div>

            <div className="header-buttons">
              <button onClick={handleOpenModal} className="btn">
                <p className="btn-text">{t("contacts")}</p>
              </button>

              <div className="header-icon">
                <a
                  href="https://www.linkedin.com/in/gulnarafedorova/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon icon-linkedin"
                  aria-label="LinkedIn"
                ></a>
                <a
                  href="https://github.com/GulnaraFedorova"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon icon-github"
                  aria-label="GitHub"
                ></a>
                <a
                  href="https://t.me/gkhurmatova"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon icon-telegram"
                  aria-label="Telegram"
                ></a>
                <a
                  href="https://www.instagram.com/khurmatova/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon icon-instagram"
                  aria-label="Instagram"
                ></a>
              </div>
            </div>
          </div>
        </header>

        <div className="main">
          <div className="about-block">
            <p>{t("about-block")}</p>
            <p>
              {t("completed")}
              <a
                href={
                  language === "en"
                    ? '/GF_Certificate_"Web-Development"_EN.pdf'
                    : '/GF_Certificate_"Web-Development"_RU.pdf'
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="accent">{t("course")}</span>
              </a>
              {t("at Yandex Practicum")}
            </p>
          </div>

          <div className="steak-block">
            <h3>{t("tech stack")}</h3>
            <ul>
              <li>
                <p>Frontend: React.js, JavaScript, CSS, HTML</p>
              </li>
              <li>
                <p>Backend: Express.js, Node.js, MongoDB, Nginx</p>
              </li>
              <li>
                <p>General: Git, Webpack, Postman, Figma, Pixel-Perfect</p>
              </li>
            </ul>
          </div>

          <div className="portfolio-block">
            <h3>{t("portfolio")}</h3>
            <ul className="portfolio-list">
              <li>
                <a
                  href="https://gulnarafedorova.github.io/happy-numbers-test/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="portfolio-item"
                >
                  <div className="portfolio-top">
                    <h4>Multiplication Game</h4>
                    <div>
                      <a
                        href="https://github.com/GulnaraFedorova/happy-numbers-test"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="portfolio-icon portfolio-github"
                        aria-label="GitHub repository"
                      ></a>
                      <a
                        href="https://gulnarafedorova.github.io/happy-numbers-test/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="portfolio-icon portfolio-link"
                        aria-label="Visit site"
                      ></a>
                    </div>
                  </div>
                  <p>{t("multiplication game about")}</p>
                  <ul className="portfolio-steak">
                    <li className="portfolio-steaklist">JavaScript</li>
                    <li className="portfolio-steaklist">jQuery</li>
                    <li className="portfolio-steaklist">HTML</li>
                    <li className="portfolio-steaklist">CSS</li>
                    <li className="portfolio-steaklist">Vite</li>
                  </ul>
                </a>
              </li>
              <li>
                <a
                  href="https://blog-app-client-seven-xi.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="portfolio-item"
                >
                  <div className="portfolio-top">
                    <h4>Blog App</h4>
                    <div>
                      <a
                        href="https://github.com/GulnaraFedorova/blog-app-client"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="portfolio-icon portfolio-github"
                        aria-label="GitHub repository"
                      ></a>
                      <a
                        href="https://blog-app-client-seven-xi.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="portfolio-icon portfolio-link"
                        aria-label="Visit site"
                      ></a>
                    </div>
                  </div>
                  <p>{t("blog app about")}</p>
                  <ul className="portfolio-steak">
                    <li className="portfolio-steaklist">React.js</li>
                    <li className="portfolio-steaklist">JavaScript</li>
                    <li className="portfolio-steaklist">Ant Design (UI)</li>
                    <li className="portfolio-steaklist">Axios</li>
                    <li className="portfolio-steaklist">Node.js</li>
                    <li className="portfolio-steaklist">Express</li>
                    <li className="portfolio-steaklist">PostgreSQL</li>
                    <li className="portfolio-steaklist">Sequelize ORM</li>
                    <li className="portfolio-steaklist">JSON Web Token (JWT)</li>
                  </ul>
                </a>
              </li>
              <li>
                <a
                  href="https://personal-website-six-iota-95.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="portfolio-item"
                >
                  <div className="portfolio-top">
                    <h4>Personal website</h4>
                    <div>
                      <a
                        href="https://github.com/GulnaraFedorova/Personal-website"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="portfolio-icon portfolio-github"
                        aria-label="GitHub repository"
                      ></a>
                      <a
                        href="https://personal-website-six-iota-95.vercel.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="portfolio-icon portfolio-link"
                        aria-label="Visit site"
                      ></a>
                    </div>
                  </div>
                  <p>{t("personal website about")}</p>
                  <ul className="portfolio-steak">
                    <li className="portfolio-steaklist">React.js</li>
                    <li className="portfolio-steaklist">JavaScript</li>
                    <li className="portfolio-steaklist">CSS</li>
                    <li className="portfolio-steaklist">HTML</li>
                  </ul>
                </a>
              </li>
              <li>
                <a
                  href="https://gulnarafedorova.github.io/tea-shop/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="portfolio-item"
                >
                  <div className="portfolio-top">
                    <h4>Tea Shop Project</h4>
                    <div>
                      <a
                        href="https://github.com/GulnaraFedorova/tea-shop"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="portfolio-icon portfolio-github"
                        aria-label="GitHub repository"
                      ></a>
                      <a
                        href="https://gulnarafedorova.github.io/tea-shop/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="portfolio-icon portfolio-link"
                        aria-label="Visit site"
                      ></a>
                    </div>
                  </div>
                  <p>{t("tea shop about")}</p>
                  <ul className="portfolio-steak">
                    <li className="portfolio-steaklist">JavaScript</li>
                    <li className="portfolio-steaklist">CSS</li>
                    <li className="portfolio-steaklist">HTML</li>
                  </ul>
                </a>
              </li>
              <li>
                <a
                  href="https://2engine-registration-app.vercel.app/register"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="portfolio-item"
                >
                  <div className="portfolio-top">
                    <h4>Registration App</h4>
                    <div>
                      <a
                        href="https://github.com/GulnaraFedorova/2engine-registration-app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="portfolio-icon portfolio-github"
                        aria-label="GitHub repository"
                      ></a>
                      <a
                        href="https://2engine-registration-app.vercel.app/register"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="portfolio-icon portfolio-link"
                        aria-label="Visit site"
                      ></a>
                    </div>
                  </div>
                  <p>{t("registration app about")}</p>
                  <ul className="portfolio-steak">
                    <li className="portfolio-steaklist">Next.js</li>
                    <li className="portfolio-steaklist">Redux</li>
                    <li className="portfolio-steaklist">react-hook-form</li>
                    <li className="portfolio-steaklist">JavaScript</li>
                    <li className="portfolio-steaklist">CSS</li>
                    <li className="portfolio-steaklist">HTML</li>
                  </ul>
                </a>
              </li>
              <li>
                <a
                  href="https://gulnarafedorova.github.io/alpha-marketing-project/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="portfolio-item"
                >
                  <div className="portfolio-top">
                    <h4>CRM Page Project</h4>
                    <div>
                      <a
                        href="https://github.com/GulnaraFedorova/alpha-marketing-project"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="portfolio-icon portfolio-github"
                        aria-label="GitHub repository"
                      ></a>
                      <a
                        href="https://gulnarafedorova.github.io/alpha-marketing-project/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="portfolio-icon portfolio-link"
                        aria-label="Visit site"
                      ></a>
                    </div>
                  </div>
                  <p>{t("crm page about")}</p>
                  <ul className="portfolio-steak">
                    <li className="portfolio-steaklist">JavaScript</li>
                    <li className="portfolio-steaklist">CSS</li>
                    <li className="portfolio-steaklist">HTML</li>
                  </ul>
                </a>
              </li>
              <li>
                <div className="portfolio-item">
                  <div className="portfolio-top">
                    <h4>Movies explorer</h4>
                    <div>
                      <a
                        href="https://github.com/GulnaraFedorova/movies-explorer-api"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="portfolio-icon portfolio-github"
                        aria-label="GitHub repository"
                      ></a>
                    </div>
                  </div>
                  <p>{t("movies explorer about")}</p>
                  <ul className="portfolio-steak">
                    <li className="portfolio-steaklist">React.js</li>
                    <li className="portfolio-steaklist">JavaScript</li>
                    <li className="portfolio-steaklist">CSS</li>
                    <li className="portfolio-steaklist">HTML</li>
                    <li className="portfolio-steaklist">Node.js</li>
                    <li className="portfolio-steaklist">Express.js</li>
                    <li className="portfolio-steaklist">MongoDB</li>
                  </ul>
                </div>
              </li>
              <li>
                <div className="portfolio-item">
                  <div className="portfolio-top">
                    <h4>Mesto</h4>
                    <div>
                      <a
                        href="https://github.com/GulnaraFedorova/react-mesto-api-full-gha"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="portfolio-icon portfolio-github"
                        aria-label="GitHub repository"
                      ></a>
                    </div>
                  </div>
                  <p>{t("mesto about")}</p>
                  <ul className="portfolio-steak">
                    <li className="portfolio-steaklist">React.js</li>
                    <li className="portfolio-steaklist">JavaScript</li>
                    <li className="portfolio-steaklist">CSS</li>
                    <li className="portfolio-steaklist">HTML</li>
                    <li className="portfolio-steaklist">Node.js</li>
                    <li className="portfolio-steaklist">Express.js</li>
                    <li className="portfolio-steaklist">MongoDB</li>
                  </ul>
                </div>
              </li>
              <li>
                <a
                  href="https://gulnarafedorova.github.io/russian-travel/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="portfolio-item"
                >
                  <div className="portfolio-top">
                    <h4>Russian Travel</h4>
                    <div>
                      <a
                        href="https://github.com/GulnaraFedorova/russian-travel?tab=readme-ov-file"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="portfolio-icon portfolio-github"
                        aria-label="GitHub repository"
                      ></a>
                      <a
                        href="https://gulnarafedorova.github.io/russian-travel/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="portfolio-icon portfolio-link"
                        aria-label="Visit site"
                      ></a>
                    </div>
                  </div>
                  <p>{t("russian travel about")}</p>
                  <ul className="portfolio-steak">
                    <li className="portfolio-steaklist">CSS</li>
                    <li className="portfolio-steaklist">HTML</li>
                  </ul>
                </a>
              </li>
              <li>
                <a
                  href="https://how-to-learn-xi-henna.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="portfolio-item"
                >
                  <div className="portfolio-top">
                    <h4>How to Learn</h4>
                    <div>
                      <a
                        href="https://github.com/GulnaraFedorova/how-to-learn?tab=readme-ov-file"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="portfolio-icon portfolio-github"
                        aria-label="GitHub repository"
                      ></a>
                      <a
                        href="https://how-to-learn-xi-henna.vercel.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="portfolio-icon portfolio-link"
                        aria-label="Visit site"
                      ></a>
                    </div>
                  </div>
                  <p>{t("how to learn about")}</p>
                  <ul className="portfolio-steak">
                    <li className="portfolio-steaklist">CSS</li>
                    <li className="portfolio-steaklist">HTML</li>
                  </ul>
                </a>
              </li>
              <li>
                <a
                  href="https://gulnarandsergey.tilda.ws"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="portfolio-item"
                >
                  <div className="portfolio-top">
                    <h4>Wedding invitation</h4>
                    <div>
                      <a
                        href="https://gulnarandsergey.tilda.ws"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="portfolio-icon portfolio-link"
                        aria-label="Visit site"
                      ></a>
                    </div>
                  </div>
                  <p>{t("wedding invitation about")}</p>
                  <ul className="portfolio-steak">
                    <li className="portfolio-steaklist">Tilda</li>
                  </ul>
                </a>
              </li>
            </ul>
          </div>

          <footer className="footer">
            <div className="footer-up">
              <button className="btn-up" onClick={upButton}></button>
              <p className="footer-beamtext">Beam me up!</p>
            </div>
            <p className="footer-text">© Gulnara Fedorova, 2024</p>
          </footer>
        </div>

        <ModalWindow show={showModal} onClose={handleCloseModal}>
          <h2>{t("contacts")}</h2>
          <p>{t("contact me")} 👇</p>
        </ModalWindow>
      </div>
    </div>
  );
};

export default Main;