"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Inicio() {
    const [juegos, setJuegos] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/juegos")
            .then((res) => res.json())
            .then((data) => setJuegos(data));
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-8">Catálogo de Videojuegos</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full px-4">
                {juegos.map((juego) => (
                    <div 
                        key={juego.id} 
                        className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
                    >
                        <Image 
                            src={`/hollow-knight.jpg`} 
                            alt={juego.titulo} 
                            width={400} 
                            height={250} 
                            className="w-full h-60 object-cover"
                        />
                        <div className="p-5">
                            <h2 className="text-xl font-semibold text-gray-900">{juego.titulo}</h2>
                            <p className="text-gray-600 mt-2">{juego.precio}€</p>
                            <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md font-medium transition hover:bg-blue-700">
                                Añadir al carrito
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
