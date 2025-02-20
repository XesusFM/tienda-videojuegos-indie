"use client";
import { useState } from "react";
import { useJuegos } from "@/context/JuegosContext";
import Swal from "sweetalert2";

export default function TablaJuegos({ onSeleccionarJuego }) {
    const { juegos, fetchJuegos } = useJuegos();
    const [sortField, setSortField] = useState("");
    const [sortOrder, setSortOrder] = useState("asc"); 

    const handleSort = (field) => {
        if (sortField === field) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {

            setSortField(field);
            setSortOrder("asc");
        }
    };

    const sortedJuegos = sortField
        ? [...juegos].sort((a, b) => {
            let fieldA = a[sortField];
            let fieldB = b[sortField];
            if (typeof fieldA === "string") {
                fieldA = fieldA.toLowerCase();
                fieldB = fieldB.toLowerCase();
            }
            if (fieldA < fieldB) return sortOrder === "asc" ? -1 : 1;
            if (fieldA > fieldB) return sortOrder === "asc" ? 1 : -1;
            return 0;
        })
        : juegos;

        const handleEliminar = (juego) => {
        
            if (!juego || !juego.id || typeof juego.id !== "string") {
                Swal.fire("Error", "ID del juego no válido", "error");
                return;
            }
        
            const juegoId = juego.id;
        
            Swal.fire({
                icon: "warning",
                title: "Eliminar Juego",
                text: "¿Estás seguro de eliminar este juego?",
                showCancelButton: true,
                confirmButtonText: "Sí, eliminar",
                cancelButtonText: "Cancelar",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                    
                        const res = await fetch(`http://localhost:5000/juegos/${juegoId}`, {
                            method: "DELETE",
                        });
        
                        if (!res.ok) {
                            throw new Error("No se pudo eliminar el juego del servidor");
                        }
        
                        if (juego.imagen) {
                            const resImg = await fetch("/api/eliminar-imagen", {
                                method: "DELETE",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ imagen: juego.imagen }),
                            });
        
                            if (!resImg.ok) {
                                console.warn("La imagen no pudo ser eliminada.");
                            }
                        }
        
                        Swal.fire("Eliminado", "El juego ha sido eliminado", "success");
                        await fetchJuegos(); 
        
                    } catch (error) {
                        console.error("Error al eliminar el juego:", error);
                        Swal.fire("Error", "Hubo un problema al eliminar el juego", "error");
                    }
                }
            });
        };
        

    return (
        <div className="overflow-x-auto bg-gray-900 p-6 rounded-lg shadow-lg text-white">
            <table className="min-w-full table-fixed border border-gray-700">
                <thead>
                    <tr className="bg-gray-800 text-pink-400">
                        <th
                            className="w-12 px-4 py-2 text-center cursor-pointer"
                            onClick={() => handleSort("id")}
                        >
                            ID {sortField === "id" && (sortOrder === "asc" ? "▲" : "▼")}
                        </th>
                        <th
                            className="w-32 px-4 py-2 text-center cursor-pointer"
                            onClick={() => handleSort("titulo")}
                        >
                            Título {sortField === "titulo" && (sortOrder === "asc" ? "▲" : "▼")}
                        </th>
                        <th className="w-24 px-4 py-2 text-center">Imagen</th>
                        <th
                            className="w-24 px-4 py-2 text-center cursor-pointer"
                            onClick={() => handleSort("precio")}
                        >
                            Precio {sortField === "precio" && (sortOrder === "asc" ? "▲" : "▼")}
                        </th>
                        <th
                            className="w-48 px-4 py-2 text-center cursor-pointer"
                            onClick={() => handleSort("descripcion")}
                        >
                            Descripción{" "}
                            {sortField === "descripcion" && (sortOrder === "asc" ? "▲" : "▼")}
                        </th>
                        <th
                            className="w-32 px-4 py-2 text-center cursor-pointer"
                            onClick={() => handleSort("categoria")}
                        >
                            Categoría{" "}
                            {sortField === "categoria" && (sortOrder === "asc" ? "▲" : "▼")}
                        </th>
                        <th
                            className="w-24 px-4 py-2 text-center cursor-pointer"
                            onClick={() => handleSort("descuento")}
                        >
                            Descuento{" "}
                            {sortField === "descuento" && (sortOrder === "asc" ? "▲" : "▼")}
                        </th>
                        <th className="w-32 px-4 py-2 text-center">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedJuegos.map((juego) => (
                        <tr key={juego.id} className="border-t border-gray-700">
                            <td className="px-4 py-2 text-center">{juego.id}</td>
                            <td className="px-4 py-2 text-center">{juego.titulo}</td>
                            <td className="px-4 py-2 text-center">
                                <img
                                    src={juego.imagen}
                                    alt={juego.titulo}
                                    className="w-16 rounded mx-auto"
                                />
                            </td>
                            <td className="px-4 py-2 text-center">
                                {juego.precio.toFixed(2)}€
                            </td>
                            <td className="px-4 py-2 text-center">{juego.descripcion}</td>
                            <td className="px-4 py-2 text-center">{juego.categoria}</td>
                            <td className="px-4 py-2 text-center">{juego.descuento}%</td>
                            <td className="px-4 py-2 text-center">
                                <button
                                    onClick={() => onSeleccionarJuego(juego)}
                                    className="bg-green-500 px-3 py-1 rounded text-white hover:bg-green-600 mr-2"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => handleEliminar(juego)}
                                    className="bg-red-500 px-3 py-1 rounded text-white hover:bg-red-600"
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
