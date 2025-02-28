import { JuegosTienda } from "@/components/SeccionJuegos/JuegosTienda";
import { Filtros } from "@/components/Filtros/Filtros";
import { JuegosProvider } from "@/context/juegosContext";

export default function Tienda() {
    return (
        <JuegosProvider>
            <main className="bg-gray-900 min-h-screen p-6">
                <Filtros />
                <JuegosTienda />
            </main>
        </JuegosProvider>
    );
}
