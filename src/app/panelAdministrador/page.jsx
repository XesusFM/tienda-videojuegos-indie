"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function PanelAdministrador() {
    const router = useRouter();

    return (
        <div className="h-screen w-full bg-gray-900 flex flex-col justify-center items-center text-white">

            <Image src="/logo.svg" alt="Logo" width={150} height={50} className="mb-8" />

            <h1 className="text-4xl font-bold mb-6">Panel de Administrador</h1>
            <p className="text-gray-400 mb-8">Gestiona los juegos y usuarios de la tienda</p>

            <div className="flex gap-6">

                <button
                    className="bg-gradient-to-r from-blue-500 to-blue-700 hover:opacity-90 text-white px-8 py-4 rounded-lg text-lg font-semibold flex items-center gap-3 shadow-lg transition"
                    onClick={() => router.push("/adminJuegos")}
                >
                    🎮 Administrar Juegos
                </button>

                <button
                    className="bg-gradient-to-r from-purple-500 to-purple-700 hover:opacity-90 text-white px-8 py-4 rounded-lg text-lg font-semibold flex items-center gap-3 shadow-lg transition"
                    onClick={() => router.push("/adminUsuarios")}
                >
                    👤 Administrar Usuarios
                </button>
            </div>

        </div>
    );
}
