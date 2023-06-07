import React from 'react';
import { Link } from 'react-scroll';

import './Landing.css'
export const Landing = () => {

    const BabylonLanding = {
        addClass: function(element, className) {
          if (element.classList) element.classList.add(className);
          else element.className += ' ' + className;
            
          var mask = document.createElement('div');
          mask.className = 'layout-mask';
          element.appendChild(mask);
          console.log(element)
          mask.addEventListener('click', function(e) {
            BabylonLanding.hideMenu();
            e.preventDefault();
          });
        },
      
        removeClass: function(element, className) {
          if (element.classList) element.classList.remove(className);
          else
            element.className = element.className.replace(
              new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'),
              ' '
            );
      
          var mask = document.getElementsByClassName('layout-mask')[0];
          if (mask) element.removeChild(mask);
        },
      
        hasClass: function(element, className) {
          if (element.classList) return element.classList.contains(className);
          else return new RegExp('(^| )' + className + '( |$)', 'gi').test(element.className);
        },
      
        hideMenu: function() {
          this.removeClass(document.getElementsByClassName('landing-body')[0], 'landing-menu-active');
        },
      
        showMenu: function() {
          this.addClass(document.getElementsByClassName('landing-body')[0], 'landing-menu-active');
        },
    
      };
      

      const hideSideMenu = () =>{
        BabylonLanding.hideMenu();
      }

      const LandingMenuButton = () => {
        const handleMenuButtonClick = (e) => {
          var menu = document.getElementsByClassName('landing-body')[0];
      
          if (BabylonLanding.hasClass(menu, 'landing-menu-active')) BabylonLanding.hideMenu();
          else BabylonLanding.showMenu();
      
          e.preventDefault();
        };
      
        return (
          <a id="landing-menu-button" href="#" onClick={handleMenuButtonClick}>
            <img src="assets/layout/images/landing/icon-ellipsis-v.svg" alt="Menu" />
          </a>
        );
      };
      


    return (
        <div className="landing-body">
            <div className="landing-wrapper">
                <div id="header" className='header fixed-header'>
                    <div className="header-top">
                        <img src="assets/layout/images/landing/pesitos-logo.png" className="logo" alt="pesitos-logo" />
                        {/* <a id="landing-menu-button" href="#">
                            <img src="assets/layout/images/landing/icon-ellipsis-v.svg" alt="Menu" />
                        </a> */}
                        <LandingMenuButton />

                        <ul id="landing-menu">
                            <li >
                                <Link onClick={() => hideSideMenu()}
                                    to="header-content-fix"
                                    smooth={true}
                                    duration={400}
                                >
                                    ¿Qué es?
                                </Link>
                            </li>
                            <li >
                                <Link onClick={() => hideSideMenu()}
                                    to="pain"
                                    smooth={true}
                                    duration={400}
                                >
                                    Beneficios
                                </Link>
                            </li>
                            <li>
                                <Link onClick={() => hideSideMenu()}
                                    to="earn"
                                    smooth={true}
                                    duration={400}
                                >
                                    ¿Qué gano?
                                </Link>
                            </li>
                            <li>
                                <Link onClick={() => hideSideMenu()}
                                    to="features"
                                    smooth={true}
                                    duration={400}
                                >
                                    Características
                                </Link>
                            </li>
                            <li>
                                <Link onClick={() => hideSideMenu()}
                                    to="multimedia"
                                    smooth={true}
                                    duration={400}
                                >
                                    Demostración
                                </Link>
                            </li>

                            <li>
                                <Link onClick={() => hideSideMenu()}
                                    to="contact"
                                    smooth={true}
                                    duration={400}
                                >
                                    Contacto
                                </Link>
                            </li>
                            {/* <li>
                            <Linked
                                to="/login"
                            >
                            Ingreso
                            </Linked>                        
                        </li> */}
                        </ul>
                    </div>
                </div>

                <div className="header-content-fix">
                    <div className="p-fluid formgrid grid">
                        <div className='col-12 lg:col-6 xl:col-6'>
                            <img src="assets/layout/images/landing/logo-header-black.png" className="logo" alt="pesitos-header" />
                            <h2>Gestión de finanzas personales</h2>
                            <p style={{ textAlign: 'justify' }}>📲Pesitos es una solución diseñada para personas y familias conscientes de su presupuesto, emprendedores, trabajadores independientes, profesionales financieros y estudiantes universitarios.</p>
                            <p style={{ textAlign: 'justify' }}>📝Ayuda a  registrar y categorizar cada gasto e ingreso que tengas, permitiéndote lograr un control efectivo y consciente de tus finanzas.</p>
                            <p style={{ textAlign: 'justify' }}>🎯Logrando una visión clara y detallada de tu progreso hacia tus metas financieras, lo que te permitirá tomar decisiones informadas para asegurar tu economía.</p>
                        </div>
                        <div className='col-12 lg:col-6 xl:col-6' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <img src="assets/layout/images/landing/fondo-landing.png" style={{ width: '90%' }} alt="pesitos-app" />
                        </div>
                    </div>
                    {/* <button type="button" className="p-button landing-button" >
                                <span className="p-button-text">Registrarse</span>
                    </button> */}
                </div>
                <div className="pain">
                    <p>&nbsp;</p>
                    <h2 style={{ textAlign: 'center' }}>Beneficios</h2>
                    <p>&nbsp;</p>
                    <div className="p-fluid formgrid grid">
                        <div className='col-12 lg:col-6 xl:col-6' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <img src="assets/layout/images/landing/beneficios-back.png" style={{ width: '90%' }} alt="pesitos-beneficios" />
                        </div>
                        <div className='col-12 lg:col-6 xl:col-6'>
                            <p style={{ textAlign: 'justify' }}><b>❎¿Te preocupa no tener un control efectivo de tus finanzas?</b> Con Pesitos, podrás registrar y categorizar cada gasto e ingreso de manera fácil y obtener una visión clara de tu progreso financiero, eliminando la incertidumbre y brindándote tranquilidad económica.</p>
                            <p style={{ textAlign: 'justify' }}><b>❎¿Te gustaría tomar decisiones financieras informadas, pero te falta una visión clara de tus metas y progreso?</b> Pesitos es una aplicación web para registrar y categorizar tus movimientos financieros, brindándote una visión detallada y ayudándote a tomar decisiones estratégicas para asegurar la estabilidad de tu economía.</p>
                            <p style={{ textAlign: 'justify' }}><b>❎¿Sientes que tus finanzas están fuera de control y te gustaría tener una gestión financiera más consciente?</b> Con Pesitos, sentirás un control efectivo de tus finanzas al registrar y categorizar cada gasto e ingreso. Tendrás una visión clara de tu situación financiera y toma el control de tu economía para alcanzar tus metas con confianza.</p>

                        </div>
                    </div>
                </div>
                <div className="earn">
                    <p>&nbsp;</p>
                    <h2 style={{ textAlign: 'center' }}>¿Que gano usando Pesitos?</h2>
                    <p>&nbsp;</p>
                    <div className="p-fluid formgrid grid">
                        <div className='col-12 lg:col-6 xl:col-6'>
                            <p style={{ textAlign: 'justify' }}><b>✅Control financiero: </b>al registrar y categorizar cada gasto e ingreso con Pesitos, ganarás un mayor control sobre tus finanzas, permitiéndote tener una visión clara y detallada de tus movimientos financieros.</p>
                            <p style={{ textAlign: 'justify' }}><b>✅Conciencia financiera: </b>desarrollarás una mayor conciencia sobre tus hábitos de gasto e ingreso, lo que te ayudará a tomar decisiones más informadas y a mejorar tus patrones de consumo.</p>
                            <p style={{ textAlign: 'justify' }}><b>✅Progreso hacia metas financieras: </b> podrás establecer metas financieras y hacer un seguimiento de tu progreso hacia ellas. Esto te permitirá tomar medidas concretas para alcanzar tus objetivos y lograr una mayor estabilidad económica.</p>
                            <p style={{ textAlign: 'justify' }}><b>✅Tranquilidad económica: </b> al tener una visión clara de tu situación financiera y un control efectivo sobre tus gastos e ingresos, ganarás tranquilidad y confianza en tu capacidad para administrar tu economía de manera eficiente.</p>
                            <p style={{ textAlign: 'justify' }}><b>✅Optimización de recursos: </b> podrás identificar áreas en las que puedes optimizar tus recursos y reducir gastos innecesarios. Esto te ayudará a maximizar tus ahorros y a destinar tus recursos de manera más efectiva.</p>
                        </div>
                        <div className='col-12 lg:col-6 xl:col-6' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <img src="assets/layout/images/landing/gano-back.png" style={{ width: '90%' }} alt="pesitos-que-gano" />
                        </div>
                    </div>
                </div>
                <div id="features">
                    <p>&nbsp;</p>
                    <h1>Características</h1>
                    <p>&nbsp;</p>
                    <div className="grid">
                        <div className="col-12 md:col-12 lg:col-4">
                            <div className="feature-box">
                                <img style={{ height: '40px' }} src="assets/layout/images/landing/icon-responsivelayout.svg" alt="babylon-layout" />
                                <h3>Diseño responsivo</h3>
                                <p style={{ textAlign: 'justify' }}>Accede a Pesitos desde cualquier dispositivo, ya sea tu computadora, tableta o teléfono móvil</p>
                            </div>
                        </div>
                        <div className="col-12 md:col-12 lg:col-4">
                            <div className="feature-box">
                                <img src="assets/layout/images/landing/icon-moderndesign.svg" alt="babylon-layout" />
                                <h3>Visualización de gráficos</h3>
                                <p style={{ textAlign: 'justify' }}>Observa de forma clara y visual cómo se distribuye tu dinero con nuestros gráficos de barras y gráficos de torta</p>
                            </div>
                        </div>
                        <div className="col-12 md:col-12 lg:col-4">
                            <div className="feature-box">
                                <img src="assets/layout/images/landing/icon-welldocumented.svg" alt="babylon-layout" />
                                <h3>Videos explicativos</h3>
                                <p style={{ textAlign: 'justify' }}>Videos explicativos te guían paso a paso en el uso de la aplicación y en el registro de todos tus movimientos de dinero.</p>
                            </div>
                        </div>
                        <div className="col-12 md:col-12 lg:col-4">
                            <div className="feature-box">
                                <img src="assets/layout/images/landing/shape.svg" alt="babylon-layout" />
                                <h3>Generación de reportes</h3>
                                <p style={{ textAlign: 'justify' }}>Control más detallado y personalizado de tus movimientos de dinero con nuestros reportes generados en formato Excel. Con los filtros podrás seleccionar un período de tiempo y generar informes acorde a tus necesidades</p>
                            </div>
                        </div>
                        <div className="col-12 md:col-12 lg:col-4">
                            <div className="feature-box">
                                <img src="assets/layout/images/landing/icon-gorgeous.svg" alt="babylon-layout" />
                                <h3>Control y Seguimiento</h3>
                                <p style={{ textAlign: 'justify' }}>Mantén un seguimiento preciso de tus finanzas al visualizar los valores mensuales y acumulados de tus ingresos, gastos, ahorros y gastos de tarjetas de crédito.  Esto te permite evaluar tu progreso financiero a lo largo del tiempo</p>
                            </div>
                        </div>
                        <div className="col-12 md:col-12 lg:col-4">
                            <div className="feature-box">
                                <img src="assets/layout/images/landing/icon-craftedforyou.svg" alt="babylon-layout" />
                                <h3>Conciencia económica</h3>
                                <p style={{ textAlign: 'justify' }}>Podrás identificar y rastrear fácilmente en qué áreas o categorías estás gastando más, lo que te permitirá tener un mayor conocimiento de tus patrones de consumo y tomar decisiones más informadas sobre tus finanzas</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="multimedia">
                    <p>&nbsp;</p>
                    <h1>Demostración</h1>
                    <p>En este video te cuento como es por dentro la aplicación</p>
                    <div className="video-container">
                        <iframe src="https://www.youtube.com/embed/2SYjtxSeah8"  width="560"></iframe>
                    </div>
                </div>
                <div className='contact'>
                    <p>&nbsp;</p>
                    <h2>Contacto</h2>
                    <p>Puedes ponerte en contacto conmigo en cualquiera de mis redes sociales</p>
                    <div className="video-container">
                        <i className="pi pi-linkedin m-1" style={{ fontSize: '2.5rem', color: '#9C27B0', cursor: 'pointer' }} onClick={() => window.open('https://www.linkedin.com/in/diegoivanmotta', '_blank')} />
                        <i className="pi pi-instagram m-1" style={{ fontSize: '2.5rem', color: '#9C27B0', cursor: 'pointer' }} onClick={() => window.open('https://www.instagram.com/pesitosapp', '_blank')} />
                        <i className="pi pi-twitter m-1" style={{ fontSize: '2.5rem', color: '#9C27B0', cursor: 'pointer' }} onClick={() => window.open('https://www.twitter.com/diegomottadev', '_blank')} />
                    </div>
                </div>

                <div id="footer">
                    <div className="grid">
                        <div className="col-12 lg:col-12" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <img src="assets/layout/images/landing/pesitos-logo.png" alt="babylon-layout" className="footer-logo" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
