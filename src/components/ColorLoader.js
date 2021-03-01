import { useState, useEffect } from "react";
import { postearGetEntity } from "./AdminPanel/FetchFunctions";

const ColorLoader = (props) => {
  /*   console.log("estoy en ColorLoader")

    const colorType = props.type;
    console.log(`el valor de colorType de props es ${colorType}`)

    const [bkColor, setBkColor] = useState('#b80090')

    const setBackGroundColor = (data) => {
        console.log("estoy en setBackgroundColor")
        console.log(`el valor de colorType es ${colorType}`)
        setBkColor(data[0].colorType)
    }

    useEffect(() => {
        console.log("estoy en useEffect")
        postearGetEntity({ entityClass: "settings", fx: setBackGroundColor })
        console.log(bkColor)
    }, []);
 */
    return (`style={{ backgroundColor: ${bkColor}}}`
    )
};

export default ColorLoader;