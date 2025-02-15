"use client";
import { createContext, useContext, useState, useEffect } from "react";

const JuegosContext = createContext();

export function JuegosProvider({ children }) {
    const [juegos, setJuegos] = useState([]);

    const fetchJuegos = async () => {
        try {
            const res = await fetch("http://localhost:5000/juegos");
            const data = await res.json();
            setJuegos(data);
        } catch (error) {
            console.error("Error al obtener los juegos:", error);
        }
    };

    useEffect(() => {
        fetchJuegos();
    }, []);

    return (
        <JuegosContext.Provider value={{ juegos, fetchJuegos, setJuegos }}>
            {children}
        </JuegosContext.Provider>
    );
}

export function useJuegos() {
    return useContext(JuegosContext);
}
