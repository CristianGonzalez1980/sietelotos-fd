import React from "react";
import { useEffect, useState } from "react";
import M from 'materialize-css'
import ProveedorConProductos from '../ProveedorConProductos'
import "../../styles/Suppliers.css"
import { postearGetEntity } from "../AdminPanel/FetchFunctions";

document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.slider');
  M.Slider.init(elems, {});
});

const Suppliers = () => {
  const [companies, setCompanies] = useState(null)

  useEffect(() => {
    if (!companies) {
      postearGetEntity({ entityClass: "companies", fx: setCompanies });
    }
  }, [companies])

  const getSProveedores = () => {
    {
      const listOfCompanies = companies.map((company) => {
        return (
          <li key={company.id} id="listaDeProductos">
            <ProveedorConProductos company={company} />
          </li>
        )
      })
      return (
        <ul id="listaDeProductosul">
          {listOfCompanies}
        </ul>
      )
    }
  }

  return (
    <div>
      {
        !companies || companies.length === 0 ?
          <div>
            <div className="preloader-wrapper big active">
              <div className="spinner-layer spinner-blue">
                <div className="circle-clipper left">
                  <div className="circle"></div>
                </div>
                <div className="gap-patch">
                  <div className="circle"></div>
                </div>
                <div className="circle-clipper right">
                  <div className="circle"></div>
                </div>
              </div>
            </div>
          </div>
          :
          getSProveedores()
      }
    </div>
  );
};

export default Suppliers;
