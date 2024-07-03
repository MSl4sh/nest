import { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/AuthContext";
import { ArrowExpand } from "../../shared/components/iconSvg";
// import Favourite from "./Favourite";
// import UserComment from "./UserComment";
import { UserInterface } from "../../shared/interfaces/userInterfaces";
import UserCommentCard from "./UserCommentCard";
import UserFavourites from "../UserFavourites/UserFavourites";
import User from "../../pages/Account";
import UserBookings from "../UserBookings/UserBookings";

const UserSections = () => {
    const { user, setUser } = useContext(AuthContext);
    const [isSectionFavouritesVisible, setIsSectionFavouritesVisible] = useState<boolean>(false);
    const [isSectionCurrentBookingsVisible, setIsSectionCurrentBookingsVisible] = useState<boolean>(false);
    const [isSectionPastBookingsVisible, setIsSectionPastBookingsVisible] = useState<boolean>(false);
    const [isSectionCommentsVisible, setIsSectionCommentsVisible] = useState<boolean>(false);

    useEffect(() => {
        const reloadUser = async () => {

            const user = JSON.parse(localStorage.getItem('myData') || "").users.find((user: UserInterface) => user.id === user.id);
            localStorage.setItem('currentUser', JSON.stringify(user));
            setUser((prevUser) => (user));
        }
        reloadUser();
    }, [])

    const sectionFavouritesVisible = () => {
        setIsSectionFavouritesVisible(!isSectionFavouritesVisible)
    }

    const sectionCurrentBookingsVisible = () => {
        setIsSectionCurrentBookingsVisible(!isSectionCurrentBookingsVisible)
    }

    const sectionPastBookingsVisible = () => {
        setIsSectionPastBookingsVisible(!isSectionPastBookingsVisible)
    }

    const sectionCommentsVisible = () => {
        setIsSectionCommentsVisible(!isSectionCommentsVisible)
    }

    return (
        <div className="w-full mt-8 flex flex-col gap-8">
            {user && <>
            <div className="user-box" onClick={()=>setIsSectionFavouritesVisible(!isSectionFavouritesVisible)}>
                <div className="flex justify-between">
                    <h2 className="font-bold text-lg">Mes favoris ({user.favourites.length})</h2>
                    <ArrowExpand toggleCallback={sectionFavouritesVisible} isExpanded={isSectionFavouritesVisible} setIsExpanded={setIsSectionFavouritesVisible} />
                </div>
                {isSectionFavouritesVisible && <div className="grid grid-cols-3 max-[1200px]:grid-cols-2 max-[900px]:grid-cols-1 gap-6 border-t-2 border-t-beige pt-6">
                    {user && user.favourites.length !== 0 ?
                        user.favourites.map((favourite) =>
                            <UserFavourites favourite={favourite} />
                        ) : <p>Cette section est vide</p>
                    }
                </div>}
            </div>
            <div className="user-box" onClick={()=>setIsSectionPastBookingsVisible(!isSectionPastBookingsVisible)}>
                <div className="flex justify-between">
                    <h2 className="font-bold text-lg">Mes réservations ({user.current_bookings.length})</h2>
                    <ArrowExpand toggleCallback={sectionPastBookingsVisible} isExpanded={isSectionPastBookingsVisible} setIsExpanded={setIsSectionPastBookingsVisible} />
                </div>
                {isSectionPastBookingsVisible && <div className="grid grid-cols-3 max-[1200px]:grid-cols-2 max-[900px]:grid-cols-1 gap-6 border-t-2 border-t-beige pt-6">
                    {user &&  user.current_bookings.length !== 0 ?
                        user.current_bookings.map((currentBooking) =>
                            <UserBookings booking={currentBooking} />
                        ) : <p>Cette section est vide</p>
                    }
                </div>}
            </div>
            <div className="user-box" onClick={()=>setIsSectionCommentsVisible(!isSectionCommentsVisible)}>
                <div className="flex justify-between" >
                    <h2 className="font-bold text-lg">Mes commentaires ({user.posted_comments.length})</h2>
                    <ArrowExpand toggleCallback={sectionCommentsVisible} isExpanded={isSectionCommentsVisible} setIsExpanded={setIsSectionCommentsVisible} />
                </div>
                {isSectionCommentsVisible && <div className="grid grid-cols-2 max-[1356px]:grid-cols-1 gap-8 border-t-2 border-t-beige pt-6">
                    {user &&  user.posted_comments.length !== 0 ?
                        user.posted_comments.map((postedComment,index) =>
                            <UserCommentCard comment={postedComment} key={index}/>
                        ) : <p>Cette section est vide</p>
                    }
                </div>}
            </div>
            </>}
        </div>
    )
}

export default UserSections