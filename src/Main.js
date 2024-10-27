import React, { useEffect, useState } from "react";
import ModalWindow from './ModalWindow';
import Theme from './Thems';

const Main = () => {
  const { theme, setTheme } = Theme();
  const [isLightTheme, setIsLightTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'light';
  });
  const toggleTheme = () => {
    if (isLightTheme) {
      darkTheme()
    } else {
      lightTheme();
    }
    setIsLightTheme(!isLightTheme);
  }
  const darkTheme = () => {
    setTheme('dark');
  }
  const lightTheme = () => {
    setTheme('light');
  }

  const [showModal, setShowModal] = useState(false);
  const handelOpenModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const [scroll, setScroll] = useState(0);
  const scrollUp = () => {
    setScroll(window.scrollY)
  };
  const upButton = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  };
  useEffect(() => {
    window.addEventListener("scroll", scrollUp)
  }, []);
  const toBlock = (height) => {
    window.scrollTo({ top: height, left: 0, behavior: 'smooth' })
  };

  const PDF_FILE_URL = 'http://localhost:3000/GulnaraFedorova.pdf'
  const downloadFileAtURL = (url) => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const blobURL = window.URL.createObjectURL(new Blob([blob]))
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
      <div className="theme-switch">
        <div className="switch" onClick={toggleTheme}>
          <div className={theme === 'dark' ? "theme dark" : "theme light"}
            style={{ transform: isLightTheme ? 'translate(0px)' : 'translateX(38px)' }}></div>
        </div>
      </div>
      <div className="container">
        <header>
          <div className="navigation">
            <div className="header-top">
              <h1>Гульнара Федорова</h1>
              <h2>Junior Frontend Developer</h2>

              <div className="header-resume">
                <button onClick={() => { downloadFileAtURL(PDF_FILE_URL) }} className="btn"><a>Скачать резюме</a></button>
                <button className="btn"><a href="/GulnaraFedorova.pdf" target="_blank">Посмотреть резюме</a></button>
              </div>

              <div className="header-menu">
                <a className="header-text" onClick={upButton}>Обо мне</a>
                <a className="header-text" onClick={(e) => toBlock(e.target.getAttribute('height'))} height="320">Технологический стек</a>
                <a className="header-text" onClick={(e) => toBlock(e.target.getAttribute('height'))} height="490">Портфолио</a>
              </div>
            </div>

            <div className="header-buttons">
              <button onClick={handelOpenModal} className="btn"><p className="btn-text">Контакты</p></button>

              <div className="header-icon">
                <a href="https://github.com/GulnaraFedorova" target="_blank" className="icon github"></a>
                <a href="https://t.me/gkhurmatova" target="_blank" className="icon telegram"></a>
                <a href="https://www.instagram.com/khurmatova/" target="_blank" className="icon instagram"></a>
              </div>
            </div>
          </div>
        </header>

        <div className="main">
          <div className="about-block">
            <p>
              Меня увлекает frontend-разработка, потому что я люблю создавать интерфейсы, которые продуманы до мелочей и удобны для пользователей. Вдохновение пришло, когда я сделала электронные пригласительные для своей свадьбы через Тильду, где продумала опросы, информацию для гостей и интерфейс. Это погрузило меня в процесс создания логики сайта и визуальной части, но я столкнулась с ограничениями платформы, что подтолкнуло меня изучить веб-разработку глубже.
            </p>
            <p>
              Так я прошла <a href="/GF_Диплом_«Веб-разработчик».pdf" target="_blank"><span className="accent">курс «Веб-разработчик»</span></a> в Яндекс Практикуме и продолжаю совершенствоваться.
            </p>
          </div>

          <div className="steak-block">
            <h3>Технологический стек</h3>
            <ul>
              <li><p>Frontend: React.js, JavaScript, CSS, HTML</p></li>
              <li><p>Backend: Express.js, Node.js, MongoDB, Nginx</p></li>
              <li><p>General: Git, Webpack, Postman, Figma, Pixel-Perfect</p></li>
            </ul>
          </div>

          <div className="portfolio-block">
            <h3>Портфолио</h3>
            <ul className="portfolio-list">
              <li>
                <a href="https://personal-website-six-iota-95.vercel.app" target="_blank" className="portfolio-item">
                  <div className="portfolio-top">
                    <h4>Personal website</h4>
                    <div>
                      <a href="https://github.com/GulnaraFedorova/Personal-website" target="_blank" className="portfolio-icon portfolio-github"></a>
                      <a href="https://personal-website-six-iota-95.vercel.app" target="_blank" className="portfolio-icon portfolio-link"></a>
                    </div>
                  </div>
                  <p>
                    Сайт-портфолио создано для личного пользования. Дизайн выполнен в минималистичном стиле с акцентом на удобную навигацию и адаптивную верстку для различных устройств.
                  </p>
                  <ul className="portfolio-steak">
                    <li className="portfolio-steaklist">React.js</li>
                    <li className="portfolio-steaklist">JavaScript</li>
                    <li className="portfolio-steaklist">CSS</li>
                    <li className="portfolio-steaklist">HTML</li>
                  </ul>
                </a>
              </li>
              <li>
                <a href="https://gulnarafedorova.github.io/tea-shop/" target="_blank" className="portfolio-item">
                  <div className="portfolio-top">
                    <h4>Tea Shop Project</h4>
                    <div>
                      <a href="https://github.com/GulnaraFedorova/tea-shop" target="_blank" className="portfolio-icon portfolio-github"></a>
                      <a href="https://gulnarafedorova.github.io/tea-shop/" target="_blank" className="portfolio-icon portfolio-link"></a>
                    </div>
                  </div>
                  <p>
                    Простое веб-приложение для магазина чая, где пользователи могут просматривать и покупать различные виды чая.                  </p>
                  <ul className="portfolio-steak">
                    <li className="portfolio-steaklist">JavaScript</li>
                    <li className="portfolio-steaklist">CSS</li>
                    <li className="portfolio-steaklist">HTML</li>
                  </ul>
                </a>
              </li>
              <li>
                <a href="https://2engine-registration-app.vercel.app/register" target="_blank" className="portfolio-item">
                  <div className="portfolio-top">
                    <h4>Registration App</h4>
                    <div>
                      <a href="https://github.com/GulnaraFedorova/2engine-registration-app" target="_blank" className="portfolio-icon portfolio-github"></a>
                      <a href="https://2engine-registration-app.vercel.app/register" target="_blank" className="portfolio-icon portfolio-link"></a>
                    </div>
                  </div>
                  <p>
                    Приложение позволяет пользователям регистрироваться и добавлять, редактировать и удалять записи в личном кабинете. Приложение содержит форму регистрации и страницу для работы с записями пользователя.
                  </p>
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
                <a href="https://gulnarafedorova.github.io/alpha-marketing-project/" target="_blank" className="portfolio-item">
                  <div className="portfolio-top">
                    <h4>CRM Page Project</h4>
                    <div>
                      <a href="https://github.com/GulnaraFedorova/alpha-marketing-project" target="_blank" className="portfolio-icon portfolio-github"></a>
                      <a href="https://gulnarafedorova.github.io/alpha-marketing-project/" target="_blank" className="portfolio-icon portfolio-link"></a>
                    </div>
                  </div>
                  <p>
                    Основная цель проекта – реализовать страницу CRM для сайта, следуя предоставленному макету и обеспечивая полную адаптивность страницы на разных устройствах.
                  </p>
                  <ul className="portfolio-steak">
                    <li className="portfolio-steaklist">JavaScript</li>
                    <li className="portfolio-steaklist">CSS</li>
                    <li className="portfolio-steaklist">HTML</li>
                  </ul>
                </a>
              </li>
              <li>
                <a className="portfolio-item">
                  <div className="portfolio-top">
                    <h4>Movies explorer</h4>
                    <div>
                      <a href="https://github.com/GulnaraFedorova/movies-explorer-api" target="_blank" className="portfolio-icon portfolio-github"></a>
                    </div>
                  </div>
                  <p>
                    Сервис по поиску фильмов с функцией сохранения понравившихся в личном кабинете, а также с возможностью авторизации и регистрации пользователей.
                  </p>
                  <ul className="portfolio-steak">
                    <li className="portfolio-steaklist">React.js</li>
                    <li className="portfolio-steaklist">JavaScript</li>
                    <li className="portfolio-steaklist">CSS</li>
                    <li className="portfolio-steaklist">HTML</li>
                    <li className="portfolio-steaklist">Node.js</li>
                    <li className="portfolio-steaklist">Express.js</li>
                    <li className="portfolio-steaklist">MongoDB</li>
                  </ul>
                </a>
              </li>
              <li>
                <a className="portfolio-item">
                  <div className="portfolio-top">
                    <h4>Mesto</h4>
                    <div>
                      <a href="https://github.com/GulnaraFedorova/react-mesto-api-full-gha" target="_blank" className="portfolio-icon portfolio-github"></a>
                    </div>
                  </div>
                  <p>
                    Mesto - интерактивная страница с функцией добавления и удаления фотографий, возможностью ставить лайки, а также с возможностью авторизации и регистрации пользователей.
                  </p>
                  <ul className="portfolio-steak">
                    <li className="portfolio-steaklist">React.js</li>
                    <li className="portfolio-steaklist">JavaScript</li>
                    <li className="portfolio-steaklist">CSS</li>
                    <li className="portfolio-steaklist">HTML</li>
                    <li className="portfolio-steaklist">Node.js</li>
                    <li className="portfolio-steaklist">Express.js</li>
                    <li className="portfolio-steaklist">MongoDB</li>
                  </ul>
                </a>
              </li>
              <li>
                <a href="https://gulnarafedorova.github.io/russian-travel/" target="_blank" className="portfolio-item">
                  <div className="portfolio-top">
                    <h4>Russian Travel</h4>
                    <div>
                      <a href="https://github.com/GulnaraFedorova/russian-travel?tab=readme-ov-file" target="_blank" className="portfolio-icon portfolio-github"></a>
                      <a href="https://gulnarafedorova.github.io/russian-travel/" target="_blank" className="portfolio-icon portfolio-link"></a>
                    </div>
                  </div>
                  <p>
                    Проект "Russian Travel" разработан для информирования пользователей о различных туристических маршрутах по России, подчёркивая природные и культурные достопримечательности страны. Создан типовой одностраничный сайт с применением адаптивной вёрстки и современного дизайна по макету.
                  </p>
                  <ul className="portfolio-steak">
                    <li className="portfolio-steaklist">CSS</li>
                    <li className="portfolio-steaklist">HTML</li>
                  </ul>
                </a>
              </li>
              <li>
                <a href="https://how-to-learn-xi-henna.vercel.app" target="_blank" className="portfolio-item">
                  <div className="portfolio-top">
                    <h4>How to Learn</h4>
                    <div>
                      <a href="https://github.com/GulnaraFedorova/how-to-learn?tab=readme-ov-file" target="_blank" className="portfolio-icon portfolio-github"></a>
                      <a href="https://how-to-learn-xi-henna.vercel.app" target="_blank" className="portfolio-icon portfolio-link"></a>
                    </div>
                  </div>
                  <p>
                    Проект "How to Learn" — это адаптивный одностраничный сайт с информацией о методах обучения, выполненный с использованием флексбокс-вёрстки, продвинутой семантики HTML, анимаций и кастомных шрифтов. Файловая структура проекта оформлена по методологии Nested БЭМ.
                  </p>
                  <ul className="portfolio-steak">
                    <li className="portfolio-steaklist">CSS</li>
                    <li className="portfolio-steaklist">HTML</li>
                  </ul>
                </a>
              </li>
              <li>
                <a href="https://gulnarandsergey.tilda.ws" target="_blank" className="portfolio-item">
                  <div className="portfolio-top">
                    <h4>Wedding invitation</h4>
                    <div>
                      <a href="https://gulnarandsergey.tilda.ws" target="_blank" className="portfolio-icon portfolio-link"></a>
                    </div>
                  </div>
                  <p>
                    Этот лендинг был создан на платформе Tilda для семейного проекта. Дизайн выполнен в минималистичном стиле с акцентом на удобную навигацию и адаптивную верстку для различных устройств.
                  </p>
                  <ul className="portfolio-steak">
                    <li className="portfolio-steaklist">Tilda</li>
                  </ul>
                </a>
              </li>
            </ul>
          </div>

          <footer class="footer">
            <div className="footer-up">
              <button
                className="btn-up"
                onClick={upButton}>
              </button>
              <p className="footer-beamtext">Beam me up!</p>
            </div>
            <p className="footer-text">© Gulnara Fedorova, 2024</p>
          </footer>
        </div>

        <ModalWindow show={showModal} onClose={handleCloseModal}>
          <h2>Контакты</h2>
          <p>Вы можете связаться со мной 👇</p>
        </ModalWindow>

      </div>
    </div>
  );
}

export default Main;
