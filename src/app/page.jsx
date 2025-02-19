
import { SeccionJuegos } from "@/components/SeccionJuegos/JuegosDestacados";
import { JuegoDestacado } from "@/components/Juegos/JuegoDestacado";

export default function Inicio() {
    return (
        <main className="bg-gray-900 min-h-screen relative">
            <JuegoDestacado />
            <SeccionJuegos />
        </main>
    );
}
