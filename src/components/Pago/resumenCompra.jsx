"use client";
import { useCarrito } from "@/context/carritoContext";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export function ResumenCompra() {
    const { carrito, vaciarCarrito } = useCarrito();
    const { usuario } = useAuth();
    const router = useRouter();

    const precioTotal = carrito.reduce((total, juego) => total + juego.precio, 0);
    const descuentoTotal = carrito.reduce(
        (total, juego) => total + (juego.precio * (juego.descuento / 100) || 0),
        0
    );
    const subtotal = (precioTotal - descuentoTotal).toFixed(2);

    const handlePago = () => {
        if (!usuario) {
            Swal.fire({
                icon: "warning",
                title: "Debes iniciar sesión",
                text: "Por favor, inicia sesión para proceder con el pago.",
                confirmButtonText: "Ir a iniciar sesión",
            }).then((result) => {
                if (result.isConfirmed) {
                    router.push("/login");
                }
            });
            return;
        }
        vaciarCarrito();
        if (carrito.length === 0) {
            Swal.fire({
                icon: "warning",
                title: "El carrito está vacío",
                text: "Por favor, añada juegos al carrito si desea comprarlos.",
                confirmButtonText: "Aceptar",
            })
            return;
        }

        router.push("/checkout");
    };

    return (
        <div className="bg-[#13162D] text-white p-6 rounded-lg shadow-lg w-full max-w-sm">

            <h2 className="text-lg font-semibold mb-4">Resumen</h2>


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

            <button
                onClick={handlePago}
                className="w-full bg-[#FF3366] hover:bg-[#FF1E57] text-white font-bold py-3 rounded-lg flex items-center justify-center transition"
            >
                Proceder con el pago <span className="ml-2">➜</span>
            </button>

        </div>
    );
}
