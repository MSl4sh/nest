import { MutableRefObject, useEffect, useRef, useState } from "react";
import { Cabin } from "../shared/interfaces/cabinInterface";
import { NavLink } from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


export default function Home() {
    const [location, setLocation] = useState<string | null>(null);
    const [maxGuests, setMaxGuests] = useState<number>(0);
    const [isSelectedToggle, setIsSelectedToggle] = useState<boolean>(false);
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const toggleSelected = () => {
        setIsSelectedToggle(!isSelectedToggle);
    }

    const handleLocation = (e: any) => {
        setLocation(e.target.value);
        console.log(location);
        toggleSelected();

    }

    const handleGuests = (e: any) => {
        const maxGuestsHandled = e.target.value;
        setMaxGuests(maxGuestsHandled);
    }

    return (
        <div className="bg-cover bg-center home-background h-[95vh] flex flex-col items-center justify-center">
            <main className="flex flex-col items-center ">
                <h1 className="text-4xl text-warp text-center w-[550px] font-semibold mb-9 max-[1200px]:text-3xl max-[700px]:w-[400px]">
                    Vivez une <span className="text-midGreen font-bold">expérience unique</span> en réservant votre cabane dans les arbres dès maintenant !</h1>
                <form className="flex max-[1278px]:flex-col w-full  bg-white/75 p-7 gap-6 rounded-2xl border-2 border-midGreen items-end shadow-lg shadow-darkGreen/50">
                    <div className="flex flex-col max-[1278px]:w-[100%]">
                        <label htmlFor="where" className="text-darkGreen pb-1 pl-1">Où ?</label>
                        <div className="relative">
                            <button type="button" name="where" id="where" className="max-[1278px]:w-full w-[270px] rounded-lg border border-midGreen bg-white py-2 px-3 text-[#757575] flex justify-between focus:text-darkGreen focus:font-medium" onClick={toggleSelected}><span>{location === null ? "Choissisez une région" : `${location}`}</span>
                                {!isSelectedToggle ?
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24"><path d="M480 711 240 471l43-43 197 198 197-197 43 43-240 239Z" /></svg> :
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24" className="rotate-180"><path d="M480 711 240 471l43-43 197 198 197-197 43 43-240 239Z" /></svg>
                                }
                            </button>
                            {isSelectedToggle &&
                                <div className="absolute z-20 top-[50px] bg-white rounded-lg py-1 px-2 border border-midGreen">
                                    <button type="button" value="Région wallonne" className="w-full text-left my-1 py-1 px-2 hover:bg-midGreen hover:rounded-lg hover:text-white border-b border-midGreen/50" onClick={(e) => handleLocation(e)}>Région Wallonne</button>
                                    <button type="button" value="Région flamande" className="w-full text-left my-1 py-1 px-2 hover:bg-midGreen hover:rounded-lg hover:text-white border-b border-midGreen/50" onClick={(e) => handleLocation(e)}>Région Flamande</button>
                                    <button type="button" value="Région de Bruxelles-Capitale" className="w-full text-left my-1 py-1 px-2 hover:bg-midGreen hover:rounded-lg hover:text-white" onClick={(e) => handleLocation(e)}>Région de Bruxelles-Capitale</button>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="flex flex-col max-[1278px]:w-[100%]">
                        <label htmlFor="dateStart" className="text-darkGreen pb-1 pl-1  ">Date de début</label>
                        <DatePicker selected={startDate} dateFormat="dd/MM/yyyy" onChange={(date:Date|null) => setStartDate(date!)} className="date rounded-lg border border-midGreen text-[#757575] max-[1278px]:w-full focus:font-semibold focus:border focus:border-darkGreen focus:ring-0 focus:text-darkGreen"/>
                                            </div>
                    <div className="flex flex-col max-[1278px]:w-[100%]">
                        <label htmlFor="dateEnd" className="text-darkGreen pb-1 pl-1 ">Date de fin</label>
                        <DatePicker selected={endDate} dateFormat="dd/MM/yyyy" minDate={startDate} onChange={(date:Date|null) => setEndDate(date!)} className="date rounded-lg border border-midGreen text-[#757575] max-[1278px]:w-full focus:font-semibold focus:border focus:border-darkGreen focus:ring-0 focus:text-darkGreen"/>
                    </div>
                    <div className="flex flex-col max-[1278px]:w-[100%]">
                        <label htmlFor="person" className="text-darkGreen pb-1 pl-1 ">Combien de personne ?</label>
                        <input type="number" name="person" id="person" min="1" max="4" placeholder="4 pers. max" className="rounded-lg max-[1278px]:w-full  border border-midGreen focus:border focus:border-darkGreen focus:ring-0 focus:placeholder:text-darkGreen" onChange={handleGuests} />
                    </div>
                    <div className="flex flex-col  max-[1278px]:w-[100%] max-[1066px]:text-center">
                        <NavLink to={`/destinations?location=${location}&maxGuests=${maxGuests}`} className="bg-midGreen h-fit py-2 px-3 rounded-lg text-white border border-midGreen hover:bg-darkGreen hover:border-darkGreen">Rechercher</NavLink>
                    </div>
                </form>
            </main>
        </div>
    );
};
