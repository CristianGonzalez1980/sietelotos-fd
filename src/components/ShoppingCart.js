import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/ShoppingCart.css'
import ShopContext from './context/shop-context'
import CourrierCard from './CourrierCard';
import M from 'materialize-css'

export var sendMethodCostTopLevel = null
export var sendMethodNameTopLevel = null

export const precioTotal = (products) => {
  let contador = 0
  products.forEach((cartItem) => {
    contador = contador + (cartItem.itemPrice * cartItem.quantity)
  })
  return contador
}

export const pesoTotal = (products) => {
  let acumulador = 0
  products.forEach((cartItem) => {
    console.log((parseInt(cartItem.pesoGr / 1000) + 1))/* aca decia 100 en lugar de 1000 igual que la linea de abajo, no se porque */
    acumulador = acumulador + ((parseInt(cartItem.pesoGr / 1000) + 1) * cartItem.quantity)
  })
  return acumulador
}

export const volumenTotal = (products) => {
  let anchoTotal = 0
  let longitudTotal = 0
  let alturaTotal = 0
  products.forEach((cartItem) => {
    anchoTotal += cartItem.ancho * cartItem.quantity
    longitudTotal += cartItem.longitud * cartItem.quantity
    alturaTotal += cartItem.alto * cartItem.quantity
  })
  return `${longitudTotal}x${anchoTotal}x${alturaTotal}`
}

