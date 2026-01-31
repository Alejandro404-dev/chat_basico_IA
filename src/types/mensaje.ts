

export type Rol = "usuario" | "bot"

export type Mensaje ={
    id: number
    rol: Rol
    texto: string
}

export type Formulario = {
    texto: string
}
