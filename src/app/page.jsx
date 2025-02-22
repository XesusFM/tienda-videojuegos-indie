
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

//TODO TEÑO QUE RETOCAR NA DOCUMENTACION, NAVBAR XA QUE AHORA SE CERRA SESION AO PULSAR NO USUARIO EN LUGAR DE NO PROPIO BOTON