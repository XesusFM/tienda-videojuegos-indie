import Link from "next/link";
import Image from "next/image";

const Logo = () => (
    <Link href="/" className="flex items-center space-x-2 cursor-pointer">

        <Image src="/logo.svg" alt="Tienda de Juegos Indie" width={40} height={40} />

        <span className="text-pink-500 text-xl font-bold">Tienda de Juegos Indie</span>
        
    </Link>
);

export default Logo;
