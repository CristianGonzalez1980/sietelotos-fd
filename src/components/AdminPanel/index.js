import React from 'react';
import { useState, useContext } from "react";
import '../../client/css/index.css';
import $ from 'jquery'
import { useHistory } from "react-router-dom";
import M from 'materialize-css'
import ShopContext from '../../components/context/shop-context'
import { precioTotal, sendMethodCostTopLevel, sendMethodNameTopLevel } from '../../components/ShoppingCart'

const TestForm = () => {
  const history = useHistory();
  const context = useContext(ShopContext);
  const [quantity, setQuantity] = useState(1);
  const [unitPrice] = useState(10);
  const [amount] = useState(precioTotal(context.cart) + sendMethodCostTopLevel);
  const [description] = useState("Some book");
  // SDK de Mercado Pago
  const mercadopago = require('mercadopago');

  // Agrega credenciales
  mercadopago.configure({
    access_token: 'TEST-106040427445447-022218-b9f7540b8c89b55bc8e9361f11c67c55-58849892'
  });

  function procesarPago() {
    // Crea un objeto de preferencia

    var makingPreference = []
    var itemList
    context.cart.forEach(product => {
      console.log(product.itemName)
      console.log(product.itemPrice)
      console.log(product.quantity)

      //jsonArray1.concat(jsonArray2);
      let jsonArray2 = [JSON.stringify({
        "title": product.itemName,
        "unit_price": product.itemPrice,
        "quantity": product.quantity
      })]
      console.log(jsonArray2);
      makingPreference = makingPreference.concat(jsonArray2);
      console.log(makingPreference);
      itemList = makingPreference;
      console.log(itemList);
    })

    console.log(makingPreference)
    console.log(itemList)
    console.log(itemList[0])
    console.log(itemList[1])
    let preference = {
      "items": [{
        "title": "zaraza",
        "unit_price": 1000,
        "quantity": 2,
      }
      ],
      "shipments": {
        "cost": 1000,
        "mode": "not_specified",
      }/* [
        {
          title: 'Mi producto',
          unit_price: 100,
          quantity: 1,
        }
      ] */
    };
    console.log(preference)
    mercadopago.preferences.create(preference)
      .then(function (response) {
        // Este valor reemplazará el string "<%= global.id %>" en tu HTML
        let globalId = response.body.id;
        let initPoint = response.body.initPoint
        console.log(globalId)
        console.log(initPoint)
        return response.json();
      })
      .then(function(preference) {
          createCheckoutButton(preference.id);
          $(".shopping-cart").fadeOut(500);
          setTimeout(() => {
              $(".container_payment").show(500).fadeIn();
          }, 500);
      }).catch(function (error) {
        alert("Unexpected error");
        $('#checkout-btn').attr("disabled", false);
        console.log(error);
      });
    
    //   postearPago(global.id) VER QUE SE IMPRIME POR CONSOLA
    /*   } else {
       alert("Verify filled data!\n" + JSON.stringify(response, null, 4));
     } */
  };

  function createCheckoutButton(preference) {
    window.location.href = 'http://ejemplo.com'
   /* <a href='https://www.facebook.com/Siete-Lotos-Artesanias-120194046559599'></a>
    https://www.mercadopago.com.ar/checkout/v1/payment/modal/?preference-id=58849892-157fdc1d-15bb-409c-8435-93f21f59331b&from-widget=true
  */}

  // //Handle transitions

  function checkoutShoppingCart() {
    $('.shopping-cart').fadeOut(500);
    setTimeout(() => { $('.container_payment').show(500).fadeIn(); }, 500);
  }

  function goBackContainerPayment() {
    $('.container_payment').fadeOut(500);
    setTimeout(() => { $('.shopping-cart').show(500).fadeIn(); }, 500);
  }
  /*
  const postearPago = (tokenString) => {
    if (*//* email &&  *//*unitPrice && description && amount && quantity) {
fetch("https://sietelotos.herokuapp.com/process_payment", {
method: "POST",
headers: {
"Content-type": "application/json",
"Authorization": localStorage.getItem("tokenValido")
},
body: JSON.stringify({
"unitPrice": unitPrice,
*/ /* "email": email, *//*
   "description": description,
   "amount": precioTotal(context.cart) + sendMethodCostTopLevel,
   "quantity": quantity,
   })
   })
   .then((res) => {
   console.log(res)
   if (res.ok) {
   return res.json()
   }
   else {
   M.toast({ html: "Error inesperado", classes: "#c62828 red darken-3" });
   window.Mercadopago.clearSession()
   }
   })
   .then((data) => {
   if (data && (data.status_detail === "accredited" || data.status_detail === "pending_contingency" || data.status_detail === "pending_review_manual")) {
   console.log(data.comunicacion_sugerida)
   console.log("realizandoPAGO")
   M.toast({ html: data.comunicacion_sugerida, classes: "#388e3c green darken-2" });
   actualizarBaseDeDatos()
   vacioCarrito()
   }
   else {
   M.toast({ html: data.comunicacion_sugerida, classes: "#c62828 red darken-3" });
   }
   history.push("/");
   window.Mercadopago.clearSession()
   })
   .catch((err) => {
   console.log(err);
   window.Mercadopago.clearSession()
   });
   } else {
   M.toast({ html: "Llenar todos los campos", classes: "#c62828 red darken-3" });
   }
   };
   
   const actualizarBaseDeDatos = () => {
   fetch("https://sietelotos.herokuapp.com/productSales", {
   method: "PUT",
   headers: {
   "Content-type": "application/json",
   "Authorization": localStorage.getItem("tokenValido")
   },
   body: JSON.stringify({
   "sales": listaProductosEnPares()
   })
   })
   .then((res) => {
   console.log(res)
   })
   .catch((error) => {
   console.log(error);
   })
   };
   */
  const listaProductosEnPares = () => {
    let arrayResultado = []
    context.cart.forEach(
      product => {
        console.log("Pase por (" + product.id + ", " + product.quantity + ")")
        arrayResultado.push({ "idProducto": product.id, "cantidadVendida": product.quantity })
      }
    )
    console.log(arrayResultado)
    return arrayResultado
  }
  /*
  const vacioCarrito = () => {
    context.cart.forEach(
      product => {
        context.deleteProductFromCart(product.id)
      }
    )
  }
  */
  return (
    <div>
      {checkoutShoppingCart()}
      <section class="payment-form dark">
        <div class="container_payment">
          <div class="block-heading">
            <h2>Pago con tarjeta</h2>
          </div>
          <div class="form-payment">
            <div class="products">
              <h2 class="title">Resumen</h2>
              <div class="item">
                <span class="price" id="summary-price" value={'$ ' + unitPrice}></span>
                {context.cart.map(product => {
                  return (
                    <div className="row">
                      <div className="col s6">
                        <p class="item-name">{product.itemName} <span id="summary-quantity" value={quantity}>x {product.quantity}</span></p>
                      </div>
                      <div className="col s6">
                        <p class="item-name item-total-price">$ {product.itemPrice * product.quantity}</p>
                      </div>
                    </div>
                  )
                })}
                <div className="row">
                  <div className="col s6">
                    <p class="item-name">{sendMethodNameTopLevel} <span id="summary-quantity"></span></p>
                  </div>
                  <div className="col s6">
                    <p class="item-name item-total-price">$ {sendMethodCostTopLevel}</p>
                  </div>
                </div>
              </div>
              <div class="total">Total<span class="price" id="summary-total" >$ {precioTotal(context.cart) + sendMethodCostTopLevel}</span></div>
            </div>
            <div class="payment-details">
              <div className="row">
                <div className="col s12">
                  <a onClick={procesarPago}  className="waves-effect waves-light red lighten-2 btn-large" id="butonSubmit">Pagar</a>
                </div>
              </div>
              <br />

              <a id="go-back" href="/shoppingcart">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 10 10" class="chevron-left">
                  <path fill="#009EE3" fill-rule="nonzero" id="chevron_left" d="M7.05 1.4L6.2.552 1.756 4.997l4.449 4.448.849-.848-3.6-3.6z"></path>
                </svg>
                         Volver al carrito
                       </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default TestForm;