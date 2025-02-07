import { FaSearch } from "react-icons/fa";
import { SiPlaystation, SiNintendo } from "react-icons/si";
import { FaXbox, FaWindows } from "react-icons/fa";

const LinksNavegacion = () => (
    <nav className="flex items-center gap-6 text-gray-300">
        <FaWindows size={28}/><span>PC</span>
        <SiPlaystation size={28}/><span>PlayStation</span>
        <FaXbox size={28}/><span>Xbox</span>
        <SiNintendo size={28}/><span>Nintendo</span>
        <button className="bg-pink-500 p-2 rounded-full hover:bg-pink-600">
            <FaSearch size={20} />
        </button>
    </nav>
);

export default LinksNavegacion;
