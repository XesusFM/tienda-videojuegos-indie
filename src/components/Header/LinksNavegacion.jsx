import { FaSearch } from "react-icons/fa";
import Link from "next/link";

const LinksNavegacion = () => (
    <nav className="flex items-center gap-6 text-gray-300">
        <Link href="/" className="group flex items-center space-x-2 cursor-pointer hover:bg-gradient-to-r from-pink-500 to-purple-500 px-3 py-2 rounded transition-colors duration-300">
            <span className="text-2xl font-bold text-white">
                Inicio
            </span>
        </Link>

        <Link href="/tienda" className="group flex items-center space-x-2 cursor-pointer hover:bg-gradient-to-r from-pink-500 to-purple-500 px-3 py-2 rounded transition-colors duration-300">
            <span className="text-2xl font-bold text-white ">
                Tienda
            </span>
        </Link>

        <Link href="/" className="group flex items-center space-x-2 cursor-pointer hover:bg-gradient-to-r from-pink-500 to-purple-500 px-3 py-2 rounded transition-colors duration-300">
            <span className="text-2xl font-bold text-white">
                Nosotros
            </span>
        </Link>

        <button className="bg-pink-500 p-2 rounded-full hover:bg-pink-600">
            <FaSearch size={20} />
        </button>
    </nav >
);

export default LinksNavegacion;





