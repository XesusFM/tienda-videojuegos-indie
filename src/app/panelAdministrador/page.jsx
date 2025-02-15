"use client";
import { useState } from "react";
import { JuegosProvider } from "@/context/juegosContext";
import FormularioJuego from "../../components/PanelAdmin/FormularioJuego";
import TablaJuegos from "../../components/PanelAdmin/TablaJuegos";

export default function PanelAdministrador() {
    const [juegoSeleccionado, setJuegoSeleccionado] = useState(null);

    const handleSeleccionarJuego = (juego) => {
        setJuegoSeleccionado(juego);
    };

    const handleGuardado = () => {
        setJuegoSeleccionado(null);
    };

    return (
        <JuegosProvider>
            <div className="p-6 bg-gray-100 min-h-screen">
                <FormularioJuego juegoSeleccionado={juegoSeleccionado} onGuardado={handleGuardado} />
                <TablaJuegos onSeleccionarJuego={handleSeleccionarJuego} />
            </div>
        </JuegosProvider>
    );
}
