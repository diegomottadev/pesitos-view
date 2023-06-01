import React from 'react';
import { Link, animateScroll as scroll } from 'react-scroll';
import './Landing.css'
export const Landing = () => {
    return (
        <div class="landing-body">
        <div class="landing-wrapper">
            <div id="header" >
                <div class="header-top">
                    <img src="assets/layout/images/landing/pesitos-logo.png" class="logo" alt="babylon-layout"/>
                    <a id="landing-menu-button" href="#">
                        <img src="assets/layout/images/landing/icon-ellipsis-v.svg" alt="Menu"/>
                    </a>
                    <ul id="landing-menu">
                        <li>
                            <Link
                                to="header"
                                smooth={true}
                                duration={500}
                            >
                            Inicio
                            </Link>       
                        </li>
                        <li>
                            <Link
                                to="features"
                                smooth={true}
                                duration={500}
                            >
                            Características
                            </Link>           
                        </li>
                        <li>
                            <Link
                                to="multimedia"
                                smooth={true}
                                duration={500}
                            >
                            ¿Qué es?
                            </Link>                        
                        </li>
                        <li>
                            <a href="#">Demostración</a>
                        </li>
                        
                       
                        <li>
                            <Link
                                to="contacto"
                                smooth={true}
                                duration={500}
                            >
                            Contacto
                            </Link>                        
                        </li>
                        
                    </ul>
                </div>

                
            </div>

            <div id="header" >
            <div class="header-content">
                    <h1>Controlá y ahorrá</h1>
                    <p>Evalua tus gastos y metas financieras</p>
                    <button type="button" class="p-button landing-button" >
                        <span class="p-button-text">Registrarse</span>
                    </button>
                </div>
            </div>
            <div id="features">
                <h1>Características</h1>
                <p></p>
                <div class="grid">
                    <div class="col-12 md:col-12 lg:col-4">
                        <div class="feature-box">
                            <img src="../layout/images/landing/icon-responsivelayout.svg" alt="babylon-layout" />
                            <h3>Responsive Layout</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </div>
                    </div>
                    <div class="col-12 md:col-12 lg:col-4">
                        <div class="feature-box">
                            <img src="../layout/images/landing/icon-moderndesign.svg" alt="babylon-layout" />
                            <h3>Modern Design</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </div>
                    </div>
                    <div class="col-12 md:col-12 lg:col-4">
                        <div class="feature-box">
                            <img src="../layout/images/landing/icon-welldocumented.svg" alt="babylon-layout" />
                            <h3>Well Documented</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </div>
                    </div>
                    <div class="col-12 md:col-12 lg:col-4">
                        <div class="feature-box">
                            <img src="../layout/images/landing/shape.svg" alt="babylon-layout" />
                            <h3>Clean Code</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </div>
                    </div>
                    <div class="col-12 md:col-12 lg:col-4">
                        <div class="feature-box">
                            <img src="../layout/images/landing/icon-gorgeous.svg" alt="babylon-layout" />
                            <h3>Gorgeous</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </div>
                    </div>
                    <div class="col-12 md:col-12 lg:col-4">
                        <div class="feature-box">
                            <img src="../layout/images/landing/icon-craftedforyou.svg" alt="babylon-layout" />
                            <h3>Crafted for You</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div id="multimedia">
                <h1>Multimedia</h1>
                <p>Duis nec lobortis massa, sed facilisis lorem. In hac habitasse platea dictumst. </p>
                <div class="video-container">
                    <iframe src="https://www.youtube.com/embed/Mcb8JtyQDJ4" frameborder="0" width="560"></iframe>
                </div>
            </div>
            <div id="contact" className='contact'>
                <h1>Contacto</h1>
                <p>Duis nec lobortis massa, sed facilisis lorem. In hac habitasse platea dictumst. </p>
                <div class="video-container">
                    <iframe src="https://www.youtube.com/embed/Mcb8JtyQDJ4" frameborder="0" width="560"></iframe>
                </div>
            </div>

            <div id="footer">
                <div class="grid">
                    <div class="col-12 lg:col-4">
                        <img src="../layout/images/logo-white.png" alt="babylon-layout" class="footer-logo"/>
                    </div>

                    <div class="col-12 lg:col-8 footer-menu">
                        <div class="grid">
                            <div class="col-12 md:col-6 lg:col-3">
                                <span>OVERVIEW</span>

                                <a href="#primefaces">Why PrimeFaces</a>

                                <a href="#prime">Who Uses PrimeFaces</a>

                                <a href="#testimonials">Testimonials</a>

                                <a href="#licence">License</a>

                            </div>
                            <div class="col-12 md:col-6 lg:col-3">
                                <span>DEMOS</span>

                                <a href="#faces">PrimeFaces</a>

                                <a href="#ng">PrimeNG</a>

                                <a href="#react">PrimeReact</a>

                                <a href="#ui">PrimeUI</a>

                            </div>
                            <div class="col-12 md:col-6 lg:col-3">
                                <span>SUPPORT</span>

                                <a href="#options">Support Options</a>

                                <a href="#pro">PRO</a>

                                <a href="#elite">Elite</a>

                                <a href="#forum">Forum</a>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};
