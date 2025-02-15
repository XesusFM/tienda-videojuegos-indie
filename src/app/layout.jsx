import { ProveedorAutenticacion } from "@/context/AuthContext";
import { CarritoProvider } from "@/context/carritoContext";
import { Header } from "@/components/Header/Header";
import "./globals.css";

export const metadata = {
  title: "Tienda de Videojuegos",
  description: "Compra y gestiona videojuegos indie fácilmente.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="font-sans antialiased">
        <ProveedorAutenticacion>
          <CarritoProvider>
            <Header />
            <main className="mt-20">{children}</main>
          </CarritoProvider>
        </ProveedorAutenticacion>
      </body>
    </html>
  );
}
