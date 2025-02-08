"use client";
import { useEffect, useState } from "react";
import { getJuegoById } from "@/services/api";

export function JuegoDestacado() {
    const [juego, setJuego] = useState(null);
    const [backgroundColor, setBackgroundColor] = useState("#111827"); 

    useEffect(() => {
        async function cargarJuegoDestacado() {
            try {
                const data = await getJuegoById(5);
                setJuego(data);
            } catch (error) {
                console.error("Error cargando el juego destacado:", error);
            }
        }
        cargarJuegoDestacado();
    }, []);

    if (!juego) {
        return <p className="text-gray-400 text-center mt-10">Cargando juego destacado...</p>;
    }

    return (
        <section className="relative w-full h-[500px] flex items-center overflow-hidden" style={{ backgroundColor }}>

            <div 
                className="absolute inset-0 bg-cover bg-center clip-path-diagonal"
                style={{ backgroundImage: `url(${juego.imagen})`, filter: "brightness(0.6)" }}
            ></div>

            <div className="absolute bottom-0 left-0 w-full h-[100px] clip-path-background" style={{ backgroundColor }}></div>
            
            <div className="relative z-10 max-w-6xl mx-auto px-6 text-white flex flex-col justify-center h-full mt-20">
                <h2 className="text-4xl font-bold mb-2">{juego.titulo}</h2>
                <div className="flex items-center gap-4">
                    <span className="bg-pink-500 text-white text-sm px-3 py-1 rounded-md font-bold">-{juego.descuento}%</span>
                    <span className="text-3xl font-semibold">{juego.precio}€</span>
                </div>
            </div>

            <style jsx>{`
                .clip-path-diagonal {
                    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 85%);
                }
                .clip-path-background {
                    clip-path: polygon(0 85%, 100% 100%, 100% 100%, 0 100%);
                }
            `}</style>
        </section>
    );
}
