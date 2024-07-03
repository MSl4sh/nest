import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import logo from "../../assets/logo/logo-nest.svg";
import useMediaWidth from "../utils/useMediaWidth";
import { BurgerMenu, CloseMenu, User } from './iconSvg';
import { UserInterface } from "../interfaces/userInterfaces";
import HeaderDropdown from "../../components/HeaderDropdown/HeaderDropdown";
import UserDropdown from "../../components/HeaderDropdown/UserDropdown";
interface HeaderProps {
    toggleResponsiveNav: boolean;
    setToggleResponsiveNav: Function;
}

export default function Header({toggleResponsiveNav, setToggleResponsiveNav}:HeaderProps){
    const isLargeScreen = useMediaWidth(900);
    const { user, setUser } = useContext(AuthContext);
    const [isLoginFormVisible, setIsLoginFormVisible] = useState<boolean>(false);
    const [isRegistrationFormVisible, setIsRegistrationFormVisible] = useState<boolean>(false);
    const [isFormLogOutVisible, setIsFormLogOutVisible] = useState<boolean>(false);
   
   
    const [isExpanded, setIsExpanded] = useState<boolean>(false)
    const navigate = useNavigate();
    const loggedInIcon = (user:UserInterface) => `${user.first_name[0]}${user.name[0]}`.toUpperCase()

    const handleLoginIconClick = () => {
        if (user) {
            setIsFormLogOutVisible(!isFormLogOutVisible)
        } else {
            setIsLoginFormVisible(!isLoginFormVisible);
        }
        setIsRegistrationFormVisible(false);
    };

    const handleRegistrationIconClick = () => {
        setIsRegistrationFormVisible(!isRegistrationFormVisible);
        setIsLoginFormVisible(false);
    }

    window.onclick = (event:MouseEvent) => {
        if (!(event.target as HTMLElement).closest('.dropDown')) {
            setIsExpanded(false)
            setIsLoginFormVisible(false)
            setIsRegistrationFormVisible(false)
            setIsFormLogOutVisible(false)
            
        }
        
    }

    return (
        <>
            <header className="z-1 h-20 flex flex-row justify-between items-center bg-white px-10 max-[900px]:px-4 border-b-2 border-beige absolu">
                <div className="h-4/5 w-auto cursor-pointer" onClick={()=>navigate("/")}>
                    <img src={logo} alt="logo" style={{ width: "100px" }} className="h-full text-slate-100" />
                </div>
                <div className="flex items-center gap-6">
                    {isLargeScreen ? <>
                        <li className="text-midGreen text-xl font-light"><NavLink className={({ isActive }) => (isActive ? 'active' : 'underline-nav')} to="/">Accueil</NavLink></li>
                        <li className="text-midGreen text-xl font-light"><NavLink className={({ isActive }) => (isActive ? 'active' : 'underline-nav')} to="/destinations">Destinations</NavLink></li>
                        <li className="text-midGreen text-xl font-light"><NavLink className={({ isActive }) => (isActive ? 'active' : 'underline-nav')} to="/a-propos">À propos</NavLink></li>
                    </> : <div onClick={()=>setToggleResponsiveNav(!toggleResponsiveNav)} className='border-midGreen cursor-pointer  text-white border-2 rounded-full w-10 h-10 flex items-center justify-center hover:bg-lightGreen hover:text-white'><BurgerMenu/></div>
                    }
                    <li className="dropDown text-midGreen  rounded-3xl py-0.5 px-1.5 relative" >
                        <button className="flex items-center justify-center" type='button' onClick={handleLoginIconClick}>
                            {user
                                ? <div className='border-midGreen bg-lightGreen text-white border-2 rounded-full w-10 h-10 flex items-center justify-center hover:bg-white hover:text-midGreen'>{loggedInIcon(user)}</div>
                                : <User />
                            }
                        </button>
                    </li>
                </div>
            </header>
            {!user && <HeaderDropdown visible={isLoginFormVisible} setVisible={setIsLoginFormVisible} setIsExpanded={setIsExpanded}/>}
            {user && <UserDropdown visible={isFormLogOutVisible} setVisible={setIsFormLogOutVisible} setIsExpanded={setIsExpanded} setUser={setUser}/>}
            
        </>
    )
}