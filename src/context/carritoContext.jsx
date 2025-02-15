"use client";
import { createContext, useContext, useState, useEffect } from "react";

const CarritoContext = createContext();

export function CarritoProvider({ children }) {
    const [carrito, setCarrito] = useState([]);

    // Cargar el carrito desde el Local Storage al iniciar
    useEffect(() => {
        const carritoGuardado = localStorage.getItem("carrito");
        if (carritoGuardado) {
            setCarrito(JSON.parse(carritoGuardado));
        }
    }, []);

    // Guardar el carrito en el Local Storage cada vez que cambie
    useEffect(() => {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }, [carrito]);

    // Función para agregar un juego al carrito
    function agregarAlCarrito(juego) {
        setCarrito(prevCarrito => [...prevCarrito, juego]);
    }

    // Función para eliminar una unidad del juego (la primera ocurrencia encontrada)
    function eliminarDelCarrito(id) {
        setCarrito(prevCarrito => {
            const indice = prevCarrito.findIndex(juego => juego.id === id);
            if (indice === -1) return prevCarrito;
            const nuevoCarrito = [...prevCarrito];
            nuevoCarrito.splice(indice, 1);
            return nuevoCarrito;
        });
    }

    // Función para vaciar todo el carrito
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
