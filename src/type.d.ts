export interface IOwner {
    id: number;
    email: string;
    username: string;
    avatar: string;
    first_name: string;
    last_name: string;
}

export interface IAmenity {
    id: number;
    name: string;
}

export interface IImage {
    id: number;
    file: string;
}

export interface IReview {
    id: number;
    content: string;
    owner: IOwner;
    campground: number;
    created_at: string;
    updated_at: string;
}

export interface ICamping {
    id: number;
    created_at: string;
    updated_at: string;
    name: string;
    rating: number;
    price: number;
    view: string;
    visited_at: string;
    visited_end: string;
    manner_time_start: string;
    manner_time_end: string;
    content: string;
    maximum_people: number;
    is_ev_charge: boolean;
    camping_kind: string;
    location: string;
    location_lat_lon: string;
    owner: IOwner;
    amenities: IAmenity[];
    images: IImage[];
    reviews: IReview[];
}

export interface ISignUpForm {
    email: string;
    password: string;
    username?: string;
    password_confirm: string;
}

export interface ISignUpFormSuccess {
    message: string;
}

export interface ISignUpFormError {
    detail: string;
}

// Login
export interface ISignInForm {
    email: string;
    password: string;
}

export interface ISignInFormSuccess {
    message: string;
}

export interface ISignInFormError {
    detail: string;
}