"use client";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useJuegos } from "@/context/juegosContext";

export default function FormularioJuego({ juegoSeleccionado, onGuardado }) {
    const { fetchJuegos } = useJuegos();
    const [titulo, setTitulo] = useState("");
    const [imagen, setImagen] = useState(null);
    const [precio, setPrecio] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [categoria, setCategoria] = useState("");
    const [descuento, setDescuento] = useState("");
    const [categorias, setCategorias] = useState([]);
    const [modoEdicion, setModoEdicion] = useState(false);

    useEffect(() => {
        fetch("http://localhost:5000/categorias")
            .then((response) => response.json())
            .then((data) => setCategorias(data))
            .catch((error) => console.error("Error al cargar las categorías:", error));
    }, []);

    useEffect(() => {
        if (juegoSeleccionado && categorias.length > 0) {
            setTitulo(juegoSeleccionado.titulo || "");
            setPrecio(juegoSeleccionado.precio || "");
            setDescripcion(juegoSeleccionado.descripcion || "");
            const categoriaEncontrada = categorias.find(cat => cat.nombre === juegoSeleccionado.categoria);
            setCategoria(categoriaEncontrada ? categoriaEncontrada.id : juegoSeleccionado.categoria);
            setDescuento(juegoSeleccionado.descuento || "");
            setModoEdicion(true);
        }
    }, [juegoSeleccionado, categorias]);

    const manejarCambioImagen = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setImagen(e.target.files[0]);
        }
    };

    const manejarEnvio = async (e) => {
        e.preventDefault();
        let urlImagen = juegoSeleccionado?.imagen || "";

        if (imagen) {
            const formData = new FormData();
            formData.append("archivo", imagen);
            formData.append("titulo", titulo);

            try {
                const respuestaSubida = await fetch("/api/subir-imagen", {
                    method: "POST",
                    body: formData,
                });

                if (respuestaSubida.ok) {
                    const datos = await respuestaSubida.json();
                    urlImagen = datos.url;
                } else {
                    console.error("Error al subir la imagen");
                    return;
                }
            } catch (error) {
                console.error("Error:", error);
                return;
            }
        }

        const juego = {
            titulo,
            imagen: urlImagen,
            precio: parseFloat(precio),
            descripcion,
            categoria: categorias.find(cat => cat.id === categoria)?.nombre || categoria,
            descuento: parseFloat(descuento),
        };

        try {
            let respuesta;
            let mensaje = "";

            if (modoEdicion && juegoSeleccionado?.id) {
                respuesta = await fetch(`http://localhost:5000/juegos/${juegoSeleccionado.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(juego),
                });
                mensaje = "El juego ha sido modificado exitosamente";
            } else {
                respuesta = await fetch("http://localhost:5000/juegos", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(juego),
                });
                mensaje = "El juego se ha agregado exitosamente";
            }

            if (respuesta.ok) {
                Swal.fire({
                    icon: "success",
                    title: modoEdicion ? "Juego modificado" : "Juego agregado",
                    text: mensaje,
                    timer: 1500,
                    showConfirmButton: false,
                });

                fetchJuegos();
                limpiarFormulario();
                onGuardado();
            } else {
                console.error("Error al guardar el juego");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const limpiarFormulario = () => {
        setTitulo("");
        setImagen(null);
        setPrecio("");
        setDescripcion("");
        setCategoria("");
        setDescuento("");
        setModoEdicion(false);
        onGuardado();
    };

    return (
        <form onSubmit={manejarEnvio} className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-full max-w-6xl mx-auto mb-8">
            <h2 className="text-2xl font-bold mb-4 text-pink-500 text-center">
                {modoEdicion ? "Editar Juego" : "Añadir Nuevo Juego"}
            </h2>

            <div className="grid grid-cols-3 gap-4">

                <input type="text" placeholder="Título" value={titulo} onChange={(e) => setTitulo(e.target.value)}
                    className="w-full p-3 bg-gray-800 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                    required />


                <input type="number" placeholder="Precio" value={precio} onChange={(e) => setPrecio(e.target.value)}
                    className="w-full p-3 bg-gray-800 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                    required step="0.01" />

                <input type="number" placeholder="Descuento (%)" value={descuento} onChange={(e) => setDescuento(e.target.value)}
                    className="w-full p-3 bg-gray-800 border border-gray-600 rounded focus:outline-none focus:outline-none focus:ring-2 focus:ring-pink-500"
                    required step="0.01" />

                <select value={categoria} onChange={(e) => setCategoria(e.target.value)}
                    className="w-full p-3 bg-gray-800 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-pink-500" required >

                    <option value="">Selecciona una categoría</option>

                    {categorias.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.nombre}
                        </option>
                    ))}

                </select>

                <input type="file" accept="image/*" onChange={manejarCambioImagen}
                    className="w-full p-3 bg-gray-800 border border-gray-600 rounded" />

            </div>

            <div className="mt-4">
                <textarea placeholder="Descripción" value={descripcion} onChange={(e) => setDescripcion(e.target.value)}
                    className="w-full p-3 bg-gray-800 border border-gray-600 rounded focus:outline-none focus:outline-none focus:ring-2 focus:ring-pink-500"
                    required rows={3} />
            </div>

            <div className="flex gap-4 mt-4">
                <button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-purple-500 p-3 rounded text-white font-bold hover:opacity-80">
                    {modoEdicion ? "Guardar Cambios" : "Añadir Juego"}
                </button>

                <button type="button" onClick={limpiarFormulario} className="w-full bg-gray-700 p-3 rounded text-white font-bold hover:bg-gray-600">
                    Limpiar Formulario
                </button>

                {modoEdicion && (
                    <button type="button" onClick={limpiarFormulario} className="w-full bg-red-600 p-3 rounded text-white font-bold hover:bg-red-500">
                        Cancelar Edición
                    </button>
                )}

            </div>
        </form>
    );
}
