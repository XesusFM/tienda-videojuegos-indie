"use client";
import ResumenCarrito from "@/components/Pago/resumenCarrito";
import { ResumenCompra } from "@/components/Pago/resumenCompra";

export default function Carrito() {
    return (
        <main>
            <div className="flex flex-col lg:flex-row justify-center items-start min-h-screen bg-[#0D0F22] p-6 gap-6">
                <ResumenCarrito />
                <ResumenCompra />
            </div>
        </main>
    );
}
