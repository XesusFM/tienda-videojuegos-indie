import { FaSearch } from "react-icons/fa";
import { SiPlaystation, SiNintendo } from "react-icons/si";
import { FaXbox, FaWindows } from "react-icons/fa";

const LinksNavegacion = () => (
    <nav className="flex items-center gap-6 text-gray-300">

        <span className="text-2xl font-bold text-white">Tienda</span>

        <button className="bg-pink-500 p-2 rounded-full hover:bg-pink-600">
            <FaSearch size={20} />
        </button>
    </nav>
);

export default LinksNavegacion;
