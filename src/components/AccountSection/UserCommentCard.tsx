import { format } from "date-fns";
import { userComment } from "../../shared/interfaces/userInterfaces";
import { useEffect, useState } from "react";
import { Cabin } from "../../shared/interfaces/cabinInterface";
import { useNavigate } from "react-router-dom";


export default function UserCommentCard({ comment }: { comment: userComment }) {
    const [cabin, setCabin] = useState<Cabin | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const Data = JSON.parse(localStorage.getItem('myData') || '{}');
        const cabin = Data.cabins.find((cabin: Cabin) => cabin.id === comment.cabin_id);
        setCabin(cabin);
    }, [])


    return (
        <div className="flex flex-col gap-4 p-4 bg-white border-2 border-beige rounded-lg shadow-lg cursor-pointer" onClick={() => navigate("/cabin/" + comment.cabin_id)}>
            <div className="flex justify-between">
                <h3 className="font-bold text-lg">{cabin?.name}</h3>
                <p className="text-sm text-gray-400">{format(comment.time_stamp, "dd-MM-yy")}</p>
            </div>
            <div >
                <p className="flex italic opacity-75">{comment.comment}</p>
            </div>
        </div>
    )
}