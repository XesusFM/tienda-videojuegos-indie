import { FaSearch } from "react-icons/fa";
import Link from "next/link";

const LinksNavegacion = () => (
    <nav className="flex items-center gap-6 text-gray-300">
        <Link href="/tienda" className="flex items-center space-x-2 cursor-pointer">
            <span className="text-2xl font-bold text-white">Tienda</span>
        </Link>
        <button className="bg-pink-500 p-2 rounded-full hover:bg-pink-600">
            <FaSearch size={20} />
        </button>
    </nav >
);

export default LinksNavegacion;





