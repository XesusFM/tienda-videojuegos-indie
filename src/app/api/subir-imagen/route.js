import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export const runtime = "nodejs"; // Asegura que Next.js use Node.js

export async function POST(req) {
    const formData = await req.formData();
    const archivo = formData.get("archivo");
    const titulo = formData.get("titulo");

    if (!archivo || !titulo) {
        return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
    }

    const buffer = Buffer.from(await archivo.arrayBuffer());
    const nombreArchivo = `${titulo.replace(/\s+/g, "_")}.jpg`;
    const rutaArchivo = path.join(process.cwd(), "public/uploads", nombreArchivo);
    
    if (!fs.existsSync(path.join(process.cwd(), "public/uploads"))) {
        fs.mkdirSync(path.join(process.cwd(), "public/uploads"), { recursive: true });
    }

    fs.writeFileSync(rutaArchivo, buffer);

    return NextResponse.json({ url: `/uploads/${nombreArchivo}` });
}
