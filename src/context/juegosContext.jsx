"use client";
import { createContext, useContext, useState, useEffect } from "react";

const BASE_URL = "http://localhost:5000";
const JuegosContext = createContext();

export function JuegosProvider({ children }) {
    const [juegos, setJuegos] = useState([]);

    // Obtiene todos los juegos y los guarda en el estado
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

    // Obtiene un juego por ID, revisa si ya está en el estado antes de hacer fetch
    const getJuegoById = async (id) => {
        // 1️⃣ Buscar primero en `juegos` para evitar hacer `fetch` si ya está en memoria
        const juegoExistente = juegos.find(j => j.id === id);
        if (juegoExistente) return juegoExistente;

        // 2️⃣ Si no está en el estado, hacer una petición a la API
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
        <JuegosContext.Provider value={{ juegos, fetchJuegos, getJuegoById }}>
            {children}
        </JuegosContext.Provider>
    );
}

export function useJuegos() {
    return useContext(JuegosContext);
}
