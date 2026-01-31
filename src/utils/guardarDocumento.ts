
import { useDocumentosStore } from "../store/useDocumentosStore";
import type { Documento, TipoDocumento } from "../types/documento";


export function guaradarDocumento(tipo: TipoDocumento, contenido: string) {

    const agregamosDocumento = useDocumentosStore.getState().agregamosDocumento

    const documento: Documento = {
        id: Date.now(),
        tipo,
        contenido,
        titulo: contenido.slice(0, 40).replace(/\s+/g, "_"),
        fecha: new Date().toString()
    }

    agregamosDocumento(documento)

}