"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaFacebook, FaGoogle, FaApple, FaDiscord } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { iniciarSesion } = useAuth();
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        
        const resultado = await iniciarSesion(email, password);

        if (resultado) {
            router.push("/");
        } else {
            console.error("Inicio de sesión fallido");
        }
    };

    return ( 
<div className="h-screen w-full bg-gray-900 flex flex-col justify-center items-center">
    <Image src="/logo.svg" alt="Logo" width={150} height={50} className="mb-8" />
    <h2 className="text-white text-2xl font-bold mb-6">Crea tu cuenta</h2>

    <div className="flex items-center w-full max-w-sm text-gray-400 my-6">
        <div className="flex-grow border-t border-gray-600"></div>
        <span className="px-2">o</span>
        <div className="flex-grow border-t border-gray-600"></div>
    </div>

    <form className="w-full max-w-sm">
        <input
            type="text"
            placeholder="Nombre"
            className="w-full p-3 mb-4 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
        />
        <input
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-4 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
        />
        <input
            type="password"
            placeholder="Contraseña"
            className="w-full p-3 mb-4 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
        />
        <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-md text-lg font-semibold hover:opacity-90 transition"
        >
            Registrarse
        </button>
    </form>

    <div className="flex justify-between w-full max-w-sm text-gray-400 mt-4 text-sm">
        <a href="/login" className="hover:underline">
            ¿Ya tienes una cuenta? Inicia sesión
        </a>
    </div>
</div>


    );
}
