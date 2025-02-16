"use client";
import { useEffect, useState } from "react";
import { getJuegos } from "@/services/api"; // Obtener todos los juegos en lugar de solo uno

export function JuegoDestacado() {
    const [juego, setJuego] = useState(null);
    const [backgroundColor, setBackgroundColor] = useState("#111827"); 

    useEffect(() => {
        async function cargarJuegoDestacado() {
            try {
                const juegos = await getJuegos();
                
                if (juegos.length > 0) {
                    const juegoAleatorio = juegos[Math.floor(Math.random() * juegos.length)];
                    setJuego(juegoAleatorio);
                } else {
                    setJuego(null); // No hay juegos, usar imagen por defecto
                }
            } catch (error) {
                console.error("Error cargando el juego destacado:", error);
                setJuego(null); // En caso de error, también usar imagen por defecto
            }
        }

        cargarJuegoDestacado();
    }, []);

    const imagenJuego = juego?.imagen || "/default-game.png"; // Imagen del juego o imagen por defecto

    return (
        <section className="relative w-full h-[500px] flex items-center overflow-hidden" style={{ backgroundColor }}>
            
            <div 
                className="absolute inset-0 bg-cover bg-center clip-path-diagonal"
                style={{ backgroundImage: `url(${imagenJuego})`, filter: "brightness(0.6)" }}
            ></div>

            <div className="absolute bottom-0 left-0 w-full h-[100px] clip-path-background" style={{ backgroundColor }}></div>
            
            <div className="relative z-10 max-w-6xl mx-auto px-6 text-white flex flex-col justify-center h-full mt-20">
                <h2 className="text-4xl font-bold mb-2">
                    {juego ? juego.titulo : "Juego no disponible"}
                </h2>
                {juego && (
                    <div className="flex items-center gap-4">
                        <span className="bg-pink-500 text-white text-sm px-3 py-1 rounded-md font-bold">
                            -{juego.descuento || 0}%
                        </span>
                        <span className="text-3xl font-semibold">{juego.precio ? `${juego.precio}€` : "Gratis"}</span>
                    </div>
                )}
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
