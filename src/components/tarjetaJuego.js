import Image from "next/image";
import Link from "next/link";

export function TarjetaJuego({ titulo, precio, descuento, imagenUrl, enlace }) {
    return (
        <Link href={enlace} className="block group">
            <div className="relative overflow-hidden rounded-lg bg-zinc-800 transition-transform transform group-hover:scale-105">
                {/* Imagen del juego con efecto de opacidad al hacer hover */}
                <Image
                    src={imagenUrl || "/placeholder.svg"}
                    alt={titulo}
                    width={400}
                    height={225}
                    className="w-full h-56 object-cover transition-opacity group-hover:opacity-70"
                />

                {/* Descuento */}
                {descuento > 0 && (
                    <span className="absolute bottom-3 left-3 bg-orange-500 text-white text-sm font-bold px-2 py-1 rounded">
                        -{descuento}%
                    </span>
                )}
            </div>

            {/* Información del juego */}
            <div className="mt-2 px-2">
                <h3 className="text-white text-lg font-medium truncate group-hover:text-orange-500">
                    {titulo}
                </h3>
                <p className="text-white text-xl font-bold">{precio.toFixed(2)}€</p>
            </div>
        </Link>
    );
}
