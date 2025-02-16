import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export const runtime = "nodejs"; // Asegura que se ejecuta en Node.js

export async function DELETE(req) {
    try {
        const { imagen } = await req.json(); // Extraer URL de la imagen

        if (!imagen || typeof imagen !== "string") {
            return NextResponse.json({ error: "No se recibió una imagen válida" }, { status: 400 });
        }

        const nombreArchivo = path.basename(imagen); // Extraer solo el nombre del archivo
        const rutaArchivo = path.join(process.cwd(), "public/uploads", nombreArchivo);

        if (fs.existsSync(rutaArchivo)) {
            fs.unlinkSync(rutaArchivo); // Eliminar la imagen
            return NextResponse.json({ mensaje: "Imagen eliminada correctamente" });
        } else {
            return NextResponse.json({ error: "Imagen no encontrada" }, { status: 404 });
        }

    } catch (error) {
        console.error("Error al eliminar la imagen:", error);
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
    }
}
