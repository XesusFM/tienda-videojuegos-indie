"use client";
import { useEffect, useState } from "react";
import { useCarrito } from "@/context/carritoContext";
import { getJuegoById } from "@/services/api";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { useParams } from "next/navigation";
import { JuegoDestacadoCompra } from "@/components/SeccionJuegos/JuegoDestacadoCompra";

export default function PaginaJuego({ params }) {
    const { id } = useParams();
    const [juego, setJuego] = useState(null);
    const { agregarAlCarrito } = useCarrito();

    useEffect(() => {
        async function cargarJuego() {
            try {
                const data = await getJuegoById(id);
                setJuego(data);
            } catch (error) {
                console.error("Error cargando el juego:", error);
            }
        }
        cargarJuego();
    }, [id]);

    if (!juego) {
        return <p className="text-gray-400 text-center mt-10">Cargando juego...</p>;
    }

    return (
        <main className="bg-gray-900 min-h-screen relative"> 

        <div className="inset-0 z-0">
        <JuegoDestacadoCompra id={id} />
        </div>
            <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 -mt-52">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

                    <div className="bg-gray-900 p-4 rounded-lg">
                        <img src={juego.imagen} alt={juego.titulo} className="w-full rounded-lg" />
                    </div>

                    <div className="bg-gray-800 p-6 rounded-lg text-white">
                        <h1 className="text-3xl font-bold">{juego.titulo}</h1>

                        <div className="flex items-center gap-4 mt-4">
                            <span className="bg-pink-500 text-white text-sm px-3 py-1 rounded-md font-bold">-{juego.descuento}%</span>
                            <span className="text-xl line-through text-gray-400">{(juego.precio / (1 - juego.descuento / 100)).toFixed(2)}€</span>
                            <span className="text-3xl font-semibold">{juego.precio}€</span>
                        </div>

                        <div className="mt-6 flex gap-4">
                            <select className="bg-gray-700 text-white p-2 rounded">
                                <option>PC</option>
                                <option>PlayStation</option>
                                <option>Xbox</option>
                            </select>
                            <select className="bg-gray-700 text-white p-2 rounded">
                                <option>Standard Edición</option>
                                <option>Deluxe Edición</option>
                            </select>
                        </div>

                        <div className="mt-6 flex gap-4">
                            <button className="bg-gray-700 p-3 rounded-full">
                                <FaHeart size={20} className="text-white" />
                            </button>
                            <button
                                className="bg-pink-500 text-white flex items-center gap-2 px-6 py-3 rounded-md text-lg font-bold"
                                onClick={() => agregarAlCarrito(juego)}
                            >
                                <FaShoppingCart /> Añadir a la cesta
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
