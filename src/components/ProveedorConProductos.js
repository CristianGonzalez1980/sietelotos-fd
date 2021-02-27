import React from "react";
import { useState } from "react";
import '../styles/ProveedorConProductos.css'
import M from 'materialize-css'
import ProductCard from "./ProductCard";

document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.slider');
  M.Slider.init(elems, {});
});

const ProveedorConProductos = (props) => {
  const company = props.company
  const [page, setPage] = useState(0)


  const listOfProducts = () => {
    const products = company.products
    if (products.length > 0) {
      const res = []
      for (let index = (page * 4); index < ((page + 1) * 4); index++) {
        const element = products[index];
        if (products[index] !== undefined) {
          res.push(element)
        }
      }

      const result = res.map((product) => {
        return (
          <ProductCard key={product.id} product={product} />
        )
      })

      const numerosDePaginacion = () => {
        const paginas = (products.length / 4)
        let list = []
        for (let index = 0; index < paginas; index++) {
          list.push(
            <li className={page === index ? "active" : "waves-effect"}>
              <a onClick={() => { setPage(index) }}>{index + 1}</a>
            </li>
          )
        }
        return list
      }

      const Paginacion = () => {
        return (
          <ul id="mypaginacion" className="pagination">
            <li className="waves-effect">
              <a onClick={() => { if (page > 0) { setPage(page - 1) } }}><i className="material-icons">chevron_left</i></a>
            </li>
            {numerosDePaginacion()}
            <li className="waves-effect">
              <a onClick={() => { if ((page + 1) <= (products.length / 4) && (products.length % 4) > 0) { setPage(page + 1) } }}><i className="material-icons">chevron_right</i></a>
            </li>
          </ul>)
      };

      return (
        <div>
          <div className="row">
            {result}
          </div>
          {Paginacion()}
        </div>
      )
    } else {
      return (
        <div id="noHayElementos" className="numero">
          <h3> Por el momento la empresa: <strong>{company.companyName}</strong> no tiene productos para mostrar </h3>
        </div>
      )
    }
  }

  let styles = {
    backgroundImage: `url(${company.companyBanner})`,
    backgroundSize: '100%',
    minHeight: " 14.9rem",
    backgroundRepeat: "no-repeat"
  }

  return (
    <div>
      {
        !company ?
          <p>Loading...</p>
          :
          <div>
            <div id="divEmpresaConProd" style={styles}>
            </div>
            <br />
            {listOfProducts(company)}
            <hr />
          </div>
      }
    </div>
  );
};

export default ProveedorConProductos;
