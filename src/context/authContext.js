import { createContext, useState, useEffect } from "react";

const ContextoAutenticacion = createContext(null);

export const ProveedorAutenticacion = ({ children }) => {
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        const usuarioGuardado = localStorage.getItem("usuario");
        if (usuarioGuardado) setUsuario(JSON.parse(usuarioGuardado));
    }, []);

    const iniciarSesion = async (nombreUsuario, contraseña) => {
        const res = await fetch("http://localhost:5000/usuarios");
        const usuarios = await res.json();
        const usuarioEncontrado = usuarios.find(
            (u) => u.nombre_usuario === nombreUsuario && u.contraseña === contraseña
        );

        if (usuarioEncontrado) {
            setUsuario(usuarioEncontrado);
            localStorage.setItem("usuario", JSON.stringify(usuarioEncontrado));
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

export default ContextoAutenticacion;
