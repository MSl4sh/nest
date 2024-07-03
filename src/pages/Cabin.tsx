import { useParams, NavLink } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';
import AuthContext from "../contexts/AuthContext";
// import CabinComment from '../components/CabinComment';
// import Carroussel from '../components/Carroussel';
// import CommentForm from '../components/CommentForm';
// import LikeButton from '../components/LikeButton';
import { set } from 'date-fns';
import { Cabin } from '../shared/interfaces/cabinInterface';
import useMediaWidth from '../shared/utils/useMediaWidth';
import CabinComment from '../components/CabinComment/CabinComment';
import CommentForm from '../components/CommentForm/CommentForm';
import CabinCommentCard from '../components/CabinComment/CabinCommentCard';
import LikeButton from '../components/LikeButton/LikeButton';
import Carroussel from '../components/Carroussel/Carroussel';



const CabinPage = () => {

    const { user, setUser } = useContext(AuthContext);
    const { id } = useParams<string>();
    const [data, setData] = useState<Cabin>();
    const [openedModal, setOpenedModal] = useState<boolean>(false)
    const [openedCommentForm, setOpenedCommentForm] = useState<boolean>(false)
    const today: Date = new Date();
    const [minDate, setMinDate] = useState<string>(today.toISOString().slice(0, 10));
    const [commentPosted, setCommentPosted] = useState<boolean>(false)
    const [dateStart, setDateStart] = useState();
    const [dateEnd, setDateEnd] = useState();
    const [error, setError] = useState<string>("")
    const [isValidForm, setIsValidForm] = useState<boolean>(false)
    const [currentIndex, setCurrentIndex] = useState<number>(0)
    const isLargeScreen = useMediaWidth(1100);
    const toggleCommentCard = useMediaWidth(800);


    function modalControl() {
        setOpenedModal(!openedModal)
    }

    function commentFormControl() {
        setOpenedCommentForm(!openedCommentForm)

    }

    async function fetchData() {
        const Data = JSON.parse(localStorage.getItem('myData') || '{}').cabins.find((cabin: Cabin) => cabin.id === parseInt(id ? id : "0", 10));
        return Data;
    }

    useEffect(() => {
        async function getData() {
            const result = await fetchData();
            setData(result);
        }
        getData();

    }, [commentPosted, user]);

    const changeCommentState = () => {
        setCommentPosted(!commentPosted)
    }

    const getDates = (e: any) => {
        if (e.target.id === "dateStart") {
            setDateStart(e.target.value);
        }
        if (e.target.id === "dateEnd") {
            setDateEnd(e.target.value);
        }
    }
    function handleLoggedError() {
        setError("Aucun compte connecté.")
        setTimeout(() => {
            setError("")
        }, 10000)
    }

    function handleDateError() {
        setError("Veuillez remplir tout les champs ci-dessus.")
        setTimeout(() => {
            setError("")
        }, 10000)
    }

    useEffect(() => {
        if (dateStart === undefined || dateEnd === undefined) {
            setIsValidForm(false)
        } else {
            setIsValidForm(true)
        }
    }, [dateEnd, dateStart])

    const openImageModal = (index: number) => {
        setCurrentIndex(index)
        setOpenedModal(true)
    }


    return (
        data ? (
            <div className="bg-backgroundColor max-h-fit pl-56 pr-56 max-[1452px]:pl-20 max-[1452px]:pr-20 max-[978px]:pl-2 max-[978px]:pr-2 pt-24 pb-24   flex justify-between" >

                {openedModal ?
                    <div className='flex flex-col items-center h-1/2 w-full gap-4'>
                        <Carroussel images={data.images} currentIndex={currentIndex} />
                        <button type='button' onClick={modalControl} className='font-bold text-midGreen underline'>Retourner à la page de la cabane</button>
                    </div>
                    :
                    <>
                        <div className='w-full mb-24 px-8 max-[712px]:px-4'>
                            <div className='w-full h-fit   mb-8 '>
                                <button type='button' className='h-full max-[792px]:h-1/2 ' >
                                    <div className='flex w-full h-full  rounded-2xl overflow-hidden gap-3 '>
                                        {isLargeScreen?<>
                                            <img src={data.images[0]} onClick={() => openImageModal(0)} alt="" className='w-1/2  max-[792px]:w-full   h-auto  object-cover' />

                                        <div className='w-1/2 max-[792px]:hidden flex justify-between gap-y-3 flex-wrap rounded-r-lg overflow-hidden'>
                                            <img src={data.images[1]} onClick={() => openImageModal(1)} alt="" className='h-1/2 w-[48.5%] object-cover' />
                                            <img src={data.images[2]} onClick={() => openImageModal(2)} alt="" className='h-1/2 w-[48.5%] object-cover' />
                                            <img src={data.images[3]} onClick={() => openImageModal(3)} alt="" className='h-1/2 w-[48.5%] object-cover' />
                                            <img src={data.images[4]} onClick={() => openImageModal(4)} alt="" className='h-1/2 w-[48.5%] object-cover' />
                                        </div></>:
                                        <Carroussel images={data.images} currentIndex={currentIndex} />
                                        }
                                    </div>
                                </button>
                            </div>
                            <div className='flex justify-between'>
                                <div className='flex'>
                                    <h1 className='text-2xl max-[792px]:text-xl font-bold mr-10'>{data.name}</h1>
                                    <div className='text-midGreen flex '>
                                        <h2 className='mr-1 font-medium text-xl max-[792px]:text-lg'> {data.rating}</h2> <svg xmlns="http://www.w3.org/2000/svg" height="25" viewBox="0 96 960 960" width="25" fill="#467971"><path d="M213 881q-43.594-45-68.297-104Q120 718 120 656q0-73 25.5-133.5T222 411q35-35 87-59t122.5-37.5Q502 301 591 297.5t198 3.5q8 108 5.5 197.5t-16 160.75q-13.5 71.25-38 124.563T680 873q-51 51-110 77t-126 26q-69 0-126.5-23.5T213 881Zm103 0q25 17 58 26t69.923 9Q497 916 547 894t91-64q27-27 46-70.5t31-103Q727 597 731 522t0-165q-94-2-168.5 2.5T431 376q-57 12-98 30.5T266 452q-42 43-64 91t-22 98q0 48 20.5 100.5T251 826q53-98 127-176t157-123q-87 75-141 162.5T316 881Zm0 0Zm0 0Z" /></svg>
                                    </div>
                                </div>
                                <LikeButton data={data} user={user} />
                            </div>
                            <p className='font-light mb-4 max-[792px]:text-sm'>{data.region}, {data.commune}</p>
                            <p className='max-[792px]:text-sm'>{data.description}</p>
                            {!isLargeScreen && < NavLink to={`/reservation?id=${id}&dateStart=${dateStart}&dateEnd=${dateEnd}`}><button type='button' className='bg-midGreen mt-6 w-fit h-fit py-2 px-8 rounded-lg text-white border border-midGreen  hover:bg-darkGreen duration-75'>Réserver</button></ NavLink>}
                            <div className='mt-24 pb-24'>
                                <h1 className='text-2xl font-bold mb-4'>Commentaires</h1>

                                {user &&
                                    <div className='mb-12 '>
                                        {openedCommentForm ? <CommentForm close={setOpenedCommentForm} user={user} data={data} postedComment={changeCommentState} /> :

                                            <button type='button' className='text-midGreen underline' onClick={commentFormControl}>Laisser un commentaire</button>
                                        }
                                    </div>
                                }
                                {data.comments.length !== 0 ?

                                    <div className='justify-between flex flex-col md:flex-row'>
                                        {data.comments.map((comment, index) =>
                                            <>
                                                {toggleCommentCard ?
                                                    <CabinComment comment={comment} /> : <CabinCommentCard comment={comment} />
                                                }
                                            </>
                                        )}
                                    </div> : <div><p>Il n'y a aucun commentaire pour l'instant</p></div>

                                }

                            </div>
                        </div>


                        {isLargeScreen && <div className='w-1/4 h-screen flex flex-col'>
                            <div className='fixed border-solid p-5'>
                                <h1 className='text-xl font-bold mb-8'>Choisissez vos dates</h1>
                                <div className=' w-full h-fit mb-8  flex flex-col gap-8' >
                                    <div className="flex flex-col">
                                        <label htmlFor="dateStart" className="text-darkGreen pb-1 pl-1">Date de début</label>
                                        <input type="date" min={minDate} name="dateStart" id="dateStart" className="w-[160px] rounded-lg border border-midGreen text-[#757575] focus:font-semibold focus:border focus:border-darkGreen focus:ring-0 focus:text-darkGreen" onChange={getDates} />
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="dateEnd" className="text-darkGreen pb-1 pl-1">Date de fin</label>
                                        <input type="date" name="dateEnd" min={minDate} id="dateEnd" className="w-[160px] rounded-lg border border-midGreen text-[#757575] focus:font-semibold focus:border focus:border-darkGreen focus:ring-0 focus:text-darkGreen" onChange={getDates} />
                                    </div>
                                </div>
                                <div className=''>
                                    <h2 className='w-4/5 text-xl'>Vous n’êtes plus qu’à un click d’une <span className='text-midGreen font-bold'>expérience unique !</span></h2>
                                    {!user ? <button type='button' className='bg-midGreen mt-6 w-fit h-fit py-2 px-8 rounded-lg text-white border border-midGreen  hover:bg-darkGreen duration-75' onClick={handleLoggedError}>Réserver</button>
                                        : <> {isValidForm === true ?
                                            < NavLink to={`/reservation?id=${id}&dateStart=${dateStart}&dateEnd=${dateEnd}`}><button type='button' className='bg-midGreen mt-6 w-fit h-fit py-2 px-8 rounded-lg text-white border border-midGreen  hover:bg-darkGreen duration-75'>Réserver</button></ NavLink> :
                                            <button type='button' className='bg-midGreen mt-6 w-fit h-fit py-2 px-8 rounded-lg text-white border border-midGreen  hover:bg-darkGreen duration-75' onClick={handleDateError}>Réserver</button>}</>
                                    }
                                    <p className='text-red-500 mt-4'>{error}</p>

                                </div>
                            </div>
                        </div>}</>}
            </div >)
            : <div />
    )



};

export default CabinPage;