import { TarjetaJuego } from "@/components/tarjetaJuego";

const juegos = [
    {
        id: 1,
        titulo: "Marvel's Spider-Man 2",
        precio: 44.19,
        descuento: 26,
        imagenUrl: "",
        enlace: "/juego/spiderman-2",
    },
    {
        id: 2,
        titulo: "Cyberpunk 2077",
        precio: 29.99,
        descuento: 50,
        imagenUrl: "",
        enlace: "/juego/cyberpunk-2077",
    },
];

export function SectionJuegos() {
    return (
        <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-white mb-6">Juegos en Tendencia</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {juegos.map((juego) => (
                    <TarjetaJuego key={juego.id} {...juego} />
                ))}
            </div>
        </div>
    );
}