const ShoppingCart = () => {
  /**USO EL CONTEXTO DE SHOPCONTEXT */
  const context = useContext(ShopContext);
  const [codigoPostal, setCodigoPostal] = useState(null)
  const [sendMethodName, setSendMethodName] = useState(null)
  const [sendMethodCost, setSendMethodCost] = useState(null)
  const [courrierOptionsList, setCourrierOptionsList] = useState([])
  const [courrierViewList, setCourrierViewList] = useState(null)
  const [cityName, setCityName] = useState("")

  async function calcularEnvio() {
    /*
    CORREO ARGENTINO - ENCOMIENDA CLASICA
    
        Características: 
    Tiempo de entrega (según origen y destino): 3 a 6 días.
    Peso máximo (en kilogramos): 25.
    Entrega: en domicilio.
    Trazabilidad: Sistema de seguimiento Track & Trace.
    Medidas Máximas: 250 sumados, el mayor largo, el mayor ancho y el mayor alto (ninguno debe ser superior a 150).
    
    ¿Cómo se calcula el precio?
    
    Para determinar el rango tarifario se debe tener en cuanta el Rango de Peso (según el peso real y el peso volumétrico del paquete) 
    para ello, se debe aplicar el concepto de volumetría. Se define como peso Volumétrico a la referencia que se utiliza para calcular 
    el rango de peso de los envíos cuando el paquete ocupa mucho lugar, a pesar de ser liviano. Para establecer el Rango de Peso de las 
    encomiendas y paquetes se debe comparar el Peso volumétrico y el Peso real y tomar el mayor de los dos para determinar el Rango 
    Tarifario al que pertenece el paquete. 
    
    FUENTE: https://www.correoargentino.com.ar/servicios/paqueteria/encomienda-correo-clasica
    */
    /* 
    Tipos de promesa de entrega
    Para conocer los diferentes tipos de promesa de entrega deberás hacer el siguiente GET:
    curl -X GET -H 'Authorization: Bearer $ACCESS_TOKEN' https://api.mercadolibre.com/shipments/shipment_id/lead_time 
    FUENTE: https://developers.mercadolibre.com.ar/es_ar/costos-de-envio-y-handling-time
    */

    if (codigoPostal >= 1000 && codigoPostal <= 9999) {
      console.log(codigoPostal)
      console.log(volumenTotal(context.cart))
      console.log(pesoTotal(context.cart))
      await fetch(`https://api.mercadolibre.com/sites/MLA/shipping_options?zip_code_from=${codigoPostal}&zip_code_to=${codigoPostal}&dimensions=${volumenTotal(context.cart)},${pesoTotal(context.cart)}`, {
        headers: {
          "Content-type": "application/json",
        }
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.error) {
            setCodigoPostal("")
            let options = data
            setCityName(data.destination.state.name)
            setCourrierOptionsList(data.options)
            /*           setCourrierViewList(courrierOptions()) */
            /*  let option = options.options.find(option => option.shipping_method_id === 503045)
              sendMethodNameTopLevel = option.name
              setSendMethodName(option.name)
              sendMethodCostTopLevel = option.cost
              setSendMethodCost(option.cost)
              console.log(option.name)
              console.log(option.cost)*/
          } else {
            setCourrierViewList([])
            setCityName("")
            setSendMethodCost("No definido.")
            setSendMethodName("No se pudo calcular el envio.")
            M.toast({
              html: data.error, classes: "#c62828 red darken-3"
            })
          }
        })
        .catch((err => {
          setSendMethodName("No se pudo calcular el envio.")
          setSendMethodCost("No definido.")
          console.log(err)
        }))
    } else {
      setCourrierViewList([])
      setCityName("")
      setSendMethodCost("No definido.")
      setSendMethodName("No se pudo calcular el envio.")
      M.toast({

        html: "codigo postal invalido", classes: "#c62828 red darken-3"
      })
    }
  };

  function precioTotalConEnvio() {
    if (sendMethodCost !== "No definido.") {
      sendMethodNameTopLevel = sendMethodName
      sendMethodCostTopLevel = sendMethodCost
      return sendMethodCost ? "$ " + (precioTotal(context.cart) + sendMethodCost) : ""
    } else {
      return sendMethodCost
    }
  }

  useEffect(() => {
    setCourrierViewList(courrierOptions())
  }, [courrierOptionsList]);

  /*   useEffect(() => {
      calcularEnvio()
    }, [codigoPostal]); */

  const courrierOptions = () => {

    const courrierItemList = () => {
      const list = courrierOptionsList.map((courrier) => {
        console.log(courrier.cost)
        return (
          <p>
            <CourrierCard name={courrier.name} cost={courrier.cost} fx={setSendMethodName} fx2={setSendMethodCost} />
          </p>
        )
      })
      return (
        <form action="#" id="currieroption">
          {console.log(list)}
          {list}
          {/*           <p id="currieroption">
            <label>
              <input name="style2" type="radio" id="currieroption" onClick={() => { setSendMethodName("Se agrega a envío en curso"); setSendMethodCost(0.01) }} />
              <span>Tengo una compra previa pendiente de envío</span>
            </label>
          </p> */}
        </form>
      )
    }
    return (
      courrierItemList()
    )
  }

  return (
    /**
     * 1) AL MAINNAVIGATION LE PASO COMO PROPS EL CART DEL CONTEXTO, LE HAGO UN REDUCE PARA OBTENER LA CANTIDAD DE 
     *    ELEMENTOS EN EL CARRITO
     */
    <React.Fragment>
      <div className="containerCart">
        {context.cart.length <= 0 ?
          <div id="noHayElementos" className="numero">
            ¡No hay productos en el carrito!
          </div>
          :
          <main className="cart">
            <div className="row">
              <div className="col s12">
                <table>
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Imagen</th>
                      <th>Precio Unitario</th>
                      <th>Cantidad</th>
                      <th>Precio Total</th>
                      <th>Quitar</th>
                    </tr>
                  </thead>
                  {context.cart.map(cartItem => (
                    <tbody>
                      <td id="tdCart">{cartItem.itemName}</td>
                      <td id="bigCart"><img id="imgCart" alt={cartItem.itemName} src={cartItem.images[0]} /></td>
                      <td id="tdCart">$ {cartItem.itemPrice}</td>
                      <td id="tdCart">
                        <div className="input-field col s12">
                          <button onClick={context.removeProductFromCart.bind(this, cartItem.id)} className="btn purple lighten-2"><i className="material-icons">remove</i></button>
                          <input id="inptCartCant" className="validate" value={cartItem.quantity} />
                          <button onClick={context.addProductToCart.bind(this, cartItem)} className="btn purple lighten-2"><i className="material-icons">add</i></button>
                        </div>
                      </td>
                      <td id="tdCart">$ {cartItem.itemPrice * cartItem.quantity}</td>
                      <td id="tdCart">
                        <button onClick={context.deleteProductFromCart.bind(this, cartItem.id)} className="btn purple lighten-2">
                          <i class="material-icons">delete</i>
                        </button>
                      </td>
                    </tbody>
                  ))}
                </table>
              </div>
              <div className="row">
                <div className="col s6 leftField">
                  <input id="inptCartCant" placeholder="Código Postal" value={codigoPostal} onChange={(e) => setCodigoPostal(e.target.value)} />
                  <button className="waves-effect waves-light btn" onClick={calcularEnvio} style={{ marginLeft: 20 }}>Calcular envío</button>
                </div>
                <div className="col s6 rightField">
                  <h4>
                    <strong>
                      subtotal: $ {precioTotal(context.cart)}
                    </strong>
                  </h4>
                </div>
              </div>
              {codigoPostal === null ?
                <div className="row">
                  <div className="col s12">
                    <h4>
                      <strong>
                        Ingese su código postal para conocer las opciones de envío
                      </strong>
                    </h4>
                  </div>
                </div>
                :
                <div>
                  {courrierViewList !== null ?
                    <div className="row center">
                      <div className="col s2 center">
                      </div>
                      <div className="col s8 center">
                        <div className="cityIcons">
                          <span>
                            <i className="small material-icons deliveryIcon">local_shipping</i>
                          </span>
                          <span>
                            <i className="small material-icons deliveryIcon send">send</i>
                          </span>
                          <span className="delivery">
                            {cityName}
                          </span>
                        </div>
                        <div>{courrierViewList}</div>
                      </div>
                      <div className="col s2 center">
                      </div>
                    </div>
                    : <div></div>
                  }
                  {sendMethodCost === null ?
                    <div></div>
                    :
                    <div className="row center">
                      <div className="col s12 center">
                        <h3>
                          <strong>
                            Precio total: {precioTotalConEnvio()}
                          </strong>
                        </h3>
                      </div>
                    </div>
                  }
                  {sendMethodCost === null ?
                    <div></div>
                    :
                    <div className="row center">
                      <div className="col s12 center">
                        {sendMethodCost === "No definido." ?
                          <button disabled={true} className="waves-effect waves-light btn">
                            Revisar envio
                          </button>
                          :
                          <Link to={localStorage.getItem('user') === "admin" || localStorage.getItem('user') === "usuario" ? "/testform" : "/login"}>
                            <button className="waves-effect waves-light btn">
                              Comprar
                            </button>
                          </Link>
                        }
                      </div>
                    </div>
                  }
                </div>
              }
            </div>
          </main>
        }
      </div>
    </React.Fragment>
  );
};

export default ShoppingCart;