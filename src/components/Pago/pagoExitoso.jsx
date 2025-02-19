"use client";

import { useRouter } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa";

const PagoExitoso = () => {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-dark">
            <div className="bg-[#12172b] text-white p-8 rounded-lg shadow-lg text-center">
                <FaCheckCircle className="text-green-400 text-6xl mx-auto mb-4" />
                <h1 className="text-3xl font-bold">¡Pago Exitoso!</h1>
                <p className="text-lg mt-2 text-gray-400">
                    Tu compra se ha realizado correctamente.
                </p>
                <button className="mt-6 bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-6 rounded"
                    onClick={() => router.push("/tienda")}>
                    Volver a la tienda
                </button>
            </div>
        </div>
    );
};

export default PagoExitoso;
