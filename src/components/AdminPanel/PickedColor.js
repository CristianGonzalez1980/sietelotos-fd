import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import ColorSelector from 'react-color-selector';
import AdminOptions from '../AdminOptions';
import { postearUpdateEntity, postearGetEntity } from "../AdminPanel/FetchFunctions";
import '../../styles/PickedColor.css'

const PickedColor = () => {

    const [settings, setSettings] = useState(null)
    const [prevColor, setPrevColor] = useState(null)
    const [prevColorFooter, setPrevColorFooter] = useState(null)
    const [prevColorSide, setPrevColorSide] = useState(null)
    const [prevColorWrapp, setPrevColorWrapp] = useState(null)
    const history = useHistory()

    let [myColor, pickedColor] = useState('');
    let [myColorFooter, pickedColorFooter] = useState('');
    let [myColorSide, pickedColorSide] = useState('');
    let [myColorWrapp, pickedColorWrapp] = useState('');
    let picker_data = {
        col: 12,
        row: 12,
        width: 280,
        height: 280,
        view: 'palette',
        theme: 'light',
        title: 'COLOR',
        cellControl: 4
    }

    const setBdSettings = (data) => {
        setSettings(data[0])
        setPrevColor(data[0].backgroundColor)
        setPrevColorFooter(data[0].backgroundColorFooter)
        setPrevColorSide(data[0].backgroundColorSide)
        setPrevColorWrapp(data[0].backgroundColorWrapp)
    }

    useEffect(() => {
        postearGetEntity({
            entityClass: "settings", fx: setBdSettings
        });
    }, [])

    const navBarSetUp = () => {
        console.log(settings); console.log(settings.id); console.log(myColor)
        postearUpdateEntity({
            historyProp: history, entityClass: "settings", entity: settings, atributes: {
                "backgroundColor": myColor,
                "backgroundColorFooter": prevColorFooter,
                "backgroundColorSide": prevColorSide,
                "backgroundColorWrapp": prevColorWrapp
            }
        })
    };

    const footerSetUp = () => {
        console.log(settings); console.log(settings.id); console.log(myColorFooter)
        postearUpdateEntity({
            historyProp: history, entityClass: "settings", entity: settings, atributes: {
                "backgroundColor": prevColor,
                "backgroundColorFooter": myColorFooter,
                "backgroundColorSide": prevColorSide,
                "backgroundColorWrapp": prevColorWrapp
            }
        })
    };

    const sideSetUp = () => {
        console.log(settings); console.log(settings.id); console.log(myColorSide)
        postearUpdateEntity({
            historyProp: history, entityClass: "settings", entity: settings, atributes: {
                "backgroundColor": prevColor,
                "backgroundColorFooter": prevColorFooter,
                "backgroundColorSide": myColorSide,
                "backgroundColorWrapp": prevColorWrapp
            }
        })
    };

    const wrappSetUp = () => {
        console.log(settings); console.log(settings.id); console.log(myColorWrapp)
        postearUpdateEntity({
            historyProp: history, entityClass: "settings", entity: settings, atributes: {
                "backgroundColor": prevColor,
                "backgroundColorFooter": prevColorFooter,
                "backgroundColorSide": prevColorSide,
                "backgroundColorWrapp": myColorWrapp
            }
        })
    };

    return (
        <div className='col'>
            <div className="row">
                <AdminOptions />
                <div className='col s4 left'>
                    <p>Color Actual NAVBAR: {prevColor} </p>
                    <ColorSelector pallet={picker_data} selectedColor={pickedColor} />
                    <button onClick={(e) => {
                        console.log(myColor)
                        if (myColor !== '' && myColor !== prevColor) {
                            navBarSetUp();
                        }
                    }} className="waves-effect waves-light red lighten-2 btn-large colorPicker" id="butonSubmitColorPicker">Cambiar Color</button>
                </div>
                <div className='col s4 left'>
                    <p>Color Actual FOOTER: {prevColorFooter} </p>
                    <ColorSelector pallet={picker_data} selectedColor={pickedColorFooter} />
                    <button onClick={(e) => {
                        console.log(myColorFooter)
                        if (myColorFooter !== '' && myColorFooter !== prevColorFooter) {
                            footerSetUp();
                        }
                    }} className="waves-effect waves-light red lighten-2 btn-large colorPicker" id="butonSubmitColorPicker">Cambiar Color</button>
                </div>
                <div className='col s4 left'>
                    <p>Color Actual SIDEBAR: {prevColorSide} </p>
                    <ColorSelector pallet={picker_data} selectedColor={pickedColorSide} />
                    <button onClick={(e) => {
                        console.log(myColorSide)
                        if (myColorSide !== '' && myColorSide !== prevColorSide) {
                            sideSetUp();
                        }
                    }} className="waves-effect waves-light red lighten-2 btn-large colorPicker" id="butonSubmitColorPicker">Cambiar Color</button>
                </div>
                <div className='col s4 left'>
                    <p>Color Actual WRAPP: {prevColorWrapp} </p>
                    <ColorSelector pallet={picker_data} selectedColor={pickedColorWrapp} />
                    <button onClick={(e) => {
                        console.log(myColorWrapp)
                        if (myColorWrapp !== '' && myColorWrapp !== prevColorWrapp) {
                            wrappSetUp();
                        }
                    }} className="waves-effect waves-light red lighten-2 btn-large colorPicker" id="butonSubmitColorPicker">Cambiar Color</button>
                </div>
            </div>
        </div>
    )
}
export default PickedColor;