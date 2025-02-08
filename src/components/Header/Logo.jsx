import Link from "next/link";
import Image from "next/image";

const Logo = () => (
    <Link href="/" className="flex items-center space-x-2 cursor-pointer">
        {/* Logo alineado a la izquierda */}
        <Image src="/logo.svg" alt="Tienda de Juegos Indie" width={40} height={40} />

        {/* Texto a la derecha del logo */}
        <span className="text-pink-500 text-xl font-bold">Tienda de Juegos Indie</span>
    </Link>
);

export default Logo;
