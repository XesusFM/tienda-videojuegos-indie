"use client";
import { useCarrito } from "@/context/CarritoContext";
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";

export default function ResumenCarrito() {

  const { carrito, eliminarDelCarrito, vaciarCarrito } = useCarrito();

  const aggregatedItems = carrito.reduce((acc, juego) => {
    if (acc[juego.id]) {
      acc[juego.id].quantity += 1;
    } else {
      acc[juego.id] = { ...juego, quantity: 1 };
    }
    return acc;
  }, {});

  const itemsArray = Object.values(aggregatedItems);

  const handleRemoveItem = (id) => {
    Swal.fire({
      icon: "warning",
      title: "Eliminar artículo",
      text: "¿Estás seguro de que quieres eliminar una unidad de este artículo?",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarDelCarrito(id);
        Swal.fire({
          icon: "success",
          title: "Eliminado",
          text: "Se ha eliminado una unidad del artículo.",
          timer: 1000,
          showConfirmButton: false,
        });
      }
    });
  };

  const handleClearCart = () => {
    Swal.fire({
      icon: "warning",
      title: "Vaciar carrito",
      text: "¿Estás seguro de que quieres vaciar el carrito?",
      showCancelButton: true,
      confirmButtonText: "Sí, vaciar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        vaciarCarrito();
        Swal.fire({
          icon: "success",
          title: "Carrito vaciado",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  return (
    <div className="bg-[#13162D] text-white p-6 rounded-lg shadow-lg w-full max-w-lg">
      <h2 className="text-lg font-semibold mb-4">Carrito</h2>
      {itemsArray.length === 0 ? (
        <p className="text-gray-400">El carrito está vacío.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {itemsArray.map((item) => (
              <li key={item.id} className="flex justify-between items-center border-b pb-2">
                <div className="flex flex-col">
                  <span>
                    {item.titulo}{" "}
                    {item.quantity > 1 && (
                      <span className="text-xs text-gray-400">(x{item.quantity})</span>
                    )}
                  </span>
                  <span className="text-sm text-gray-300">{item.precio.toFixed(2)}€ c/u</span>
                </div>
                <button onClick={() => handleRemoveItem(item.id)} className="text-red-500 hover:text-red-700" aria-label="Eliminar artículo">
                  <FaTrash />
                </button>
              </li>
            ))}
          </ul>
          <button onClick={handleClearCart}
            className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded">
            Vaciar carrito
          </button>
        </>
      )}
    </div>
  );
}
