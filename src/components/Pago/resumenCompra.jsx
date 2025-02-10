"use client";
import { useCarrito } from "@/context/carritoContext";

export function ResumenCompra() {
    const { carrito } = useCarrito();

    // Calcular total del carrito
    const precioTotal = carrito.reduce((total, juego) => total + juego.precio, 0);
    const descuentoTotal = carrito.reduce((total, juego) => total + (juego.precio*(juego.descuento/100) || 0), 0);
    const subtotal = (precioTotal - descuentoTotal).toFixed(2);

    return (
        <div className="bg-[#13162D] text-white p-6 rounded-lg shadow-lg w-full max-w-sm">
            {/* Título */}
            <h2 className="text-lg font-semibold mb-4">Resumen</h2>

            {/* Detalles de la compra */}
            <div className="mb-4 space-y-2">
                <div className="flex justify-between text-gray-300">
                    <span>Precio oficial</span>
                    <span>{precioTotal.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between text-gray-300">
                    <span>Descuento</span>
                    <span className="text-red-400">-{descuentoTotal.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between font-bold mt-2">
                    <span>Subtotal</span>
                    <span className="text-xl">{subtotal}€</span>
                </div>
            </div>

            {/* Botón de pago */}
            <button className="w-full bg-[#FF3366] hover:bg-[#FF1E57] text-white font-bold py-3 rounded-lg flex items-center justify-center transition">
                Proceder con el pago <span className="ml-2">➜</span>
            </button>

            {/* Separador */}
            <div className="border-t border-gray-600 my-4 opacity-50"></div>

            {/* Enlace para seguir comprando */}
            <div className="text-center text-gray-400 text-sm">
                <a href="#" className="hover:text-white flex items-center justify-center">
                    <span className="mr-2">◀</span> Continuar comprando
                </a>
            </div>
        </div>
    );
}
