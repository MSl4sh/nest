import React, { useEffect, useState, useContext } from "react";
import { useSearchParams } from 'react-router-dom';
import { differenceInDays, format } from "date-fns";
import AuthContext from "../contexts/AuthContext";
import { Cabin } from "../shared/interfaces/cabinInterface";
import { UserInterface } from "../shared/interfaces/userInterfaces";
import Reserved from "../components/ReservationCompleted/ReservationCompleted";


const Reservation = () => {
    const { user, setUser } = useContext(AuthContext);
    const [data, setData] = useState<Cabin | undefined>();
    const [searchParams] = useSearchParams();
    const today:Date = new Date();
    const [minDate, setMinDate] = useState<string>(today.toISOString().slice(0, 10));
    const [newDateStart, setNewDateStart] = useState<string>('');
    const [newDateEnd, setNewDateEnd] = useState<string>('');
    const [persNumber, setPersNumber] = useState<number>(0);
    const [isDateStartChanged, setIsDateStartChanged] = useState<boolean>(false);
    const [isDateEndChanged, setIsDateEndChanged] = useState<boolean>(false);
    const [daysNumber, setDaysNumber] = useState<number>(0);
    const [total, setTotal] = useState<number>(0)
    const [isDisabled, setIsDisabled] = useState<boolean>(false)
    const [payment, setPayment] = useState('')
    const [isReserved, setIsReserved] = useState<boolean>(false)
    const [reservationsInfos, setReservationInfos] = useState(
        {
            start_date: '',
            end_date: '',
            guests: 0,
            price: 0,
            nights: 0,
        }
    )

    const urlCabinID: string = searchParams.get('id') ?? '';
    const urlDateStart: string = searchParams.get('dateStart')??"";
    const urlDateEnd : string= searchParams.get('dateEnd')??"";





    async function fetchData() {

        const Data = JSON.parse(localStorage.getItem('myData') ?? '').cabins.find((cabin:Cabin) => cabin.id === parseInt(urlCabinID));
        return Data;
    }

    useEffect(() => {
        async function getData() {
            const result = await fetchData();
            setData(result || undefined);
        }
        getData();


    }, []);

    useEffect(() => {
        function dateSpace(dateStart:string, dateEnd:string) {
            const space = differenceInDays(new Date(dateEnd), new Date(dateStart));
            setDaysNumber(space)
            if(data) {
            const totalPrice = space * data.price_per_night
            setTotal(totalPrice)
            }

        }
        dateSpace(urlDateStart, urlDateEnd)
        if (isDateStartChanged && !isDateEndChanged) {

            dateSpace(newDateStart, urlDateEnd)
        } else if (!isDateStartChanged && isDateEndChanged) {

            dateSpace(urlDateStart, newDateEnd)
        } else if (isDateStartChanged && isDateEndChanged) {
            dateSpace(newDateStart, newDateEnd)
        }


    }, [data, newDateStart, newDateEnd]);



    const handleChangedDateStart = (e:any) => {
        const dateStart = e.target.value;
        setNewDateStart(dateStart);


        const dateStartChanged = true;
        setIsDateStartChanged(dateStartChanged);
    }

    const handleChangedDateEnd = (e:any) => {
        const dateEnd = e.target.value;
        setNewDateEnd(dateEnd);


        const dateEndChanged = true;
        setIsDateEndChanged(dateEndChanged);
    }

    const handlePersNumber = (e:any) => {
        const nPers = e.target.value;
        setPersNumber(nPers);

    }

    async function handleSubmit() {
        if (persNumber === 0) {
            setIsDisabled(true)
        } else if(data) {
            const reservationsData = {
                bookings: [
                    ...data.bookings,
                    {
                        booker_id: user? user.id:0,
                        start_date: `${isDateStartChanged ? newDateStart : urlDateStart}`,
                        end_date: `${isDateEndChanged ? newDateEnd : urlDateEnd}`,
                        guests: persNumber
                    }
                ]
            }
            localStorage.setItem('myData', JSON.stringify({
                ...JSON.parse(localStorage.getItem('myData') || '{}'),
                cabins: JSON.parse(localStorage.getItem('myData') || '{}').cabins.map((cabin:Cabin) => cabin.id === data.id ? { ...cabin, bookings: reservationsData.bookings } : cabin)
            }));
            const userReservation = user &&{
                current_bookings: [
                    ...user.current_bookings,
                    {
                        cabin_id: data.id,
                        start_date: `${isDateStartChanged ? newDateStart : urlDateStart}`,
                        end_date: `${isDateEndChanged ? newDateEnd : urlDateEnd}`,
                        guests: persNumber,
                        total_price: total
                    }
                ]
            }
            localStorage.setItem('myData', JSON.stringify({
                ...JSON.parse(localStorage.getItem('myData') || '{}'),
                users: JSON.parse(localStorage.getItem('myData') || '{}').users.map((user:UserInterface) => user.id === user.id ? { ...user, current_bookings: userReservation?.current_bookings } : user)
            }));
            localStorage.setItem('currentUser', JSON.stringify({
                ...user,
                current_bookings: userReservation?.current_bookings
            }));

            const globalInfos = {
                start_date: `${isDateStartChanged ? newDateStart : urlDateStart}`,
                end_date: `${isDateEndChanged ? newDateEnd : urlDateEnd}`,
                guests: persNumber,
                price: total,
                nights: daysNumber,

            }
            setReservationInfos(globalInfos)
            setIsReserved(true)
        }
    }

    return (
        <div className="bg-cover h-fit bg-center home-background flex flex-col">
            {!isReserved ?
                <main className="w-full h-fit flex flex-col  py-20 px-40 max-[800px]:px-4 mb-10">
                    <h1 className="text-4xl font-bold pb-8">Finalisez votre <span className="text-midGreen">réservation</span></h1>
                    <div className="flex gap-40  justify-between max-[1348px]:flex-col-reverse max-[1348px]:gap-10 pt-8">
                        <form className="bg-white rounded-lg border-2 border-midGreen p-5">
                            <h2 className="text-2xl font-bold pb-8">Détails et modes de paiement</h2>
                            <div>
                                <h3 className="text-lg font-bold pb-5">Votre séjour</h3>
                                <div className="flex items-start justify-between pb-5 pl-3 w-full">
                                    <div className="flex max-[598px]:flex-col gap-4 w-full">
                                        <div className="flex flex-col w-full">
                                            <label htmlFor="dateStart" className="font-medium pb-1 text-darkGreen">Début du séjour</label>
                                            {isDateStartChanged === true ?
                                                <input type="date" name="dateStart" id="dateStart" min={minDate} className="rounded-lg border border-midGreen text-[#757575] focus:font-semibold focus:border focus:border-darkGreen focus:ring-0 focus:text-darkGreen" value={newDateStart} onChange={handleChangedDateStart} />
                                                :
                                                <input type="date" name="dateStart" id="dateStart" min={minDate} className="rounded-lg border border-midGreen text-[#757575] focus:font-semibold focus:border focus:border-darkGreen focus:ring-0 focus:text-darkGreen" value={urlDateStart} onChange={handleChangedDateStart} />}
                                        </div>
                                        <div className="flex flex-col w-full">
                                            <label htmlFor="dateEnd" className="font-medium pb-1 text-darkGreen">Fin du séjour</label>
                                            {isDateEndChanged === true ?
                                                <input type="date" name="dateEnd" id="dateEnd" min={minDate} className="rounded-lg border border-midGreen text-[#757575] focus:font-semibold focus:border focus:border-darkGreen focus:ring-0 focus:text-darkGreen" value={newDateEnd} onChange={handleChangedDateEnd} />
                                                :
                                                <input type="date" name="dateEnd" id="dateEnd" min={minDate} className="rounded-lg border border-midGreen text-[#757575] focus:font-semibold focus:border focus:border-darkGreen focus:ring-0 focus:text-darkGreen" value={urlDateEnd} onChange={handleChangedDateEnd} />}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-start justify-between pb-5 pl-3 w-full">
                                    <div className="flex flex-col w-full">
                                        <label htmlFor="person" className="font-medium pb-1 text-darkGreen">Voyageurs</label>
                                        <input type="number" name="person" id="person" min="1" max="4" placeholder="4 pers. max" value={persNumber} className="rounded-lg border border-midGreen focus:font-semibold focus:border focus:border-darkGreen focus:ring-0 focus:placeholder:text-darkGreen" onChange={handlePersNumber} />
                                    </div>
                                </div>
                            </div>
                            <div>
                                {isDisabled && <p className="text-red-500">Veuillez remplir tous les champs ci-dessus.</p>}
                            </div>
                            <button type="button" className="bg-midGreen h-fit py-1 px-6 rounded-lg text-white hover:bg-darkGreen mt-14" onClick={handleSubmit}>Payer</button>


                        </form>
                        { data &&<section className="w-full min-[1350px]:w-[40%] h-fit bg-white border-2 border-midGreen rounded-2xl shadow-lg shadow-darkGreen/50 p-5">
                            <div className="flex mb-7">
                                <img src={data && data.images && data.images[0]} alt="" className="h-28 rounded-lg" />
                                <div className="pl-3">
                                    <h3 className="text-lg font-bold">{data.name}</h3>
                                    <p>{data.region}</p>
                                    <p>{data.commune}</p>
                                </div>
                            </div>
                            <div className="flex justify-between pb-3">
                                <p>Dates</p>

                                <p>Du {isDateStartChanged === true ? format(new Date(newDateStart), "dd-MM-yyyy") : format(new Date(urlDateStart), "dd-MM-yyyy")} au {isDateEndChanged === true ? format(new Date(newDateEnd), "dd-MM-yyyy") : format(new Date(urlDateEnd), "dd-MM-yyyy")}</p>

                            </div>
                            <div className="flex justify-between pb-3">
                                <p>Voyageurs</p>
                                <p>{persNumber}</p>
                            </div>
                            <div className="flex justify-between pb-3">
                                <p>Prix</p>
                                <p>{data.price_per_night}€ x {daysNumber} nuits</p>
                            </div>
                            <div className="flex justify-between pt-5 pb-2 border-t-2 border-beige font-medium">
                                <p>Prix total</p>
                                <p>{!isNaN(total) ? total : ""}€</p>
                            </div>
                        </section>}
                    </div>
                </main> : <div className="">
                {data && user &&<Reserved data={data} user={user} reservation={reservationsInfos} />}
                </div>
                }
        </div>
    )
}

export default Reservation;