"use client";
import { useUsuarios } from "@/context/UsuariosContext";
import { useState } from "react";
import Swal from "sweetalert2";

export default function TablaUsuarios({ setUsuarioSeleccionado }) {
    const { usuarios, eliminarUsuario } = useUsuarios();
    const [paginaActual, setPaginaActual] = useState(1);
    const elementosPorPagina = 5;

    const indiceUltimo = paginaActual * elementosPorPagina;
    const indicePrimero = indiceUltimo - elementosPorPagina;
    const usuariosPaginados = usuarios.slice(indicePrimero, indiceUltimo);
    const totalPaginas = Math.ceil(usuarios.length / elementosPorPagina);

    const handleEliminar = (id) => {
        Swal.fire({
            icon: "warning",
            title: "Eliminar Usuario",
            text: "¿Estás seguro de eliminar este usuario?",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await eliminarUsuario(id);
                Swal.fire("Eliminado", "El usuario ha sido eliminado", "success");
            }
        });
    };

    return (
        <div className="overflow-x-auto bg-gray-800 p-6 rounded-lg shadow-lg mt-6">
            <table className="w-full text-white text-center">
                <thead>
                    <tr className="bg-gray-700 text-lg">
                        <th className="py-3">ID</th>
                        <th className="py-3">Nombre</th>
                        <th className="py-3">Email</th>
                        <th className="py-3">Rol</th>
                        <th className="py-3">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuariosPaginados.map((usuario) => (
                        <tr key={usuario.id} className="border-t border-gray-600">
                            <td className="py-3">{usuario.id}</td>
                            <td className="py-3">{usuario.nombre_usuario}</td>
                            <td className="py-3">{usuario.email}</td>
                            <td className="py-3">{usuario.rol}</td>

                            <td className="py-3 flex justify-center gap-3">
                                <button onClick={() => setUsuarioSeleccionado(usuario)} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-400 transition">
                                    Editar
                                </button>
                                <button onClick={() => handleEliminar(usuario.id)} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-400 transition">
                                    Eliminar
                                </button>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex justify-center items-center mt-4 gap-4">
                <button onClick={() => setPaginaActual((prev) => Math.max(prev - 1, 1))} disabled={paginaActual === 1}
                    className="px-4 py-2 bg-gray-600 text-white rounded-md disabled:opacity-50">
                    Anterior
                </button>
                <span>
                    Página {paginaActual} de {totalPaginas}
                </span>
                <button onClick={() => setPaginaActual((prev) => Math.min(prev + 1, totalPaginas))} disabled={paginaActual === totalPaginas}
                    className="px-4 py-2 bg-gray-600 text-white rounded-md disabled:opacity-50">
                    Siguiente
                </button>
            </div>
        </div>
    );
}
