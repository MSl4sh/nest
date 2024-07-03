export interface Cabin {
    id: number,
    name: string,
    commune: string,
    region: string,
    description: string,
    images: string[],
    price_per_night: number,
    bookings: cabinBookings[],
    comments: cabinComment[],
    rating: number,
    max_guests: number,
}
export interface cabinComment {
    commenter_id: number,
    comment: string,
    time_stamp: Date
    rating: number
}

export interface cabinBookings {
    booker_id: number,
    start_date: Date,
    end_date: Date,
    guests: number,
}