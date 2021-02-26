import React, { useContext, useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom'
import logo from '../images/logoWhite.png'
import "../styles/Navbar.css"
import M from 'materialize-css'
import ShopContext from './context/shop-context'
import { userContext } from "../App"
import { postearGetEntity } from "./AdminPanel/FetchFunctions";

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems, {});
});

const NavBar = () => {
    const [textsearch, setTextSearch] = useState("")
    const history = useHistory()
    const { state, dispatch } = useContext(userContext);
    const [mouse, setMouse] = useState(false)
    const [Inicio, setInicio] = useState(false)
    const [Productos, setProductos] = useState(false)
    const [Preguntas, setPreguntas] = useState(false)
    const [CómoComprar, setCómoComprar] = useState(false)
    const [QuiénesSomos, setQuiénesSomos] = useState(false)
    const [Contacto, setContacto] = useState(false)
    const [bkColor, setBkColor] = useState(null/* '#b80090' */)
    const [bkColorSide, setBkColorSide] = useState(null/* '#b80090' */)
    const [bkColorWrapp, setBkColorWrapp] = useState(null/* '#b80090' */)

    const setBackGroundColor = (data) => {
        setBkColor(data[0].backgroundColor)
        setBkColorSide(data[0].backgroundColorSide)
        setBkColorWrapp(data[0].backgroundColorWrapp)
    }

    useEffect(() => {
        if (!bkColor) {
            postearGetEntity({ entityClass: "settings", fx: setBackGroundColor })
        }
    }, []);

    const handleSubmit = event => {
        event.preventDefault();
        if (textsearch) {
            history.push(`/resultsearch/${textsearch}`)
        } else {
            history.push("/resultsearch/_")
        }
        setTextSearch("")
    };

    const renderButton = () => {
        if (state) {
            return (
                <button
                    id="botonSesion"
                    className="btn #c62828 red darken-3"
                    onClick={() => {
                        let username = localStorage.getItem('nombre')
                        localStorage.clear();
                        dispatch({ type: "CLEAR" });
                        M.toast({
                            html: `${username} has cerrado tu sesión`,
                            classes: "#388e3c green darken-2",
                        });
                        history.push("/");
                    }}
                >
                    Salir
                </button>)
        } else {
            return (
                <button
                    id="botonSesion"
                    className="btn #c62828 red darken-3"
                    onClick={() => {
                        history.push("/login");
                    }}
                >
                    Ingresar
                </button>)
        }
    }

    const renderPanelAdmin = () => {
        if (state === "admin") {
            return (
                <Link to="/admin">
                    <i className="small material-icons left" id="iconAdmin">settings</i>
                </Link>)
        }/*  else {
            return (
                <div id="usuario" className={mouse ? "animate__animated animate__tada animate__infinite infinite" : " "} onMouseEnter={() => setMouse(true)} onMouseLeave={() => setMouse(false)}>
                    {"Usuario: "}{localStorage.getItem('nombre')} {localStorage.getItem('apellido')} {"   "}
                </div>)
        } */
    }

    return (
        <ShopContext.Consumer>
            {context => (
                <React.Fragment>
                    <div className="NavBar" style={{ backgroundColor: bkColor }}>
                        <div className="row">
                            <div className="col s4" >
                                <img alt="logo" id='imgLogo' src={logo} />
                            </div>
                            <div className="col s4">
                                <form className="form-inline" onSubmit={handleSubmit}>
                                    <input className="form-control sm-2" onKeyPress={event => event.key === 'Enter'} onChange={(e) => setTextSearch(e.target.value)} value={textsearch} id='inputSearch' type="search" placeholder="Buscar" aria-label="Search" />
                                </form>
                            </div>
                            <div className="col s2">
                                <Link to={textsearch ? `/resultsearch/${textsearch}` : "/resultsearch/_"}>
                                    <i className="small material-icons left" id="iconSearch" onClick={() => setTextSearch("")}>search</i>
                                </Link>
                            </div>
                            {/*                             <div className="col s1">
                                {renderPanelAdmin()}
                            </div> */}
                            <div className="col s2">
                                <Link to="/shoppingcart">
                                    <p id='cantidadProductos'>
                                        {context.cart.reduce((count, curItem) => { return count + curItem.quantity; }, 0)}
                                    </p>
                                    <i className="small material-icons left" id="iconCart">shopping_cart</i>
                                </Link>
                            </div>
                            {/*                             <div id="colBotonSesion" className="col s2">
                                {renderButton()}
                            </div> */}
                        </div>
                        <nav>
                            <div className="nav-wrapper" style={{ backgroundColor: bkColorWrapp }}>
                                <a href="" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                                <ul className="left hide-on-med-and-down">
                                    <li><Link className={Inicio ? "animate__animated animate__heartBeat animate__repeat-1	1" : " "} onMouseEnter={() => setInicio(true)} onMouseLeave={() => setInicio(false)} to="/">Inicio</Link></li>
                                    <li><Link className={Productos ? "animate__animated animate__heartBeat animate__repeat-1	1" : " "} onMouseEnter={() => setProductos(true)} onMouseLeave={() => setProductos(false)} to="/suppliers">Productos</Link></li>
                                    <li><Link className={Preguntas ? "animate__animated animate__heartBeat animate__repeat-1	1" : " "} onMouseEnter={() => setPreguntas(true)} onMouseLeave={() => setPreguntas(false)} to="/faqs">Preguntas frecuentes</Link></li>
                                    <li><Link className={CómoComprar ? "animate__animated animate__heartBeat animate__repeat-1	1" : " "} onMouseEnter={() => setCómoComprar(true)} onMouseLeave={() => setCómoComprar(false)} to="/howtobuy">¿Cómo comprar?</Link></li>
                                    <li><Link className={QuiénesSomos ? "animate__animated animate__heartBeat animate__repeat-1	1" : " "} onMouseEnter={() => setQuiénesSomos(true)} onMouseLeave={() => setQuiénesSomos(false)} to="/aboutus">¿Quiénes somos?</Link></li>
                                    <li><Link className={Contacto ? "animate__animated animate__heartBeat animate__repeat-1	1" : " "} onMouseEnter={() => setContacto(true)} onMouseLeave={() => setContacto(false)} to="/contact">Contacto</Link></li>
                                    <li>{renderPanelAdmin()}</li>
                                    <li>{renderButton()}</li>
                                </ul>
                            </div>
                        </nav>
                        <ul className="sidenav" id="mobile-demo" style={{ backgroundColor: bkColorSide }}>
                            <li ><Link to="/">Inicio</Link></li>
                            <li ><Link to="/suppliers">Productos</Link></li>
                            <li ><Link to="/faqs">Preguntas frecuentes</Link></li>
                            <li ><Link to="/howtobuy">¿Cómo comprar?</Link></li>
                            <li ><Link to="/aboutus">¿Quiénes Somos?</Link></li>
                            <li ><Link to="/contact">Contacto</Link></li>
                            <li>{renderPanelAdmin()}</li>
                            <li>{renderButton()}</li>
                        </ul>
                    </div>
                </React.Fragment>
            )}
        </ShopContext.Consumer>
    );
};

export default NavBar;
