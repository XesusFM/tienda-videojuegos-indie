"use client";
import { useEffect, useState } from "react";
import { useJuegos } from "@/context/JuegosContext"; 

export function JuegoDestacadoCompra({ id }) {
    const { getJuegoById } = useJuegos(); 
    const [juego, setJuego] = useState(null);

    useEffect(() => {
        async function cargarJuegoDestacado() {
            const data = await getJuegoById(id); 
            setJuego(data);
        }
        cargarJuegoDestacado();
    }, [id]);

    if (!juego) {
        return <p className="text-gray-400 text-center mt-10">Cargando juego destacado...</p>;
    }

    return (
        <section className="relative w-full h-[500px] flex items-center overflow-hidden">
            <div  className="absolute inset-0 bg-cover bg-center clip-path-diagonal" style={{ backgroundImage: `url(${juego.imagen})`, filter: "brightness(0.6)" }}>
            </div>

            <style jsx>{`
                .clip-path-diagonal {
                    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 85%);
                }
            `}</style>
        </section>
    );
}
