"use client";
import { useEffect, useState } from "react";
import { getJuegos } from "@/services/api";
import { TarjetaJuego } from "@/components/Juegos/TarjetaJuego";

export function SeccionJuegos() {
    const [juegos, setJuegos] = useState([]);

    useEffect(() => {
        async function cargarJuegos() {
            try {
                const data = await getJuegos();
                setJuegos(data);
            } catch (error) {
                console.error("Error cargando juegos:", error);
            }
        }
        cargarJuegos();
    }, []);

    return (
        <section className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-white mb-6">Tendencias</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {juegos.length > 0 ? (
                    juegos.slice(0, 6).map((juego) => (
                        <TarjetaJuego 
                            key={juego.id}
                            titulo={juego.titulo}
                            precio={juego.precio}
                            descuento={juego.descuento}
                            imagen={juego.imagen}
                            enlace={`/juego/${juego.id}`}
                        />
                    ))
                ) : (
                    <p className="text-gray-400">Cargando juegos...</p>
                )}
            </div>
        </section>
    );
}
