import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import ColorSelector from 'react-color-selector';
import AdminOptions from '../AdminOptions';
import { postearUpdateEntity, postearGetEntity } from "../AdminPanel/FetchFunctions";
import '../../styles/PickedColor.css'

const PickedColor = () => {

    const [settings, setSettings] = useState(null)
    const history = useHistory()
    let [myColor, pickedColor] = useState('');
    let [myColorFooter, pickedColorFooter] = useState('');
    let [myColorSide, pickedColorSide] = useState('');
    let [myColorWrapp, pickedColorWrapp] = useState('');
    let [myColorCardLogin, pickedColorCardLogin] = useState('');


    const coustomPickerData = (denom) => {
        return ({
            col: 12,
            row: 12,
            width: 280,
            height: 280,
            view: 'palette',
            theme: 'light-theme',
            title: denom,
            cellControl: 4
        })
    }

    const setBdSettings = (data) => {
        setSettings(data[0])
        pickedColor(data[0].backgroundColor)
        pickedColorFooter(data[0].backgroundColorFooter)
        pickedColorSide(data[0].backgroundColorSide)
        pickedColorWrapp(data[0].backgroundColorWrapp)
        pickedColorCardLogin(data[0].backgroundColorCardLogin)
    }

    /*background-color: rgb(235, 214, 255);
width: 5px;
display: inline-block;
width: 1.5rem;
height: 1.5rem;
    */

    const selectedColorButton = (color) => {
        return (
            <div className="circleContent" style={{ width: 310, display: 'inline-block' }}>
                <span style={{ fontFamily: 'Helvetica', marginLeft: 8 }}>Color Actual: {color} </span>
                <span className="circle" style={{ backgroundColor: color, height: 27, width: 27, display: 'inline-block' }} ></span>
            </div>)
    };


    useEffect(() => {
        postearGetEntity({
            entityClass: "settings", fx: setBdSettings
        });
    }, [])

    const colorSetUp = () => {
        if (settings.backgroundColor !== myColor ||
            settings.backgroundColorFooter !== myColorFooter ||
            settings.backgroundColorSide !== myColorSide ||
            settings.backgroundColorWrapp !== myColorWrapp ||
            settings.backgroundColorCardLogin !== myColorCardLogin) {
            postearUpdateEntity({
                historyProp: history, entityClass: "settings", entity: settings, atributes: {
                    "backgroundColor": myColor,
                    "backgroundColorFooter": myColorFooter,
                    "backgroundColorSide": myColorSide,
                    "backgroundColorWrapp": myColorWrapp,
                    "backgroundColorCardLogin": myColorCardLogin
                }
            });
        }
    };

    return (
        <div className="row">
            <div className='col s12 left'>
                <AdminOptions />
                <div className='col s8 left'>
                    <div className="row">
                        <div className='col s6 left' style={{ marginTop: 10 }} >
                            {settings !== null ?
                                selectedColorButton(settings.backgroundColor)
                                : <div></div>}
                            <ColorSelector pallet={coustomPickerData("NAVBAR"/*  -Actual:${myColor} */)} selectedColor={pickedColor} />
                            {/*                 <button onClick={(e) => {
                            colorSetUp();
                        }} className="waves-effect waves-light red lighten-2 btn-large colorPicker" id="butonSubmitColorPicker">Cambiar Color</button>
        */}            </div>
                        <div className='col s6 left' style={{ marginTop: 10 }} >
                            {settings !== null ?
                                selectedColorButton(settings.backgroundColorFooter)
                                : <div></div>}
                            <ColorSelector pallet={coustomPickerData("FOOTER"/*  -Actual:${myColorFooter}` */)} selectedColor={pickedColorFooter} />
                            {/*                 <button onClick={(e) => {
                            colorSetUp();
                        }} className="waves-effect waves-light red lighten-2 btn-large colorPicker" id="butonSubmitColorPicker">Cambiar Color</button>
    */}                </div>
                    </div>
                    <div className="row">
                        <div className='col s6 left'>
                            {settings !== null ?
                                selectedColorButton(settings.backgroundColorSide)
                                : <div></div>}
                            <ColorSelector pallet={coustomPickerData("SIDEBAR"/*  -Actual:${myColorSide}` */)} selectedColor={pickedColorSide} />
                            {/*                     <button onClick={(e) => {
                            colorSetUp();
                        }} className="waves-effect waves-light red lighten-2 btn-large colorPicker" id="butonSubmitColorPicker">Cambiar Color</button>
    */}                </div>
                        <div className='col s6 left'>
                            {settings !== null ?
                                selectedColorButton(settings.backgroundColorWrapp)
                                : <div></div>}
                            <ColorSelector pallet={coustomPickerData("WRAPPER"/*  -Actual:${myColorWrapp}` */)} selectedColor={pickedColorWrapp} />
                            {/*                     <button onClick={(e) => {
                            colorSetUp();
                        }} className="waves-effect waves-light red lighten-2 btn-large colorPicker" id="butonSubmitColorPicker">Cambiar Color</button>
    */}                </div>
                    </div>
                    <div className="row">
                        <div className='col s6 left'>
                            {settings !== null ?
                                selectedColorButton(settings.backgroundColorCardLogin)
                                : <div></div>}
                            <ColorSelector pallet={coustomPickerData("LOGIN:"/*  -Actual:${myColorWrapp}` */)} selectedColor={pickedColorCardLogin} />
                            {/*                     <button onClick={(e) => {
                            colorSetUp();
                        }} className="waves-effect waves-light red lighten-2 btn-large colorPicker" id="butonSubmitColorPicker">Cambiar Color</button>
    */}                </div>
                    </div>
                    <div className="row">
                        <div className='col s4' /* style={{ marginTop: 10 }} */ />
                        <div className='col s8 right' /* style={{ marginTop: 10 }} */ >
                            <button onClick={(e) => {
                                colorSetUp();
                            }} className="waves-effect waves-light red lighten-2 btn-large colorPicker" id="butonSubmitColorPicker">Cambiar Colores</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
export default PickedColor;