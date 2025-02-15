"use client";
import { createContext, useContext, useState, useEffect } from "react";

const CarritoContext = createContext();

export function CarritoProvider({ children }) {
    const [carrito, setCarrito] = useState([]);

    function agregarAlCarrito(juego) {
        setCarrito([...carrito, juego]);
    }

    // Cargar carrito desde Local Storage al iniciar
    useEffect(() => {
        const carritoGuardado = localStorage.getItem("carrito");
        if (carritoGuardado) {
            setCarrito(JSON.parse(carritoGuardado));
        }
    }, []);

    // Guardar carrito en Local Storage al cambiar
    useEffect(() => {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }, [carrito]);

    function agregarAlCarrito(juego) {
        setCarrito(prevCarrito => [...prevCarrito, juego]);
    }

    function eliminarDelCarrito(id) {
        setCarrito(prevCarrito => prevCarrito.filter(juego => juego.id !== id));
    }

    function vaciarCarrito() {
        setCarrito([]);
    }

    return (
        <CarritoContext.Provider value={{ carrito, agregarAlCarrito, eliminarDelCarrito, vaciarCarrito }}>
            {children}
        </CarritoContext.Provider>
    );
}

export function useCarrito() {
    return useContext(CarritoContext);
}
