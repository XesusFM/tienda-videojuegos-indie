"use client";
import { useRouter } from "next/router";
import { createContext, useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";

const ContextoAutenticacion = createContext(null);

export const ProveedorAutenticacion = ({ children }) => {
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        const usuarioGuardado = localStorage.getItem("usuario");
        if (usuarioGuardado) {
            setUsuario(JSON.parse(usuarioGuardado));
        }
    }, []);

    const iniciarSesion = async (email, password) => {
        try {
            const res = await fetch("http://localhost:5000/usuarios");
            const usuarios = await res.json();

            console.log("Usuarios obtenidos:", usuarios);
            console.log("Email ingresado:", email);
            console.log("Password ingresado:", password);

            
            console.log(email, password);

            const usuarioEncontrado = usuarios.find(
                (u) => u.email === email && u.password === password
            );

            if (usuarioEncontrado) {
                setUsuario(usuarioEncontrado);
                localStorage.setItem("usuario", JSON.stringify(usuarioEncontrado));
                return usuarioEncontrado; 
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Usuario o contraseña incorrectos",
                });
                return null;
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Ocurrió un error al iniciar sesión",
            });
            return null;
        }
    };


    const cerrarSesion = () => {
        setUsuario(null);
        localStorage.removeItem("usuario");
        router.push("/"); 
    };

    return (
        <ContextoAutenticacion.Provider value={{ usuario, iniciarSesion, cerrarSesion }}>
            {children}
        </ContextoAutenticacion.Provider>
    );
};


export function useAuth() {
    return useContext(ContextoAutenticacion);
}

export default ContextoAutenticacion;
