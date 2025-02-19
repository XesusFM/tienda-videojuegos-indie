"use client";
import { useJuegos } from "@/context/juegosContext";
import { TarjetaJuego } from "@/components/Juegos/TarjetaJuego";

export function JuegosTienda() {
    const { juegos } = useJuegos();

    return (
        <section className="max-w-6xl mx-auto px-4 py-9">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {juegos.length > 0 ? (
                    juegos.map((juego) => (
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
                    <p className="text-gray-400 text-center">No hay juegos disponibles.</p>
                )}
            </div>
        </section>
    );
}
