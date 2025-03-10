import Image from "next/image";
import Link from "next/link";

export function TarjetaJuego({ titulo, precio, descuento, imagen, enlace }) {
    return (
        <Link href={enlace} className="block group">
            <div className="relative overflow-hidden rounded-lg bg-zinc-800 transition-transform transform group-hover:scale-105">
                <Image src={imagen || "/placeholder.svg"} alt={titulo} width={400} height={225}
                    className="w-full h-56 object-cover transition-opacity group-hover:opacity-70" />
                {descuento > 0 && (
                    <span className="absolute bottom-3 left-3 bg-pink-500 text-white text-sm font-bold px-2 py-1 rounded">
                        -{descuento}%
                    </span>
                )}
            </div>

            <div className="mt-2 px-2">
                <h3 className="text-white text-lg font-medium truncate group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-purple-500 group-hover:bg-clip-text group-hover:text-transparent">
                    {titulo}
                </h3>
                <p className="text-white text-xl font-bold">{(precio - (precio * descuento / 100)).toFixed(2)}€</p>
            </div>
        </Link>
    );
}
