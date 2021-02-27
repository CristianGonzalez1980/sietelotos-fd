import React, { useState, useEffect  } from 'react';
import { Link } from 'react-router-dom'
import { SocialIcon } from 'react-social-icons';
import '../styles/Footer.css'
import { postearGetEntity } from "./AdminPanel/FetchFunctions";

const Footer = () => {

  const [bkColor, setBkColor] = useState(null/* '#b80090' */)

  const setBackGroundColor = (data) => {
    setBkColor(data[0].backgroundColorFooter)
  }

  useEffect(() => {
    if (!bkColor) {
      postearGetEntity({ entityClass: "settings", fx: setBackGroundColor })
    }
  }, []);

  return (
    <footer className="page-footer" style={{ backgroundColor: bkColor }}>
      <div>
        <div className="row">
          <div className="col s4">
            <h5 className="white-text" id="footerT">Siete Lotos Artesanias</h5>
            <p></p>
          </div>
          <div className="col s4">
            <h5 className="white-text" id="footerT">Categorías</h5>
            <ul>
              <li><Link id="linkList" to="/suppliers">Productos</Link></li>
              <li><Link id="linkList" to="/faqs">Preguntas frecuentes</Link></li>
              <li><Link id="linkList" to="/howtobuy">¿Cómo comprar?</Link></li>
              <li><Link id="linkList" to="/aboutus">¿Quiénes somos?</Link></li>
              <li><Link id="linkList" to="/contact">Contacto</Link></li>
            </ul>
          </div>
          <div className="col s4">
            <h5 className="white-text" id="footerT">Contáctenos</h5>
            <ul>
              <li>
                <div>
                  <div className="row">
                    <div className="col s2" id="iconFooter">
                      <SocialIcon className="SocialIcon" network="whatsapp" bgColor="#ffffff" style={{ height: 25, width: 25 }} />
                    </div>
                    <div className="col s10" id="wpFooter">+5491123869642</div>
                  </div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div className="col s2" id="iconFooter"><i className="material-icons">email</i></div>
                  <div className="col s10" id="wpFooter">eventos@guiadelarte.com.ar</div>
                </div>
              </li>
            </ul>
          </div>
          <div className="col l4 offset-l2 s12">
          </div>
        </div>
      </div>
      <div className="footer">
        <div className="containerF" id="contFooter">
          <div className="row">
            <div className="col s3"><SocialIcon url="https://www.facebook.com/Siete-Lotos-Artesanias-120194046559599" className="SocialIcon" network="facebook" bgColor="#ffffff" /></div>
            <div className="col s3"><SocialIcon url="http://instagram.com/Siete-Lotos-Artesanias-120194046559599" className="SocialIcon" network="instagram" bgColor="#ffffff" /></div>
            <div className="col s3">{/* <Link id="linkList" to="/contact">*/}< SocialIcon id="linkList" url="/contact" className="SocialIcon" network="email" bgColor="#ffffff" />{/* </Link> */}</div>
            <div className="col s3"><SocialIcon url="https://wa.me/5491123869642" className="SocialIcon" network="whatsapp" bgColor="#ffffff" /></div>
          </div>
          <div className='row'>
            <div className='col s6'>
              © 2021 Copyright Siete Lotos Artesanias
            </div>
            <div className='col s6'>
              <div className="float-btn float-right float-bottom">
                <span tabIndex="0" data-toggle="tooltip" data-placement="top" data-trigger="hover" title="Estamos en WhatsApp. Consultanos!">
                  <a id="float-btn-action" className="float-fab float-btn-large fl-circle" href="https://api.whatsapp.com/send?phone=5491123869642&text=Hola!" target="_blank">
                    <i className="fa fa-whatsapp">
                    </i>
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
