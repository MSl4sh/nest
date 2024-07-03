import { useState, useContext, ReactElement } from "react"
import AuthContext from "../../contexts/AuthContext";
import { UserInterface } from "../../shared/interfaces/userInterfaces";
import { useNavigate } from "react-router-dom";



const FormLogin = (): ReactElement => {
    const { user, setUser } = useContext(AuthContext);
    const [connexionError, setConnexionError] = useState<string>("");
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        email: "",
        password: "",
    })

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const validateRequiredField = (fieldValue: string) => {
        if (!fieldValue) {
            return `Ce champ est obligatoire.`;
        }
        return "";
    }

    const validateEmail = (fieldValue: string) => {
        if (fieldValue && !/^([\w-\.]+@([\w-]+\.)+[\w-]{2,})?$/.test(fieldValue)) {
            return `Le format de votre email n'est pas correct`;
        }
        return "";
    }

    const validateForm = () => {
        const newErrors = {
            email: "",
            password: "",
        };

        newErrors.email = validateRequiredField(formData.email);
        newErrors.password = validateRequiredField(formData.password);
        newErrors.email += validateEmail(formData.email);

        return newErrors
    }

    const submit = async (e: any) => {
        e.preventDefault();
        
        const storedData = localStorage.getItem('myData');
        const newErrors = validateForm();
        if (Object.values(newErrors).some(error => error !== "")) {
            setErrors(newErrors);
            return;
          } 
        else{
            if (storedData) {
                const parsedData = JSON.parse(storedData);
                const user = parsedData.users.filter(
                    (user: UserInterface) =>
                        user.email === formData.email && user.password === formData.password
                );
                if (user.length === 0) {
                    setConnexionError("Votre email ou votre mot de passe n'est pas reconnu");
                } else {
                    setFormData({
                        email: "",
                        password: "",
                    });
                    setConnexionError("");
                    setUser(user[0]);
                    localStorage.setItem('currentUser', JSON.stringify(user[0]));
                    navigate("/")
                }
            } else {
                setConnexionError("Aucun utilisateur trouvé dans le stockage local");
            }
        }
    };

    return (
        
        <form onSubmit={submit} className=' flex flex-col bg-formBackground w-[100%]  p-8 rounded-xl border-2 border-midGreen  max-w-lg gap-4'>
            <div className="flex flex-col gap-1">
                <label htmlFor="email" className='px-2'>E-mail<sup className="text-red-500 font-medium ml-0.5">*</sup></label>
                <input id="email" type="text" name="email" value={formData.email} className='input opacity-100 focus:ring-transparent focus:outline-none px-4' onChange={handleChange} />
                {errors.email && (
                    <div className="text-red-500 text-sm ml-2 mt-1 w-full">{errors.email}</div>
                )}
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="password" className='px-2'>Mot de passe<sup className="text-red-500 font-medium ml-0.5">*</sup></label>
                <input id="password" name="password" value={formData.password} type="password" className='input opacity-100 focus:ring-transparent focus:outline-none px-4' onChange={handleChange} />
                {errors.password && (
                    <div className="text-red-500 text-sm ml-2 mt-1 w-full">{errors.password}</div>
                )}
                {connexionError && (
                    <div className="text-red-500 text-sm ml-2 mt-1 w-full">{connexionError}</div>
                )}
            </div>

            <button type="submit" className='hover:bg-darkGreen cursor-pointer bg-midGreen text-white rounded-lg font-medium py-3 text-center w-full' onClick={submit}>Se connecter</button>
            <button type="button" className='cursor-pointer text-midGreen font-medium underline text-sm' onClick={()=>navigate("/register")} >Pas de Compte ? Inscrivez vous !</button> 
        </form>
        )
}

export default FormLogin