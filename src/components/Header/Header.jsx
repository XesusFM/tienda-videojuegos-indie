"use client";
import React, { useState } from "react";
import Logo from "./Logo";
import LinksNavegacion from "./LinksNavegacion";
import PerfilUsuario from "./PerfilUsuario";
import Carrito from "./Carrito";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export function Header() {
    const { usuario, cerrarSesion } = useAuth();
    const [menuAbierto, setMenuAbierto] = useState(false);

    return (
        <header className="fixed h-20 top-0 left-0 w-full bg-black bg-opacity-90 p-4 text-white flex justify-between items-center z-50 shadow-md">
            <Logo />
            <LinksNavegacion />

            <div className="flex items-center gap-4 relative">
                <Carrito />
                {usuario ? (
                    <>
                        {usuario.rol === "admin" && (
                            <Link href="/panelAdministrador" className="bg-gradient-to-r from-pink-500 to-purple-500 px-4 py-2 rounded">
                                Panel Admin
                            </Link>
                        )}

                        <div className="relative">
                            <button onClick={() => setMenuAbierto(!menuAbierto)} className="focus:outline-none">
                                <PerfilUsuario imageUrl={"/user.jpg"} />
                            </button>

                            {menuAbierto && (
                                <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg py-2">
                                    <button
                                        onClick={cerrarSesion}
                                        className="block w-full text-left px-4 py-2 text-white hover:bg-gray-700"
                                    >
                                        Cerrar sesión
                                    </button>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="flex items-center gap-4">
                        <Link href="/login" className="bg-gradient-to-r from-pink-500 to-purple-500 px-4 py-2 rounded">
                            Iniciar sesión
                        </Link>
                        <Link href="/registro" className="bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 rounded">
                            Registrarse
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
}
