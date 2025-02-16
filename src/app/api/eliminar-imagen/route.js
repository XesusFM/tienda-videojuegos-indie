import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export const runtime = "nodejs"; 

export async function DELETE(req) {
    try {
        const { imagen } = await req.json(); 

        if (!imagen || typeof imagen !== "string") {
            return NextResponse.json({ error: "No se recibió una imagen válida" }, { status: 400 });
        }

        const nombreArchivo = path.basename(imagen); 
        const rutaArchivo = path.join(process.cwd(), "public/uploads", nombreArchivo);

        if (fs.existsSync(rutaArchivo)) {
            fs.unlinkSync(rutaArchivo); 
            return NextResponse.json({ mensaje: "Imagen eliminada correctamente" });
        } else {
            return NextResponse.json({ error: "Imagen no encontrada" }, { status: 404 });
        }

    } catch (error) {
        console.error("Error al eliminar la imagen:", error);
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
    }
}
