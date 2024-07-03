import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import AuthContext from "../contexts/AuthContext";
import UserInfo from "../components/UserInfo/UserInfo";
import AccountSection from "../components/AccountSection/AccountSection";

const User = () => {
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate()

    useEffect(() => {
            if(!user){
                navigate('/')
            }
    })
    
    return (user && 
    <div className="bg-cover bg-top bg-backgroundColor flex justify-center items-start">
        <div className=" w-9/12 max-[800px]:w-full p-4 gap-6 pt-24">
            <UserInfo />
            <AccountSection />
        </div>
    </div>
    )
}

export default User 