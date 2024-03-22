"use client";
import { useEffect } from "react";
import { redirect } from "next/navigation";


export default function isAuth(Component: any) {
    return function IsAuth(props: any) {
        const auth = window.localStorage.getItem('authToken');
        useEffect(() => {
            if (!auth) {
                return redirect("/log-in");
            }
        }, []);
        if (!auth) {
            return null;
        }
        return <Component {...props} />;
    };
}