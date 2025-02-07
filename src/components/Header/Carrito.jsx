import { FaShoppingCart } from "react-icons/fa";

const Carrito = ({ count }) => (
    <div className="relative">
        <FaShoppingCart size={35} />
        {count > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
                {count}
            </span>
        )}
    </div>
);

export default Carrito;
