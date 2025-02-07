"use client";
import React from "react";
import Logo from "./Logo";
import LinksNavegacion from "./LinksNavegacion";
import PerfilUsuario from "./PerfilUsuario";
import Carrito from "./Carrito";

export function Header() {
    return (
        <header className="fixed top-0 left-0 w-full bg-black bg-opacity-90 p-4 text-white flex justify-between items-center z-50 shadow-md">
            <Logo />
            <LinksNavegacion />
            <div className="flex items-center gap-4">
                <Carrito count={1} />
                <PerfilUsuario imageUrl="/axiom-verge.jpg" />
            </div>
        </header>
    );
}

