import { format } from "date-fns";
import { userFavorite } from "../../shared/interfaces/userInterfaces";
import { useEffect, useState } from "react";
import { Cabin } from "../../shared/interfaces/cabinInterface";
import { useNavigate } from "react-router-dom";


export default function UserFavourites({ favourite }: { favourite: userFavorite }) {
    const [cabin, setCabin] = useState<Cabin | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const Data = JSON.parse(localStorage.getItem('myData') || '{}');
        const cabin = Data.cabins.find((cabin: Cabin) => cabin.id === favourite.cabin_id);
        setCabin(cabin);
    }, [])


    return (
        <div className="flex flex-col gap-4 p-4 bg-white border-2 border-beige rounded-lg shadow-lg cursor-pointer" onClick={() => navigate("/cabin/" + favourite.cabin_id)}>
            <div className="flex justify-between">
                <h3 className="font-bold text-lg">{cabin?.name}</h3>
            </div>
            <div >
                <img src={`${process.env.PUBLIC_URL}${cabin?.images[0]}`} alt={cabin?.name} className="rounded-lg w-full h-48 object-cover" />
            </div>
        </div>
    )
}