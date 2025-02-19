"use client";
import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaDiscord } from "react-icons/fa";

export function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 py-10">
            <div className="border-t border-pink-500 max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                <div className="py-5">
                    <h2 className="text-pink-500 text-2xl font-bold">Tienda de Juegos Indie</h2>
                    <p className="text-sm mt-2">Descubre y compra los mejores videojuegos indie con grandes descuentos.</p>
                </div>

                <div className="py-5">
                    <h3 className="text-white text-lg font-semibold mb-2">Categorías</h3>
                    <ul className="space-y-2">
                        <li><Link href="/tienda" className="hover:text-pink-500 transition">Aventura</Link></li>
                        <li><Link href="/tienda" className="hover:text-pink-500 transition">RPG</Link></li>
                        <li><Link href="/tienda" className="hover:text-pink-500 transition">Acción</Link></li>
                        <li><Link href="/tienda" className="hover:text-pink-500 transition">Estrategia</Link></li>
                    </ul>
                </div>

                <div className="py-5">
                    <h3 className="text-white text-lg font-semibold mb-2">Soporte</h3>
                    <ul className="space-y-2">
                        <li><Link href="/" className="hover:text-pink-500 transition">Contacto</Link></li>
                        <li><Link href="/" className="hover:text-pink-500 transition">Preguntas Frecuentes</Link></li>
                        <li><Link href="/" className="hover:text-pink-500 transition">Términos y Condiciones</Link></li>
                        <li><Link href="/" className="hover:text-pink-500 transition">Política de Privacidad</Link></li>
                    </ul>
                </div>

                <div className="py-5">
                    <h3 className="text-white text-lg font-semibold mb-2">Síguenos</h3>
                    <div className="flex space-x-4">
                        <Link href="https://facebook.com" target="_blank" className="text-gray-400 hover:text-blue-500 transition text-2xl">
                            <FaFacebook />
                        </Link>
                        <Link href="https://twitter.com" target="_blank" className="text-gray-400 hover:text-blue-400 transition text-2xl">
                            <FaTwitter />
                        </Link>
                        <Link href="https://instagram.com" target="_blank" className="text-gray-400 hover:text-pink-500 transition text-2xl">
                            <FaInstagram />
                        </Link>
                        <Link href="https://discord.com" target="_blank" className="text-gray-400 hover:text-indigo-500 transition text-2xl">
                            <FaDiscord />
                        </Link>
                    </div>
                </div>
            </div>

            <div className="text-center text-gray-500 text-sm mt-6 border-t border-gray-700 pt-4">
                © {new Date().getFullYear()} Tienda de Juegos Indie - Todos los derechos reservados
            </div>
        </footer>
    );
}

export default Footer;
