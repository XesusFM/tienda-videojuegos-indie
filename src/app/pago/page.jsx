"use client";
import { useCarrito } from "@/context/carritoContext";
import { ResumenCompra } from "@/components/Pago/resumenCompra";


export default function Carrito() {
    const { carrito } = useCarrito();

    return (
        <main>
            <div className="flex flex-col lg:flex-row justify-center items-start min-h-screen bg-[#0D0F22] p-6 gap-6">
                {/* Lista de juegos en el carrito */}
                <div className="bg-[#13162D] text-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                    <h2 className="text-lg font-semibold mb-4">Carrito</h2>
                    {carrito.length === 0 ? (
                        <p className="text-gray-400">El carrito está vacío.</p>
                    ) : (
                        <ul className="space-y-4">
                            {carrito.map((juego, index) => (
                                <li key={index} className="flex justify-between border-b pb-2">
                                    <span>{juego.titulo}</span>
                                    <span>{juego.precio.toFixed(2)}€</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Resumen de la compra */}
                <ResumenCompra />
            </div>

        </main>
    );
}
