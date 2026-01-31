export type TipoDocumento = "pdf" | "word" | "txt" | "xlsx"

export type Documento ={
    id: number,
    tipo: TipoDocumento
    titulo: string
    contenido: string
    fecha: string
}