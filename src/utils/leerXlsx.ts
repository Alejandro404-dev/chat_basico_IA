import * as XLSX from "xlsx";
import { LIMITE_TEXTO } from "../config/limites";

export async function leerXlsx(archivo: File): Promise<string> {

    // 1-Leemos el contenido binario del archivo
    const contenidoLeido = await archivo.arrayBuffer()

    // 2- interpretamos el contenido binario como un libro de Excel

    const libro = XLSX.read(contenidoLeido, { type: "array" })
    // 3 - procesamos cada hola del libro para convertirla en un testo plano
    const textoHojas = libro.SheetNames.map((nombreHoja) => {
        const hoja = XLSX.utils.sheet_to_json(libro.Sheets[nombreHoja], {
            header: 1, // 4 - pedimos que las filas vengan como arreglos   
        }) as string[][] // 5 - Le decimos a typesCript que va a recibir un array de textos

        //6 - unimos cada fila y cada hoja
        const textoPlano = hoja.map((fila) => fila.join("")).join("\n")

        //7 - Agregamos el nombre de la hoja como titulo antes de su contenido
        return `Hoja: ${nombreHoja}\n${textoPlano}`

    }).join("\n\n")
    // 8 - Limitamos el texto
    return textoHojas.slice(0, LIMITE_TEXTO)



}