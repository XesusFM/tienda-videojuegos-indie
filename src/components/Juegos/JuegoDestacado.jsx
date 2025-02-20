"use client";
import { useEffect, useState } from "react";
import { getJuegos } from "@/services/api";

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
                    setJuego(null);
                }
            } catch (error) {
                console.error("Error cargando el juego destacado:", error);
                setJuego(null);
            }
        }

        cargarJuegoDestacado();
    }, []);

    const imagenJuego = juego?.imagen || "/default-game.png";

    return (
        <section className="relative w-full h-[500px] flex items-center overflow-hidden" style={{ backgroundColor }}>

            <div className="absolute inset-0 bg-cover bg-center clip-path-diagonal" style={{ backgroundImage: `url(${imagenJuego})`, filter: "brightness(0.6)" }}>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-[100px] clip-path-background" style={{ backgroundColor }}></div>
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
