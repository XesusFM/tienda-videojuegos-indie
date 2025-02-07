const BASE_URL = "http://localhost:5000"; 

export async function getJuegos() {
    const res = await fetch(`${BASE_URL}/juegos`);
    if (!res.ok) throw new Error("Error al obtener los juegos");
    return res.json();
}


export async function getJuegoById(id) {
    const res = await fetch(`${BASE_URL}/juegos/${id}`);
    if (!res.ok) throw new Error("Juego no encontrado");
    return res.json();
}


export async function getUsuarios() {
    const res = await fetch(`${BASE_URL}/usuarios`);
    if (!res.ok) throw new Error("Error al obtener los usuarios");
    return res.json();
}


export async function login(username, password) {
    const usuarios = await getUsuarios();
    return usuarios.find(user => user.username === username && user.password === password) || null;
}
