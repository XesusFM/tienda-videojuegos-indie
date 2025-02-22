"use client";
import { JuegosProvider, useJuegos } from "@/context/JuegosContext"; 
import { TarjetaJuego } from "@/components/Juegos/TarjetaJuego";

export function SeccionJuegos() {

    const { juegos } = useJuegos();

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
                    <div className="col-span-1 sm:col-span-2 lg:col-start-2 lg:col-span-1 flex flex-col items-center justify-center py-16">
                        <img src="/nogames.png" alt="Sin juegos disponibles" />
                        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                            ¡Ups! No hay juegos disponibles
                        </h2>
                        <p className="text-gray-500 text-center max-w-md mb-4">
                            Estamos actualizando nuestro catálogo. ¡Vuelve pronto para descubrir nuevos títulos!
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}
