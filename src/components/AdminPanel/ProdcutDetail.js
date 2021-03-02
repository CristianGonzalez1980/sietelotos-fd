import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import ShopContext from '../context/shop-context'
import { postearGetEntity } from "./FetchFunctions";
import '../../styles/ProductDetail.css'

const ProdcutDetail = () => {
    const { value } = useParams();
    console.log(value)
    const [productId] = useState(value)
    const [product, setProduct] = useState(null)
    const [url, setUrl] = useState(null)
    const [selectedImage, setSelectedImage] = useState(null)

    useEffect(() => {
        postearGetEntity({ entityClass: `products/${productId}`, fx: setProductInfo });
        console.log(product)
    }, [])

    const setProductInfo = (data) => {
        setProduct(data);
        setUrl(data.images);
        setSelectedImage(data.images[0]);
    }

    const listOfImages = () => {
        if (url) {
            const list = url.map((elem) => {
                return (
                    <li>
                        <div className="col s2" id='colCard' style={{ margin: 1 }}>
                            <div className="card" id='cardDeleteUP' style={{ margin: 9 }}>
                                <div className="card-image" id="imageUP" >
                                    <img alt="productImage" src={elem} onClick={() => { setSelectedImage(elem) }} />
                                </div>
                            </div>
                        </div>
                    </li>
                )
            })
            return (
                <ul>
                    <div className='row'>
                        {list}
                    </div>
                </ul>
            )
        }
    }

    return (
        !product ? <div></div> :
            <ShopContext.Consumer>
                {context => (
                    <React.Fragment>
                        <div className="row" style={{ paddingTop: 30 }}>
                            <div className="col s1" />
                            <div className="col s4" id='colCard'>
                                <div className="card" id='cardViewProveedor_Product'>
                                    <div className="card-image" style={{ padding: 10 }}>
                                        <img alt="productImage" src={selectedImage} />
                                        {listOfImages()}
                                    </div>
                                </div>
                            </div>
                            <div className="col s6"/*  id='colCard' */>
                                <div className="card-content" style={{ marginBottom: 50 }}>
                                    <strong><h3> {product.itemName}</h3></strong>
                                    <hr className="lineaProducto"/>
                                    <h5 > {product.description} </h5>
                                    <p > Longitud en cm: {product.longitud} </p>
                                    <p > Ancho en cm: {product.ancho} </p>
                                    <p > Alto en cm : {product.alto} </p>
                                    <p > Peso en gr: {product.peso} </p>
                                    <p > Stock unidades: {product.stock} </p>
                                    <p > Precio $: {product.itemPrice} </p>
                                    <p > Precio Promocional $: {product.promotionalPrice} </p>
                                </div>
                                <div className="card-action" id="cardAction">
                                    {product.stock === 0 ?
                                        <button id="btnDisable" disabled >Sin Stock</button>
                                        :
                                        <button id="botonAgregarAlCarrito" style={{ height: 50  }} onClick={context.addProductToCart.bind(this, product)}>Agregar al carrito</button>
                                    }
                                </div>
                            </div>
                            <div className="col s1" />
                        </div>
                    </React.Fragment>
                )}
            </ShopContext.Consumer>
    )
};

export default ProdcutDetail;