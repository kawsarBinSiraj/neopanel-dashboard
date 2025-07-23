"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import { deleteSession, decrypt } from "@/helper/auth";
import usePersistedStore from "@/store/usePersistedStore";

const CornerStoneProvider = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const { resetAuth }: any = usePersistedStore();

    /**
     * @desc :- axios.defaults , Important: If axios is used with multiple domains,
     * the AUTH_TOKEN will be sent to all of them.
     * See below for an example using Custom instance defaults instead.
     */
    useEffect(() => {
        const init = async () => {
            try {
                const cookie = Cookies.get("session");
                const session = (await decrypt(cookie)) as any;
                if (cookie && !session) deleteSession(() => resetAuth());
                // Set default axios headers
                axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "";
                axios.defaults.headers.common["Authorization"] = session?.authToken || "";
                axios.defaults.headers.common["ngrok-skip-browser-warning"] = true;
                axios.interceptors.request.use(
                    (config) => {
                        // Do something before the request is sent (e.g., add loading indicator, auth token)
                        // console.log("Request:", config); // For logging purposes (optional)
                        return config;
                    },
                    (error) => {
                        // Do something with request errors
                        // console.error("Error in request:", error);
                        const { status = null } = error?.response;
                        if (status === 401)
                            deleteSession(() => {
                                resetAuth();
                                router.push("/signin");
                            });
                        if (process.env.NODE_ENV === "development") console.error("Error in request:", error);
                        return Promise.reject(error);
                    }
                );
            } catch (error) {
                console.error("Error in CornerStone:", error);
            }
        };
        init();
    }, []);
    return <>{children}</>;
};

export default CornerStoneProvider;
