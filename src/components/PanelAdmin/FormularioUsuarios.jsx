"use client";
import { useState, useEffect } from "react";
import { useUsuarios } from "@/context/usuariosContext";

export default function FormularioUsuarios({ usuarioSeleccionado, setUsuarioSeleccionado }) {
    const { agregarUsuario, editarUsuario } = useUsuarios();
    const [nombreUsuario, setNombreUsuario] = useState("");
    const [email, setEmail] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [rol, setRol] = useState("usuario");

    useEffect(() => {
        if (usuarioSeleccionado) {
            setNombreUsuario(usuarioSeleccionado.nombre_usuario || "");
            setEmail(usuarioSeleccionado.email || "");
            setContraseña("");
            setRol(usuarioSeleccionado.rol || "usuario");
        } else {
            limpiarFormulario();
        }
    }, [usuarioSeleccionado]);

    const limpiarFormulario = () => {
        setNombreUsuario("");
        setEmail("");
        setContraseña("");
        setRol("usuario");
        setUsuarioSeleccionado(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const usuario = {
            nombre_usuario: nombreUsuario,
            email,
            contraseña: contraseña || usuarioSeleccionado?.contraseña,
            rol
        };

        if (usuarioSeleccionado) {
            await editarUsuario(usuarioSeleccionado.id, usuario);
        } else {
            await agregarUsuario(usuario);
        }

        limpiarFormulario();
    };

    return (
        <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
            <h2 className="text-white text-2xl font-bold mb-4">
                {usuarioSeleccionado ? "Editar Usuario" : "Añadir Usuario"}
            </h2>
            <input
                type="text"
                placeholder="Nombre de usuario"
                value={nombreUsuario}
                onChange={(e) => setNombreUsuario(e.target.value)}
                required
                className="w-full p-3 mb-4 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-orange-500"
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 mb-4 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-orange-500"
            />
            <input
                type="password"
                placeholder="Nueva contraseña (opcional)"
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
                className="w-full p-3 mb-4 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-orange-500"
            />

            <select
                value={rol}
                onChange={(e) => setRol(e.target.value)}
                className="w-full p-3 mb-4 bg-gray-700 text-white rounded-md"
            >
                <option value="usuario">Usuario</option>
                <option value="admin">Administrador</option>
            </select>

            <div className="flex gap-4">
                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-md font-semibold hover:opacity-90 transition"
                >
                    {usuarioSeleccionado ? "Guardar Cambios" : "Registrar"}
                </button>

                {usuarioSeleccionado && (
                    <button
                        type="button"
                        onClick={limpiarFormulario}
                        className="w-full bg-gray-600 text-white py-3 rounded-md font-semibold hover:bg-gray-500 transition"
                    >
                        Cancelar Edición
                    </button>
                )}
            </div>
        </form>
    );
}
