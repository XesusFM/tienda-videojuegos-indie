"use client";
import { useState } from "react";
import FormularioUsuarios from "@/components/PanelAdmin/FormularioUsuarios";
import TablaUsuarios from "@/components/PanelAdmin/TablaUsuarios";

export default function AdminUsuarios() {
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

    const handleSeleccionarUsuario = (usuario) => {
        setUsuarioSeleccionado(usuario);
    };

    const handleGuardado = () => {
        setUsuarioSeleccionado(null); // Limpiar selección después de guardar
    };

    const handleCancelarEdicion = () => {
        setUsuarioSeleccionado(null);
    };

    return (
        <div className="p-8 bg-gray-900 min-h-screen text-white">
            <h1 className="text-3xl font-bold mb-6">Gestión de Usuarios</h1>

            {/* Pasamos setUsuarioSeleccionado como prop a ambos componentes */}
            <FormularioUsuarios
                usuarioSeleccionado={usuarioSeleccionado}
                setUsuarioSeleccionado={setUsuarioSeleccionado}
                onGuardado={handleGuardado}
                onCancelar={handleCancelarEdicion}
            />

            <TablaUsuarios setUsuarioSeleccionado={setUsuarioSeleccionado} />
        </div>
    );
}
