
/*
createContext → Crea un contexto global para compartir datos entre componentes sin necesidad de pasar props manualmente.
useContext → Permite que un componente acceda a los valores del contexto.
useState → Maneja el estado local de los usuarios.
useEffect → Ejecuta código cuando el componente se monta (en este caso, para obtener los usuarios del backend).
*/


"use client";
import { createContext, useContext, useState, useEffect } from "react";

const UsuariosContext = createContext(null);

export const UsuariosProvider = ({ children }) => {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        fetchUsuarios();
    }, []);

    const fetchUsuarios = async () => {
        try {
            const res = await fetch("http://localhost:5000/usuarios");
            const data = await res.json();
            setUsuarios(data);
        } catch (error) {
            console.error("Error al obtener usuarios:", error);
        }
    };

    const agregarUsuario = async (nuevoUsuario) => {
        try {
            const res = await fetch("http://localhost:5000/usuarios", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(nuevoUsuario),
            });

            if (res.ok) {
                fetchUsuarios();
            }
        } catch (error) {
            console.error("Error al agregar usuario:", error);
        }
    };

    const editarUsuario = async (id, usuarioActualizado) => {
        try {
            const res = await fetch(`http://localhost:5000/usuarios/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(usuarioActualizado),
            });

            if (res.ok) {
                fetchUsuarios();
            }
        } catch (error) {
            console.error("Error al editar usuario:", error);
        }
    };

    const eliminarUsuario = async (id) => {
        try {
            const res = await fetch(`http://localhost:5000/usuarios/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                fetchUsuarios();
            }
        } catch (error) {
            console.error("Error al eliminar usuario:", error);
        }
    };

    return (
        <UsuariosContext.Provider value={{ usuarios, agregarUsuario, editarUsuario, eliminarUsuario }}>
            {children}
        </UsuariosContext.Provider>
    );
};

export const useUsuarios = () => {
    return useContext(UsuariosContext);
};

export default UsuariosContext;
