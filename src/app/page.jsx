
import { SeccionJuegos } from "@/components/SeccionJuegos/SeccionJuegos";
import { Header } from "@/components/Header/Header";
import { JuegoDestacado } from "@/components/Juegos/JuegoDestacado";

export default function Inicio() {
    return (
        <main className="bg-gray-900 min-h-screen relative">
            <JuegoDestacado />
            <SeccionJuegos />
        </main>
    );
}
