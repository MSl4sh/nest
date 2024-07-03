export interface UserInterface {
    id: number,
    first_name: string,
    name: string,
    email: string,
    password: string,
    current_bookings: userBooking[],
    past_bookings: userBooking[],
    posted_comments: userComment[],
    favourites: userFavorite[],
    time_stamp: Date
}

export interface userComment {
    cabin_id: number,
    comment: string,
    time_stamp: Date
}

export interface userBooking {
    cabin_id: number,
    start_date: Date,
    end_date: Date,
    guests: number,
    total_price: number;
}

export interface userFavorite{
    cabin_id: number,
}

export interface AuthContextType {
    user: UserInterface | null;
    setUser: React.Dispatch<React.SetStateAction<UserInterface | null>>;
  }