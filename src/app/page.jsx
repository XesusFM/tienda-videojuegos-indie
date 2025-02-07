
import { SeccionJuegos } from "@/components/SeccionJuegos/SeccionJuegos";
import { Header } from "@/components/Header/Header";
import { JuegoDestacado } from "@/components/SeccionJuegos/JuegoDestacado";

export default function Inicio() {
    return (
        <main className="bg-gray-900 min-h-screen relative">
            <Header />
            <br/><br/><br/>
            <JuegoDestacado />
            <SeccionJuegos />
        </main>
    );
}
