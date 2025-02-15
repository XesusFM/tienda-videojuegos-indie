"use client";
import React from "react";
import Logo from "./Logo";
import LinksNavegacion from "./LinksNavegacion";
import PerfilUsuario from "./PerfilUsuario";
import Carrito from "./Carrito";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export function Header() {
    const { usuario, cerrarSesion } = useAuth();

    return (
        <header className="fixed h-20 top-0 left-0 w-full bg-black bg-opacity-90 p-4 text-white flex justify-between items-center z-50 shadow-md">
            <Logo />
            <LinksNavegacion />
            
            <div className="flex items-center gap-4">
                <Carrito count={1} />
                {usuario ? (
                    <>
                        {usuario.rol === "admin" && (
                            <Link href="/panelAdministrador" className="bg-blue-500 px-4 py-2 rounded">
                                Panel Admin
                            </Link>
                        )}
                        <PerfilUsuario imageUrl={usuario.imageUrl || "/default-avatar.jpg"} />
                        <button onClick={cerrarSesion} className="text-red-500">
                            Cerrar sesión
                        </button>
                    </>
                ) : (
                    <Link href="/login" className="bg-pink-500 px-4 py-2 rounded">
                        Iniciar sesión
                    </Link>
                )}
            </div>
        </header>
    );
}
