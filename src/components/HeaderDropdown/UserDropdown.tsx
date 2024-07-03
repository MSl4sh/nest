import { useNavigate } from 'react-router-dom';
import { LoginIcon, LogoutIcon, RegisterIcon, UserIcon } from '../../shared/components/iconSvg';

interface HeaderDropdownProps {
    visible: boolean;
    setVisible: Function;
    setIsExpanded: Function;
    setUser: Function;
}

const HeaderDropdown = ({ visible, setVisible, setIsExpanded, setUser }:HeaderDropdownProps) => {
    const navigate = useNavigate()

    const logOut = () => {
        setIsExpanded(false)
        localStorage.removeItem("currentUser")
        setUser(null)
        setVisible(false)
        navigate("/")

    }


    return (visible ? <div className='z-50 flex flex-col bg-white w-72 absolute top-20 right-0 p-8 rounded-xl border-2 border-midGreen mr-10 gap-4'>
        <button type="button" className='hover:bg-darkGreen cursor-pointer bg-midGreen text-white rounded-lg font-medium py-3 mb-3 text-center w-full flex gap-2 items-center justify-center' onClick={()=>{navigate("/compte"); setVisible(false)}}> <UserIcon/>Mon compte</button>
        <button type="button" className='hover:bg-darkGreen cursor-pointer bg-midGreen text-white rounded-lg font-medium py-3 text-center w-full flex gap-2 items-center justify-center' onClick={logOut}><LogoutIcon/> Se déconnecter</button>
    </div>:<></>)
}
export default HeaderDropdown