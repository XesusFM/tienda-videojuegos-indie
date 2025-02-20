"use client";
import PagoExitoso from "@/components/Pago/PagoExitoso";

export default function pagoHecho() {
    return (
        <main>
            <div className="flex flex-col lg:flex-row justify-center items-start min-h-screen bg-[#0D0F22] p-6 gap-6">

            <PagoExitoso />

            </div>
        </main>
    );
}