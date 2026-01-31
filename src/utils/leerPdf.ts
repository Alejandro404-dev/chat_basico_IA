import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.min?url";
import { LIMITE_TEXTO } from "../config/limites";

GlobalWorkerOptions.workerSrc = pdfjsWorker


export async function leerPdf(archivo: File): Promise<string> {
    try {
        // 1- Convertimos el pdf a un formto binario
        const pdfBuffer = await archivo.arrayBuffer()

        // 2- cargamos el documento en la memoria

        const pdf = await getDocument({ data: pdfBuffer }).promise

        // 3 - Variable para contener el texto completo del pdf
        let textoExtraido = ""

        // 4 - recorremos todas las paginas del pdf
        for (let i = 1; i <= pdf.numPages; i++) {
            const pagina = await pdf.getPage(i)
            // 4.a Extraemos todo el contenido textual de la pagina actual
            const contenido = await pagina.getTextContent()

            // 4.b - el contenido viene como un array - recorremos el contenido y devolvemos los fragmentos que tiene una propiedad "str", que contiene un pedacito de texto
            const textoPagina = contenido.items
                .map((item) =>

                    //4.c - validamos que el item tenga propiedad "str"
                    typeof item === "object" && "str" in item ? (item as { str: string }).str : ""
                ).join("") // unimos todos los fragmentos de texto en una sola cadena

            textoExtraido += textoPagina + "\n" // 4.e - entre cada pagina agregamos un salto para mantener la separacion del texto

            // 5 - Validamos el limite de texto extraido
            if (textoExtraido.length >= LIMITE_TEXTO) break

        }
        return textoExtraido.slice(0, LIMITE_TEXTO)

    } catch (error) {
        console.error("Error al leer el pdf", error)
        return ""

    }

}