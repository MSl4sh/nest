import { useNavigate } from 'react-router-dom';
import { LoginIcon, RegisterIcon } from '../../shared/components/iconSvg';

interface HeaderDropdownProps {
    visible: boolean;
    setVisible: Function;
    setIsExpanded: Function;
}

const HeaderDropdown = ({ visible, setVisible, setIsExpanded }:HeaderDropdownProps) => {
    const navigate = useNavigate()

    


    return (visible ? <div className=' dropDown z-50 flex flex-col bg-white w-72 absolute top-20 right-0 p-8 rounded-xl border-2 border-midGreen mr-10 gap-4'>
        <button type="button" className='hover:bg-darkGreen cursor-pointer bg-midGreen text-white rounded-lg font-medium py-3 mb-3 text-center w-full flex gap-2 items-center justify-center' onClick={()=>{navigate("/login"); setVisible(false)}}> <LoginIcon/>Se connecter</button>
        <button type="button" className='hover:bg-darkGreen cursor-pointer bg-midGreen text-white rounded-lg font-medium py-3 text-center w-full flex gap-2 items-center justify-center' onClick={()=>{navigate("/register"); setVisible(false)}}><RegisterIcon/> S'inscrire</button>
    </div>:<></>)
}
export default HeaderDropdown