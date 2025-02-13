"use client";
import { createContext, useState, useEffect, useContext } from "react";

const ContextoAutenticacion = createContext(null);

export const ProveedorAutenticacion = ({ children }) => {
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        const usuarioGuardado = localStorage.getItem("usuario");
        if (usuarioGuardado) {
            setUsuario(JSON.parse(usuarioGuardado));
        }
    }, []);

    const iniciarSesion = async (email, contraseña) => {
        try {
            const res = await fetch("http://localhost:5000/usuarios");
            const usuarios = await res.json();

            const usuarioEncontrado = usuarios.find(
                (u) => u.email === email && u.contraseña === contraseña
            );

            if (usuarioEncontrado) {
                setUsuario(usuarioEncontrado);
                localStorage.setItem("usuario", JSON.stringify(usuarioEncontrado));
            } else {
                console.error("Usuario o contraseña incorrectos.");
            }
        } catch (error) {
            console.error("Error al autenticar usuario:", error);
        }
    };

    const cerrarSesion = () => {
        setUsuario(null);
        localStorage.removeItem("usuario");
    };

    return (
        <ContextoAutenticacion.Provider value={{ usuario, iniciarSesion, cerrarSesion }}>
            {children}
        </ContextoAutenticacion.Provider>
    );
};

// Hook personalizado para acceder al contexto
export function useAuth() {
    return useContext(ContextoAutenticacion);
}

export default ContextoAutenticacion;
