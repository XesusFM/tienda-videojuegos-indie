import { CarritoProvider } from "@/context/carritoContext";
import "./globals.css";

export const metadata = {
  title: "Tienda de Videojuegos",
  description: "Compra y gestiona videojuegos indie fácilmente.",
};

export default function RootLayout({ children }) {
  return (

    <html lang="es">
      <body className="font-sans antialiased">
        <CarritoProvider>   
        {children}
        </CarritoProvider>
      </body>
    </html>
  );
}
