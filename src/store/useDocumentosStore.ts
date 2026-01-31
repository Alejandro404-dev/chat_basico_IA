import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Documento } from "../types/documento";



type EstadoDocumento = {
    documentos: Documento[]
    agregamosDocumento: (doc: Documento) => void
    eliminarDocumento: (id: number) => void
    limpiarTodo:() => void
    renombrarDocumento: (id: number, nuevoTitulo: string) => void
}

export const useDocumentosStore = create(
    persist<EstadoDocumento>(
        (set) => ({
            documentos: [],

            agregamosDocumento: (doc) =>
                set((state) => ({
                    documentos: [...state.documentos, doc]
                })),

            eliminarDocumento: (id) =>
                set((state) => ({
                    documentos: state.documentos.filter((documento) => documento.id !== id)
                })),

            limpiarTodo: () =>
                set( { documentos: [] } ),

            renombrarDocumento: ( id, nuevoTitulo ) =>
                set((state)=>({
                    documentos: state.documentos.map((doc)=>
                    doc.id === id? {...doc, titulo: nuevoTitulo}: doc)
                })),

        
        }),
        {
            name: "documentos-generados"
        }
    )
)