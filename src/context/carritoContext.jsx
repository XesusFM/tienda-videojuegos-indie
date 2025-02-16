"use client";
import { createContext, useContext, useState, useEffect } from "react";
import Swal from "sweetalert2";

const CarritoContext = createContext();

export function CarritoProvider({ children }) {
    const [carrito, setCarrito] = useState([]);

    useEffect(() => {
        const carritoGuardado = localStorage.getItem("carrito");
        if (carritoGuardado) {
            setCarrito(JSON.parse(carritoGuardado));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }, [carrito]);


    function agregarAlCarrito(juego) {
        setCarrito(prevCarrito => [...prevCarrito, juego]);
        Swal.fire({ icon: "success", title: "Juego añadido al carrito" });
    }

    function eliminarDelCarrito(id) {
        setCarrito(prevCarrito => {
            const indice = prevCarrito.findIndex(juego => juego.id === id);
            if (indice === -1) return prevCarrito;
            const nuevoCarrito = [...prevCarrito];
            nuevoCarrito.splice(indice, 1);
            return nuevoCarrito;
        });
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
