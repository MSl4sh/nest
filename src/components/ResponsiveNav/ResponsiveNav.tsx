import { useState, useContext, ReactElement } from "react"
import AuthContext from "../../contexts/AuthContext";
import { UserInterface } from "../../shared/interfaces/userInterfaces";
import { NavLink } from "react-router-dom";
import { Bungalow, CloseMenu, Destination, AboutIcon} from "../../shared/components/iconSvg";

interface FormLoginProps {

    visible: boolean;
    onClose: Function;
}

const FormLogin = ({ visible, onClose }: FormLoginProps): ReactElement => {


    return (visible ?

        <div className='flex flex-col absolute h-screen z-10 top-0 bg-white w-screen p-8 rounded-xl border-2 border-midGreen gap-4'>
            <div onClick={() => onClose(false)} className="self-end">
                <CloseMenu  />
            </div>
            <div className="flex flex-col gap-4">
                <li className="text-midGreen text-xl font-light flex items-center gap-2"><Bungalow/><NavLink to="/" onClick={() => onClose(false)}>Accueil</NavLink></li>
                <li className="text-midGreen text-xl font-light flex items-center gap-2"><Destination/><NavLink to="/destinations" onClick={() => onClose(false)}>Destinations</NavLink></li>
                <li className="text-midGreen text-xl font-light flex items-center gap-2"><AboutIcon/><NavLink to="/a-propos" onClick={() => onClose(false)}>À propos</NavLink></li>
            </div>
        </div> :
        <></>
    )
}

export default FormLogin