"use client";
import { useState, useEffect } from "react";
import { useJuegos } from "@/context/JuegosContext";

export function Filtros() {
    const { juego, setJuegos, fetchJuegos } = useJuegos();
    const [categorias, setCategorias] = useState([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
    const [precioMin, setPrecioMin] = useState("");
    const [precioMax, setPrecioMax] = useState("");
    const [descuentoMin, setDescuentoMin] = useState("");

    useEffect(() => {
        fetch("http://localhost:5000/categorias")
            .then((res) => res.json())
            .then((data) => setCategorias(data))
            .catch((error) => console.error("Error al cargar categorías:", error));
    }, []);

    const aplicarFiltros = async () => {
        try {
            let url = "http://localhost:5000/juegos";
            const res = await fetch(url);
            let data = await res.json();

            if (categoriaSeleccionada) {
                data = data.filter((juego) => juego.categoria === categoriaSeleccionada);
            }

            if (precioMin) {
                data = data.filter((juego) =>
                    juego.precio * (1 - juego.descuento / 100) >= parseFloat(precioMin)
                );
            }

            if (precioMax) {
                data = data.filter((juego) =>
                    juego.precio * (1 - juego.descuento / 100) <= parseFloat(precioMax)
                );
            }

            if (descuentoMin) {
                data = data.filter((juego) =>
                    juego.descuento >= parseFloat(descuentoMin)
                );
            }

            setJuegos(data);
        } catch (error) {
            console.error("Error al filtrar juegos:", error);
        }
    };

    const limpiarFiltros = () => {
        setCategoriaSeleccionada("");
        setPrecioMin("");
        setPrecioMax("");
        setDescuentoMin("");
        fetchJuegos();
    };

    return (
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg text-white flex flex-wrap items-center gap-4">

            <select value={categoriaSeleccionada} onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                className="p-3 bg-gray-700 border border-gray-600 rounded focus:ring-2 focus:ring-pink-500 w-full sm:w-auto flex-grow"
            >
                <option value="">Todas las categorías</option>
                {categorias.map((cat) => (
                    <option key={cat.id} value={cat.nombre}>
                        {cat.nombre}
                    </option>
                ))}
            </select>

            <input type="number" placeholder="Precio mínimo" value={precioMin} onChange={(e) => setPrecioMin(e.target.value)}
                className="p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 w-full sm:w-36 flex-grow" />

            <input type="number" placeholder="Precio máximo" value={precioMax} onChange={(e) => setPrecioMax(e.target.value)}
                className="p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 w-full sm:w-36 flex-grow" />

            <input type="number" placeholder="Descuento mínimo (%)" value={descuentoMin} onChange={(e) => setDescuentoMin(e.target.value)}
                className="p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 w-full sm:w-36 flex-grow" />

            <div className="flex gap-2">
                <button onClick={aplicarFiltros}
                    className="bg-gradient-to-r from-pink-500 to-purple-500 px-4 py-3 rounded text-white font-bold hover:opacity-80 transition">
                    Aplicar Filtros
                </button>
                <button onClick={limpiarFiltros}
                    className="bg-gray-700 px-4 py-3 rounded text-white font-bold hover:bg-gray-600 transition">
                    Limpiar
                </button>
            </div>
        </div>
    );

}

export default Filtros;
