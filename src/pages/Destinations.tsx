import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import CabinCard from '../components/CabinCard/CabinCard';
import AuthContext from "../contexts/AuthContext";
import { UserInterface } from '../shared/interfaces/userInterfaces';
import { Cabin } from '../shared/interfaces/cabinInterface';
import { set } from 'date-fns';
import useMediaWidth from '../shared/utils/useMediaWidth';


const Destinations = () => {

    const [data, setData] = useState<Cabin[]>([]);
    const [filteredData, setFilteredData] = useState<Cabin[]>([])
    const [searchParams] = useSearchParams();
    const [activeFilter, setActiveFilter] = useState<string>("")
    const { user, setUser } = useContext(AuthContext);
    const [isSelectedToggle, setIsSelectedToggle] = useState<boolean>(false);
    const [selectedPrice, setSelectedPrice] = useState<string>("0");
    const [isOrderToggle, setIsOrderToggle] = useState<boolean>(false);
    const [order, setOrder] = useState<string>("Croissant");
    const isLargeScreen = useMediaWidth(1300);

    const toggleSelected = () => {
        setIsSelectedToggle(!isSelectedToggle);
    }


    async function fetchData() {
        const Data = JSON.parse(localStorage.getItem('myData') || '{}');
        return Data.cabins;
    }

    function locationFilter(cabins: Cabin[], location: string | null) {
        if ((location !== "null") && (location !== "undefined") && (location !== null) && (location !== "")){
            console.log("location:", location);
            const filter = cabins.filter((cabin) => cabin.region=== location);

            setFilteredData(filter)
            handleChange(null, location)
            return filter
        }
        return cabins
    }

    function guestsFilter(cabins: Cabin[], maxGuests: string | null): Cabin[] {

        if (maxGuests !== null && maxGuests !== "" && !isNaN(parseInt(maxGuests))) {
            const parsedMaxGuests = parseInt(maxGuests);
            const filter = cabins.filter((cabin: Cabin) => {
                return cabin.max_guests >= parsedMaxGuests;
            });
            return filter;
        }

        return cabins;
    }

    useEffect(() => {
        async function getData() {
            let result = await fetchData();
            setData(result);
            console.log("Fetched data:", result);
            setFilteredData(result);

            const maxGuestsParam = searchParams.get('maxGuests');

            if (maxGuestsParam) {
                const filteredResult = guestsFilter(result, maxGuestsParam);
                setFilteredData(filteredResult); // Mise à jour de `filteredData` après filtrage
            } else {
                setFilteredData(result);
            }

            const locationParam = searchParams.get('location');
            const locationFilteredResult = locationFilter(result, locationParam);
            setFilteredData(locationFilteredResult); // Mise à jour de `filteredData` après filtrage par localisation
        }

        getData();
    }, [user, searchParams]);


    function displayAll() {
        setFilteredData(data)

    }

    function handleChange(e?: any, location?:string) {
        let value :string
        if (e){
            value = e.target.value
            if (value === "Toutes les régions") {
                displayAll()
                setActiveFilter(value)
                setIsSelectedToggle(!isSelectedToggle)
                return
            }
            const filter = data.filter((cabins: Cabin) => cabins.region === value)
            setFilteredData(filter)
            setActiveFilter(value)
            setIsSelectedToggle(!isSelectedToggle)
        } else if(location){
            value = location
            if (value === "Toutes les régions") {
                displayAll()
                setActiveFilter(value)
                setIsSelectedToggle(!isSelectedToggle)
                return
            }
            const filter = data.filter((cabins: Cabin) => cabins.region === value)
            setFilteredData(filter)
            setActiveFilter(value)
            setIsSelectedToggle(!isSelectedToggle)
        }
        

    }

    function priceFilter(value: string) {
        setSelectedPrice(value)
        const filter = data.filter((cabins: Cabin) => cabins.price_per_night <= parseInt(value, 10))
        setFilteredData(filter)
    }

    const sortCabins = (e?: any) => {
        const sorted = [...filteredData].sort((a, b) => {
            if (e.target.value === "Croissant") {
                setOrder('Croissant')
                return a.price_per_night - b.price_per_night;
            } else {
                setOrder('Décroissant')
                return b.price_per_night - a.price_per_night;
            }
        });
        setFilteredData(sorted);
        setIsOrderToggle(!isOrderToggle)
    };
    window.addEventListener('click', (e) => {
        if (e.target !== document.getElementById('where')) {
            setIsSelectedToggle(false)
        }
        if (e.target !== document.getElementById('order')) {
            setIsOrderToggle(false)
        }

    }
    )


    return (
        <div className=' flex justify-center bg-backgroundColor bg-cover bg-center min-h-screen pt-24 pb-24 ' >
            <div className='px-32 max-[1560px]:px-12 f-full flex flex-col'>
                <h1 className='text-2xl mb-8 font-bold  md:text-4xl'>Choisissez votre <span className='text-midGreen'> destination</span></h1>
                {isLargeScreen &&
                    <form className='flex mb-4   items-center justify-between  rounded-2xl  w-full  py-3 border-2 border-midGreen px-3'>
                        <div className="relative flex items-center gap-2 w-[20%]">
                            <button type="button" name="where" id="where" className="w-full rounded-lg border border-midGreen bg-white py-2 px-3 text-[#757575] flex justify-between focus:text-darkGreen focus:font-medium" onClick={toggleSelected}><span>{activeFilter === "" ? "Choissisez une région" : `${activeFilter}`}</span>
                                {!isSelectedToggle ?
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24"><path d="M480 711 240 471l43-43 197 198 197-197 43 43-240 239Z" /></svg> :
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24" className="rotate-180"><path d="M480 711 240 471l43-43 197 198 197-197 43 43-240 239Z" /></svg>
                                }
                            </button>
                            {isSelectedToggle &&
                                <div className="absolute top-[50px] right-0 bg-white w-full rounded-lg py-1 px-2 border border-midGreen">
                                    <button type="button" value="Toutes les régions" className="w-full text-left my-1 py-1 px-2 hover:bg-midGreen hover:rounded-lg hover:text-white border-b border-midGreen/50" onClick={(e) => handleChange(e)}>Toutes les régions</button>
                                    <button type="button" value="Région wallonne" className="w-full text-left my-1 py-1 px-2 hover:bg-midGreen hover:rounded-lg hover:text-white border-b border-midGreen/50" onClick={(e) => handleChange(e)}>Région Wallonne</button>
                                    <button type="button" value="Région flamande" className="w-full text-left my-1 py-1 px-2 hover:bg-midGreen hover:rounded-lg hover:text-white border-b border-midGreen/50" onClick={(e) => handleChange(e)}>Région Flamande</button>
                                    <button type="button" value="Région de Bruxelles-Capitale" className="w-full text-left my-1 py-1 px-2 hover:bg-midGreen hover:rounded-lg hover:text-white" onClick={(e) => handleChange(e)}>Région de Bruxelles-Capitale</button>
                                </div>
                            }
                        </div>
                        <div className='flex items-center gap-2 '>
                            <label htmlFor="price">Prix</label>
                            <input type="range" className="slider" min="50" max="150" step={10} onChange={(e) => priceFilter(e.target.value)} />
                            <p>{selectedPrice}€</p>
                        </div>
                        <div className='flex items-center gap-2 w-1/4'>
                            <p>Voyageurs</p>
                            <input type="number" placeholder='0' className="rounded-lg  border border-midGreen focus:border focus:border-darkGreen focus:ring-0 focus:placeholder:text-darkGreen" />
                        </div>
                        <div className="relative flex items-center gap-2">
                            <p>Ordre</p>
                            <button type="button" name="where" id="order" className="w-[200px] rounded-lg border border-midGreen bg-white py-2 px-3 text-[#757575] flex justify-between focus:text-darkGreen focus:font-medium" onClick={() => setIsOrderToggle(!isOrderToggle)}><span>{order === "" ? "Ordre" : `${order}`}</span>
                                {!isOrderToggle ?
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24"><path d="M480 711 240 471l43-43 197 198 197-197 43 43-240 239Z" /></svg> :
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24" className="rotate-180"><path d="M480 711 240 471l43-43 197 198 197-197 43 43-240 239Z" /></svg>
                                }
                            </button>
                            {isOrderToggle &&
                                <div className="absolute top-[50px] right-0 bg-white rounded-lg py-1 px-2 border border-midGreen">
                                    <button type="button" value="Croissant" className="w-full text-left my-1 py-1 px-2 hover:bg-midGreen hover:rounded-lg hover:text-white border-b border-midGreen/50" onClick={(e) => sortCabins(e)}>Croissant</button>

                                    <button type="button" value="Région de Bruxelles-Capitale" className="w-full text-left my-1 py-1 px-2 hover:bg-midGreen hover:rounded-lg hover:text-white" onClick={(e) => sortCabins(e)}>Décroissant</button>
                                </div>
                            }
                        </div>
                    </form>
                }
                <h2 className='text-lg mb-3 md:text-xl'>Résultats ({filteredData?.length})</h2>
                <div className='grid grid-cols-12 max-[750px]:grid-cols-4 max-[1300px]:grid-cols-8 gap-20 justify-center max-[900px]:gap-x-14 max-[1100px]:gap-x-12 '>
                    {filteredData && filteredData.length !== 0 ?
                        filteredData.map((cabin) =>
                            <CabinCard cabin={cabin} key={cabin.id} user={user} />
                        ) : <div className=' col-span-12 text-center'><h1 className='text-4xl'>Il n'y a pas de cabanes correspondant à ces critères</h1></div>
                    }

                </div>

            </div>
        </ div >

    )
};

export default Destinations;