"use client";
import React from "react";
import Logo from "./Logo";
import LinksNavegacion from "./LinksNavegacion";
import PerfilUsuario from "./PerfilUsuario";
import Carrito from "./Carrito";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";

export function Header() {
    const { usuario, cerrarSesion } = useAuth();

    return (
        <header className="fixed h-20 top-0 left-0 w-full bg-black bg-opacity-90 p-4 text-white flex justify-between items-center z-50 shadow-md">
            <Logo />
            <LinksNavegacion />
            
            <div className="flex items-center gap-4">
                
                {usuario ? (
                    <>
                        {usuario.rol === "admin" && (
                            <Link href="/panelAdministrador" className="bg-gradient-to-r from-pink-500 to-purple-500 px-4 py-2 rounded">
                                Panel Admin
                            </Link>
                        )}
                        <Carrito count={1} />
                        <FaHeart size={20} className="text-white" />
                        <PerfilUsuario imageUrl={usuario.imageUrl || "/uploads/Portal.jpg"} />
                        <button onClick={cerrarSesion} className="bg-gradient-to-r from-pink-500 to-purple-500 px-4 py-2 rounded mr-4">
                            Cerrar sesión
                        </button>
                    </>
                ) : (
                    <section>
                        
                        <Link href="/login" className="bg-gradient-to-r from-pink-500 to-purple-500 px-4 py-2 rounded mr-4">
                            Iniciar sesión
                        </Link> 
                        <Link href="/registro" className="bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 rounded">
                            Registrarse
                        </Link>
                    </section>
                )}
            </div>
        </header>
    );
}
