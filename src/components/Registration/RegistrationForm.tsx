import { useState } from "react"
import { format } from 'date-fns'
import { useNavigate } from "react-router-dom";




const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        surname: "",
        firstName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState({
        surname: "",
        firstName: "",
        email: "",
        password: "",
        confirmPassword: "",
    })
    const navigate = useNavigate();

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

    const validateText = (fieldValue: string) => {
        if (fieldValue && !/^[a-zA-Z]+$/.test(fieldValue)) {
            return `Ce champ ne peut contenir que des lettres.`;
        }
        return "";
    }

    const validateEmail = (fieldValue: string) => {
        if (fieldValue && !/^([\w-\.]+@([\w-]+\.)+[\w-]{2,})?$/.test(fieldValue)) {
            return `Le format de votre email n'est pas correct`;
        }
        return "";
    }

    const validateConfirmPassword = (fieldValue: string) => {
        if (fieldValue !== formData.password) {
            return `Ce champ doit correspondre au champ Mot de passe.`
        }
        return "";
    }

    const validateForm = () => {
        const newErrors = {
            surname: "",
            firstName: "",
            email: "",
            password: "",
            confirmPassword: "",
        };

        newErrors.surname = validateRequiredField(formData.surname);
        newErrors.firstName = validateRequiredField(formData.firstName);
        newErrors.email = validateRequiredField(formData.email);
        newErrors.password = validateRequiredField(formData.password);
        newErrors.confirmPassword = validateRequiredField(formData.confirmPassword);
        newErrors.surname += validateText(formData.surname);
        newErrors.firstName += validateText(formData.firstName);
        newErrors.confirmPassword += validateConfirmPassword(formData.confirmPassword);
        newErrors.email += validateEmail(formData.email);

        return newErrors
    }

    


    const submitFormRegistration = (e: any) => {
        e.preventDefault();

        const newErrors = validateForm();
        if (Object.values(newErrors).filter((value) => value !== "").length > 0) {
            setErrors(newErrors);
        } else {
            const dataBaseForm = {
                first_name: formData.firstName,
                name: formData.surname,
                email: formData.email,
                password: formData.password,
                current_bookings: [],
                past_bookings: [],
                posted_comments: [],
                favourites: [],
                time_stamp: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
            };

            const storedData = localStorage.getItem('myData');
            const dataBase = storedData ? JSON.parse(storedData) : { users: [] };

            dataBase.users.push(dataBaseForm);
            localStorage.setItem('myData', JSON.stringify(dataBase));
            setFormData({
                surname: "",
                firstName: "",
                email: "",
                password: "",
                confirmPassword: "",
            });
            navigate('/login');

           
        }
    };

    return (
        <form className='flex flex-col bg-formBackground w-[100%]  p-8 rounded-xl border-2 border-midGreen max-w-lg gap-4' onSubmit={submitFormRegistration}>
            <div className="flex flex-col gap-1">
                <label htmlFor="surname" className='px-2'>Nom<sup className="text-red-500 font-medium ml-0.5">*</sup></label>
                <input id="surname" name="surname" value={formData.surname} type="text" onChange={handleChange} className="input focus:ring-transparent focus:outline-none w-full" />
                {errors.surname && (
                    <div className="text-red-500 text-sm ml-2 mt-1 w-full">{errors.surname}</div>
                )}
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="firstName" className='px-2'>Prénom<sup className="text-red-500 font-medium ml-0.5">*</sup></label>
                <input id="firstName" name="firstName" value={formData.firstName} type="text" onChange={handleChange} className="input focus:ring-transparent focus:outline-none w-full" />
                {errors.firstName && (
                    <div className="text-red-500 text-sm ml-2 mt-1 w-full">{errors.firstName}</div>
                )}
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="email" className='px-2'>E-mail<sup className="text-red-500 font-medium ml-0.5">*</sup></label>
                <input id="email" name="email" type="text" value={formData.email} onChange={handleChange} className="input focus:ring-transparent focus:outline-none w-full" />
                {errors.email && (
                    <div className="text-red-500 text-sm ml-2 mt-1 w-full">{errors.email}</div>
                )}
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="password" className='px-2'>Mot de passe<sup className="text-red-500 font-medium ml-0.5">*</sup></label>
                <input id="password" name="password" type="password" value={formData.password} onChange={handleChange} className="input focus:ring-transparent focus:outline-none w-full" />
                {errors.password && (
                    <div className="text-red-500 text-sm ml-2 mt-1 w-full">{errors.password}</div>
                )}
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="confirmPassword" className='px-2'>Confimer votre mot de passe<sup className="text-red-500 font-medium ml-0.5">*</sup></label>
                <input id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} type="password" onChange={handleChange} className="input focus:ring-transparent focus:outline-none w-full" />
                {errors.confirmPassword && (
                    <div className="text-red-500 text-sm ml-2 mt-1 w-full">{errors.confirmPassword}</div>
                )}
            </div>

            <button type="submit" className='cursor-pointer bg-midGreen text-white rounded-lg font-medium py-3' >S'inscrire</button>
            
        </form>)
}

export default RegistrationForm;