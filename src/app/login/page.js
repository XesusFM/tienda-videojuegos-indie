import { useState, useContext } from "react";
import ContextoAutenticacion from "../../context/authContext";

export default function IniciarSesion() {
    const { iniciarSesion } = useContext(ContextoAutenticacion);
    const [nombreUsuario, setNombreUsuario] = useState("");
    const [contraseña, setContraseña] = useState("");

    const manejarEnvio = (e) => {
        e.preventDefault();
        iniciarSesion(nombreUsuario, contraseña);
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <form onSubmit={manejarEnvio} className="bg-white p-6 rounded shadow-md">
                <h2 className="text-lg font-bold mb-4">Iniciar sesión</h2>
                <input
                    type="text"
                    placeholder="Nombre de usuario"
                    value={nombreUsuario}
                    onChange={(e) => setNombreUsuario(e.target.value)}
                    className="w-full mb-2 p-2 border"
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={contraseña}
                    onChange={(e) => setContraseña(e.target.value)}
                    className="w-full mb-2 p-2 border"
                />
                <button className="bg-blue-500 text-white p-2 rounded w-full">
                    Iniciar sesión
                </button>
            </form>
        </div>
    );
}
