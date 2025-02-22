"use client";
import { createContext, useContext, useState, useEffect } from "react";

const BASE_URL = "http://localhost:5000";
const JuegosContext = createContext();

export function JuegosProvider({ children }) {
    const [juegos, setJuegos] = useState([]);

    const fetchJuegos = async () => {
        try {
            const res = await fetch(`${BASE_URL}/juegos`);
            if (!res.ok) throw new Error("Error al obtener los juegos");
            const data = await res.json();
            setJuegos(data);
        } catch (error) {
            console.error("Error al obtener los juegos:", error);
        }
    };

    const getJuegoById = async (id) => {
        const juegoExistente = juegos.find(j => j.id === id);
        if (juegoExistente) return juegoExistente;

        try {
            const res = await fetch(`${BASE_URL}/juegos/${id}`);
            if (!res.ok) throw new Error("Juego no encontrado");
            return await res.json();
        } catch (error) {
            console.error("Error al obtener el juego:", error);
            return null;
        }
    };

    useEffect(() => {
        fetchJuegos();
    }, []);

    return (
        <JuegosContext.Provider value={{ juegos, setJuegos, fetchJuegos, getJuegoById }}>
            {children}
        </JuegosContext.Provider>
    );
}

export function useJuegos() {
    return useContext(JuegosContext);
}
