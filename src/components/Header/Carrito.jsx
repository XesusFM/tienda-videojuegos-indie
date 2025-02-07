import { FaShoppingCart } from "react-icons/fa";
import { useCarrito } from "@/context/carritoContext";

const Carrito = () => {
    const { carrito } = useCarrito();

    return (
        <div className="relative">
            <FaShoppingCart size={30} />
            {carrito.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2">
                    {carrito.length}
                </span>
            )}
        </div>
    );
};

export default Carrito;
