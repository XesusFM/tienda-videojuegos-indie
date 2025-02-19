"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaFacebook, FaGoogle, FaApple, FaDiscord } from "react-icons/fa";
import Swal from "sweetalert2";

export default function Registro() {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleRegistro = async (e) => {
        e.preventDefault();

        try {
            // Obtener lista de usuarios para comprobar si el email ya existe
            const resUsuarios = await fetch("http://localhost:5000/usuarios");
            const usuarios = await resUsuarios.json();

            const usuarioExistente = usuarios.find(u => u.email === email);

            if (usuarioExistente) {
                Swal.fire("Error", "Este correo ya está registrado", "error");
                return;
            }

            // Crear nuevo usuario
            const nuevoUsuario = {
                nombre,
                email,
                password,
                rol: "usuario" 
            };

            const res = await fetch("http://localhost:5000/usuarios", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(nuevoUsuario)
            });

            if (res.ok) {
                Swal.fire("¡Registro exitoso!", "Ahora puedes iniciar sesión", "success");
                router.push("/login"); // Redirigir al login
            } else {
                Swal.fire("Error", "No se pudo registrar el usuario", "error");
            }
        } catch (error) {
            console.error("Error en el registro:", error);
            Swal.fire("Error", "Hubo un problema al procesar tu solicitud", "error");
        }
    };

    return (

            <div className="h-screen w-full bg-gray-900 flex flex-col justify-center items-center p-8">
                <Image src="/logo.svg" alt="Logo" width={150} height={50} className="mb-8" />
                <h2 className="text-white text-2xl font-bold mb-6">Crea tu cuenta</h2>
                
                <div className="flex items-center w-full max-w-sm text-gray-400 my-6">
                    <div className="flex-grow border-t border-gray-600"></div>
                    <span className="px-2">o</span>
                    <div className="flex-grow border-t border-gray-600"></div>
                </div>
                <form className="w-full max-w-sm" onSubmit={handleRegistro}>
                    <input
                        type="text"
                        placeholder="Nombre"
                        className="w-full p-3 mb-4 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-3 mb-4 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        className="w-full p-3 mb-4 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-md text-lg font-semibold hover:opacity-90 transition"
                    >
                        Registrarse
                    </button>
                </form>

                <div className="flex justify-center w-full max-w-sm text-gray-400 mt-4 text-sm">
                    <a href="/login" className="hover:underline">
                        ¿Ya tienes una cuenta? Inicia sesión
                    </a>
                </div>
            </div>
    );
}
