import { ProveedorAutenticacion } from "@/context/AuthContext";
import { CarritoProvider } from "@/context/CarritoContext";
import { UsuariosProvider } from "@/context/UsuariosContext";
import { Header } from "@/components/Header/Header";
import { JuegosProvider } from "@/context/JuegosContext";
import "./globals.css";
import Footer from "@/components/Footer/Footer";

export const metadata = {
  title: "Tienda de Videojuegos",
  description: "Compra y gestiona videojuegos indie fácilmente.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="font-sans antialiased">
      
        <ProveedorAutenticacion>
        <JuegosProvider> 
          <CarritoProvider>
            <UsuariosProvider>
              <Header />
              <main className="mt-20">{children}</main>
              <Footer />
            </UsuariosProvider>
          </CarritoProvider>
          </JuegosProvider> 
        </ProveedorAutenticacion>
        
      </body>
    </html>
  );
}
