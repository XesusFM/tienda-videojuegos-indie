"use client";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useJuegos } from "@/context/juegosContext";

export default function FormularioJuego({ juegoSeleccionado, onGuardado }) {
    const { fetchJuegos } = useJuegos();
    const [titulo, setTitulo] = useState("");
    const [imagen, setImagen] = useState("");
    const [precio, setPrecio] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [categoria, setCategoria] = useState("");
    const [descuento, setDescuento] = useState("");

    // Estado para las categorías provenientes de json-server
    const [categorias, setCategorias] = useState([]);

    // Cargar las categorías desde json-server al montar el componente
    useEffect(() => {
        fetch("http://localhost:5000/categorias")
            .then((response) => response.json())
            .then((data) => setCategorias(data))
            .catch((error) =>
                console.error("Error al cargar las categorías:", error)
            );
    }, []);

    // Actualizar el formulario si se selecciona un juego para editar
    useEffect(() => {
        if (juegoSeleccionado && categorias.length > 0) {
            setTitulo(juegoSeleccionado.titulo || "");
            setImagen(juegoSeleccionado.imagen || "");
            setPrecio(juegoSeleccionado.precio || "");
            setDescripcion(juegoSeleccionado.descripcion || "");
    
            // Verifica que la categoría es un nombre y conviértelo a ID
            const categoriaEncontrada = categorias.find(cat => cat.nombre === juegoSeleccionado.categoria);
            setCategoria(categoriaEncontrada ? categoriaEncontrada.id : juegoSeleccionado.categoria);
    
            setDescuento(juegoSeleccionado.descuento || "");
        } else {
            setTitulo("");
            setImagen("");
            setPrecio("");
            setDescripcion("");
            setCategoria("");
            setDescuento("");
        }
    }, [juegoSeleccionado, categorias]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const juego = {
            titulo,
            imagen,
            precio: parseFloat(precio),
            descripcion,
            categoria: categorias.find(cat => cat.id === categoria)?.nombre || categoria, 
            descuento: parseFloat(descuento),
        };

        try {
            let res;
            let mensaje = "";
            if (juegoSeleccionado && juegoSeleccionado.id) {

                res = await fetch(`http://localhost:5000/juegos/${juegoSeleccionado.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(juego),
                });
                mensaje = "El juego ha sido modificado exitosamente";
            } else {

                res = await fetch("http://localhost:5000/juegos", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(juego),
                });
                mensaje = "El juego se ha agregado exitosamente";
            }

            if (res.ok) {
                Swal.fire({
                    icon: "success",
                    title: juegoSeleccionado ? "Juego modificado" : "Juego agregado",
                    text: mensaje,
                    timer: 1500,
                    showConfirmButton: false,
                });

                fetchJuegos();
                onGuardado();
            } else {
                console.error("Error al guardar el juego");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleCancelar = () => {
        onGuardado();
    };

    return (
        <form
        onSubmit={handleSubmit}
        className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-full max-w-6xl mx-auto"
    >
        <h2 className="text-2xl font-bold mb-4 text-pink-500 text-center">
            {juegoSeleccionado ? "Editar Juego" : "Añadir Nuevo Juego"}
        </h2>
        
        {/* Grid de dos columnas */}
        <div className="grid grid-cols-2 gap-4">
            <input
                type="text"
                placeholder="Título"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded focus:ring-2 focus:ring-pink-500"
                required
            />
            <input
                type="text"
                placeholder="Imagen (URL)"
                value={imagen}
                onChange={(e) => setImagen(e.target.value)}
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded focus:ring-2 focus:ring-pink-500"
                required
            />
            <input
                type="number"
                placeholder="Precio"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded focus:ring-2 focus:ring-pink-500"
                required
                step="0.01"
            />
            <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded focus:ring-2 focus:ring-pink-500"
                required
            >
                <option value="">Selecciona una categoría</option>
                {categorias.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                        {cat.nombre}
                    </option>
                ))}
            </select>
            <input
                type="number"
                placeholder="Descuento (%)"
                value={descuento}
                onChange={(e) => setDescuento(e.target.value)}
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded focus:ring-2 focus:ring-pink-500"
                required
                step="0.01"
            />
        </div>
    
        {/* Segunda fila: la descripción ocupa las dos columnas */}
        <div className="mt-4">
            <textarea
                placeholder="Descripción"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded focus:ring-2 focus:ring-pink-500"
                required
                rows="3"
            />
        </div>
    
        {/* Botones */}
        <div className="flex gap-4 mt-4">
            <button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 p-3 rounded text-white font-bold hover:opacity-80"
            >
                {juegoSeleccionado ? "Guardar Cambios" : "Añadir Juego"}
            </button>
            {juegoSeleccionado && (
                <button
                    type="button"
                    onClick={handleCancelar}
                    className="w-full bg-gray-500 p-3 rounded text-white font-bold hover:opacity-80"
                >
                    Cancelar
                </button>
            )}
        </div>
    </form>
    );
}
