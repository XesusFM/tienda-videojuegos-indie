"use client";
import { useState, useEffect } from "react";
import { useUsuarios } from "@/context/UsuariosContext";
import Swal from "sweetalert2";

export default function FormularioUsuarios({ usuarioSeleccionado, setUsuarioSeleccionado }) {
    const { agregarUsuario, editarUsuario } = useUsuarios();
    const [nombreUsuario, setNombreUsuario] = useState("");
    const [email, setEmail] = useState("");
    const [password, setContrasena] = useState("");
    const [rol, setRol] = useState("usuario");

    useEffect(() => {
        if (usuarioSeleccionado) {
            setNombreUsuario(usuarioSeleccionado.nombre || "");
            setEmail(usuarioSeleccionado.email || "");
            setContrasena(""); // No mostrar la contraseña anterior por seguridad
            setRol(usuarioSeleccionado.rol || "usuario");
        } else {
            limpiarFormulario();
        }
    }, [usuarioSeleccionado]);

    const validarCorreo = (correo) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(correo);
    };

    const validarContraseña = (password) => {
        return /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
    };

    const limpiarFormulario = () => {
        setNombreUsuario("");
        setEmail("");
        setContrasena("");
        setRol("usuario");
        setUsuarioSeleccionado(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validarCorreo(email)) {
            Swal.fire("Error", "Introduce un correo válido.", "error");
            return;
        }

        if (!usuarioSeleccionado && !validarContraseña(password)) {
            Swal.fire("Error", "La contraseña debe tener al menos 8 caracteres, una mayúscula y un número.", "error");
            return;
        }

        const usuario = {
            nombre: nombreUsuario,
            email,
            password: password || usuarioSeleccionado?.password, // Mantener la contraseña anterior si no la cambian
            rol
        };

        try {
            if (usuarioSeleccionado) {
                await editarUsuario(usuarioSeleccionado.id, usuario);
                Swal.fire("Éxito", "Usuario editado correctamente", "success");
            } else {
                await agregarUsuario(usuario);
                Swal.fire("Éxito", "Usuario registrado correctamente", "success");
            }

            limpiarFormulario();
        } catch (error) {
            console.error("Error al guardar usuario:", error);
            Swal.fire("Error", "Hubo un problema al guardar el usuario.", "error");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
            <h2 className="text-white text-2xl font-bold mb-4">
                {usuarioSeleccionado ? "Editar Usuario" : "Añadir Usuario"}
            </h2>
            
            <input type="text" placeholder="Nombre de usuario" value={nombreUsuario} onChange={(e) => setNombreUsuario(e.target.value)}
                required className="w-full p-3 mb-4 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-pink-500"/>

            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required
                className="w-full p-3 mb-4 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-pink-500"/>

            <input type="password" placeholder="Nueva contraseña (opcional)" value={password} onChange={(e) => setContrasena(e.target.value)}
                className="w-full p-3 mb-4 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-pink-500"/>

            <select value={rol} onChange={(e) => setRol(e.target.value)} className="w-full p-3 mb-4 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-pink-500">
                <option value="usuario">Usuario</option>
                <option value="admin">Administrador</option>
            </select>

            <div className="flex gap-4">
                <button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-md font-semibold hover:opacity-90 transition">
                    {usuarioSeleccionado ? "Guardar Cambios" : "Registrar"}
                </button>

                {usuarioSeleccionado && (
                    <button type="button" onClick={limpiarFormulario} className="w-full bg-gray-600 text-white py-3 rounded-md font-semibold hover:bg-gray-500 transition">
                        Cancelar Edición
                    </button>
                )}
            </div>
        </form>
    );
}
