import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api";
import { IOwner } from "../type";



export default function useUser(){
    const {isLoading, data, isError} = useQuery<IOwner>(["me"], getMe, {
            retry: false,
    });

    return {
        userLoading: isLoading,
        user: data,
        isLoggedIn: !isError,
    }
}