"use client";
import { useState } from "react";
import Image from "next/image";
import { FaFacebook, FaGoogle, FaApple, FaDiscord } from "react-icons/fa";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        console.log("Iniciando sesión con:", email, password);
    };

    return (
        <div className="flex h-screen">

            <div className="w-1/2 bg-gray-900 flex flex-col justify-center items-center p-8">

                <Image src="/logo.svg" alt="Logo" width={150} height={50} className="mb-8" />

                <h2 className="text-white text-2xl font-bold mb-6">Inicia sesión</h2>
                <div className="flex flex-row gap-4 justify-center">
                    <button className="bg-blue-600 text-white p-3 rounded-lg">
                        <FaFacebook size={25} />
                    </button>

                    <button className="bg-white p-3 rounded-lg">
                        <FaGoogle size={25} />
                    </button>

                    <button className="bg-black text-white p-3 rounded-lg">
                        <FaApple size={25} />
                    </button>

                    <button className="bg-indigo-600 text-white p-3 rounded-lg">
                        <FaDiscord size={25} />
                    </button>
                </div>

                <div className="flex items-center w-full max-w-sm text-gray-400">
                    <div className="flex-grow border-t border-gray-600"></div>
                    <span className="px-2">o</span>
                    <div className="flex-grow border-t border-gray-600"></div>
                </div>

                <form className="w-full max-w-sm mt-6" onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-3 mb-4 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="********"
                        className="w-full p-3 mb-4 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-md text-lg font-semibold hover:opacity-90 transition"
                    >
                        Iniciar sesión
                    </button>
                </form>

                <div className="flex justify-between w-full max-w-sm text-gray-400 mt-4 text-sm">
                    <a href="/register" className="hover:underline">
                        ¿No tienes una cuenta?
                    </a>
                    <a href="/forgot-password" className="hover:underline">
                        ¿Has olvidado tu contraseña?
                    </a>
                </div>
            </div>

            <div className="w-1/2 relative hidden md:block">
                <Image
                    src="/assetto.jpg"
                    alt="Gaming Background"
                    layout="fill"
                    objectFit="cover"
                    className="opacity-90"
                />
            </div>
        </div>
    );
}
