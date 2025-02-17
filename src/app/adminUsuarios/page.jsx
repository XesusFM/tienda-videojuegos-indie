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
        setUsuarioSeleccionado(null);
    };

    const handleCancelarEdicion = () => {
        setUsuarioSeleccionado(null);
    };

    return (
        <div className="p-8 bg-gray-900 min-h-screen text-white">

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
