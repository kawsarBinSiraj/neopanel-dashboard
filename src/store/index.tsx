"use client";
import React, { useEffect } from "react";
import usePersistedStore from "@/store/usePersistedStore";

const HydrateZustand = ({ children }: { children: React.ReactNode }) => {
    useEffect(() => {
        usePersistedStore.persist.rehydrate();
    }, []);

    return <>{children}</>;
};

export default HydrateZustand;