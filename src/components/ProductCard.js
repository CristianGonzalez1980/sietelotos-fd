import React/*, { useState , useEffect }*/ from 'react'
import { useHistory } from "react-router-dom";
import { Carousel } from 'react-materialize'
import { Link } from 'react-router-dom'
import ShopContext from './context/shop-context';
import '../styles/ProductCard.css'

const ProductCard = (props) => {
  const product = props.product
  const history = useHistory();
  /* 
    const [selectedProduct, setSelectedProduct] = useState('')
   */

  const routeChange = () => {
    let path = `/productDetail/${product.id}`;
    history.push(path);
  }

  const imagesOfProducts = (product) => {
    const images = product.images

    return (
      <Carousel
        carouselId="Carousel-2"
        images={images}
        options={{
          dist: -100,
          duration: 200,
          fullWidth: false,
          indicators: false,
          noWrap: false,
          numVisible: 5,
          onCycleTo: null,
          padding: 0,
          shift: 0
        }}
      />
    )
  }

  return (
    <ShopContext.Consumer>
      {context => (
        <React.Fragment>
          <div className="col s3" id='cardOfProducts'>
            <div className="card" id="cardId">
              <div className="card-image" id="cardImageId" onClick={() => { routeChange() }}>
                {imagesOfProducts(product)}
              </div>
              <div id="cardContent" className="card-content" onClick={() => { routeChange() }}>
                <hr />
                <strong><h5>{product.itemName}</h5></strong>
                <p>Stock: {product.stock}</p>
                <p>Precio: {product.itemPrice}</p>
                <p>Precio promocional: {product.promotionalPrice}</p>
                <a className="btn-floating halfway-fab waves-effect waves-light green"><i className="material-icons">info</i></a>
              </div>
              <div className="card-action" id="cardAction">
                {product.stock === 0 ?
                  <button id="btnDisable" disabled >Sin Stock</button>
                  :
                  <button id="botonAgregarAlCarrito" onClick={context.addProductToCart.bind(this, product)}>Agregar al carrito</button>
                }
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </ShopContext.Consumer>
  )
}

export default ProductCard;