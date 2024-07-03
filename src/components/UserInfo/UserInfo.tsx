import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import { UserInterface } from "../../shared/interfaces/userInterfaces";
import { format } from "date-fns";

const UserInfo = () => {
    const { user, setUser } = useContext(AuthContext);
    const loggedInIcon = (user: UserInterface) => `${user.first_name[0]}${user.name[0]}`.toUpperCase()

    return (
        <>{user &&
            <div className="bg-white border-2 w-full border-midGreen rounded-xl p-4 flex items-center max-[1356px]:flex-col max-[1356px]:gap-10">
                <div className="w-1/3 gap-4 flex   items-center justify-start max-[1356px]:flex-col max-[1356px]:text-center max-[1356px]:w-full">
                    <p className="w-24 h-24 bg-lightGreen rounded-full flex justify-center items-center text-3xl text-bold mb-4">
                        {loggedInIcon(user)}
                    </p>
                    <div className="flex flex-col max-[1356px]">
                        <p className="text-lg font-bold mb-2">{user.first_name} {user.name}</p>
                        <p className="text-lg">{user.email}</p>
                        <p className="text-lg">membre depuis le {format(user.time_stamp, "dd-MM-yy")}</p>
                    </div>
                </div>
                <div className="w-2/3 flex justify-around max-[1356px]:w-full">
                    <div className="flex flex-col items-center">
                        <div className=" border-2 border-midGreen  p-2 rounded-full mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" height="36" viewBox="0 96 960 960" width="36" fill="#467971"><path d="m480 935-41-37q-105.768-97.121-174.884-167.561Q195 660 154 604.5T96.5 504Q80 459 80 413q0-90.155 60.5-150.577Q201 202 290 202q57 0 105.5 27t84.5 78q42-54 89-79.5T670 202q89 0 149.5 60.423Q880 322.845 880 413q0 46-16.5 91T806 604.5Q765 660 695.884 730.439 626.768 800.879 521 898l-41 37Zm0-79q101.236-92.995 166.618-159.498Q712 630 750.5 580t54-89.135q15.5-39.136 15.5-77.72Q820 347 778 304.5T670.225 262q-51.524 0-95.375 31.5Q531 325 504 382h-49q-26-56-69.85-88-43.851-32-95.375-32Q224 262 182 304.5t-42 108.816Q140 452 155.5 491.5t54 90Q248 632 314 698t166 158Zm0-297Z" /></svg>
                        </div>
                        <p><span className="text-midGreen font-bold">{user.favourites.length}</span> j'aime</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className=" border-2 border-midGreen  p-2 rounded-full mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" height="36" viewBox="0 96 960 960" width="36" fill="#467971"><path d="M213 881q-43.594-45-68.297-104Q120 718 120 656q0-73 25.5-133.5T222 411q35-35 87-59t122.5-37.5Q502 301 591 297.5t198 3.5q8 108 5.5 197.5t-16 160.75q-13.5 71.25-38 124.563T680 873q-51 51-110 77t-126 26q-69 0-126.5-23.5T213 881Zm103 0q25 17 58 26t69.923 9Q497 916 547 894t91-64q27-27 46-70.5t31-103Q727 597 731 522t0-165q-94-2-168.5 2.5T431 376q-57 12-98 30.5T266 452q-42 43-64 91t-22 98q0 48 20.5 100.5T251 826q53-98 127-176t157-123q-87 75-141 162.5T316 881Zm0 0Zm0 0Z" /></svg>
                        </div>
                        <p><span className="text-midGreen font-bold">{user.posted_comments.length}</span> avis</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className=" border-2 border-midGreen  p-2 rounded-full mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" height="36" viewBox="0 -960 960 960" width="36" fill="#467971"><path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z" /></svg>
                        </div>
                        <p><span className="text-midGreen font-bold">{user.past_bookings.length}</span> {user.past_bookings.length>1? "voyages":"voyage"}</p>
                    </div>
                </div>
            </div >
        }
        </>
    )
}

export default UserInfo