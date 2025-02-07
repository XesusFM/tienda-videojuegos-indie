"use client";
import { createContext, useContext, useState } from "react";

const CarritoContext = createContext();

export function CarritoProvider({ children }) {
    const [carrito, setCarrito] = useState([]);

    // Agregar artículo al carrito
    function agregarAlCarrito(juego) {
        setCarrito([...carrito, juego]);
    }

    return (
        <CarritoContext.Provider value={{ carrito, agregarAlCarrito }}>
            {children}
        </CarritoContext.Provider>
    );
}

// Hook personalizado para acceder al contexto
export function useCarrito() {
    return useContext(CarritoContext);
}
