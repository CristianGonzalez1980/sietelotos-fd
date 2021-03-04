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
                    <li key={elem}>
                        <div className="col s3" id='colImageCard' style={{ margin: 2 }}>
                            <div className="card" id='cardDeleteUP' style={{ margin: 7 }}>
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
                            <div className="col s6" id='colImageCard'>
                                <div className="card" id='cardViewProveedor_Product_Detail'>
                                    <div className="card-image" style={{ padding: 10 }}>
                                        <img alt="productImage" src={selectedImage} />
                                        {listOfImages()}
                                    </div>
                                </div>
                            </div>
                            <div className="col s6"/*  id='colImageCard' */>
                                <div className="card-content" style={{ marginBottom: 50 }}>
                                    <strong><h3 className="detailTitle"> {product.itemName}</h3></strong>
                                    <hr className="lineaProducto" />
                                    <h5 className="detailDesc"> {product.description} </h5>
                                    <p className="detailPropertiesDesc"> Longitud en cm: {product.longitud} </p>
                                    <p className="detailPropertiesDesc"> Ancho en cm: {product.ancho} </p>
                                    <p className="detailPropertiesDesc"> Alto en cm : {product.alto} </p>
                                    <p className="detailPropertiesDesc"> Peso en gr: {product.peso} </p>
                                    <p className="detailPropertiesDesc"> Stock unidades: {product.stock} </p>
                                    <p className="detailPropertiesDesc"> Precio $: {product.itemPrice} </p>
                                    <p className="detailPropertiesDesc"> Precio Promocional $: {product.promotionalPrice} </p>
                                </div>
                                <div className="card-action-detail" id="cardAction">
                                    {product.stock === 0 ?
                                        <button id="btnDisable" disabled >Sin Stock</button>
                                        :
                                        <button id="botonAgregarAlCarrito" style={{ height: 50 }} onClick={context.addProductToCart.bind(this, product)}>Agregar al carrito</button>
                                    }
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                )}
            </ShopContext.Consumer>
    )
};

export default ProdcutDetail;