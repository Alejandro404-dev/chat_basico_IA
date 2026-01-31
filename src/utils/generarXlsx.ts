import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

export function generarXlsx(contenido: string, titulo: string) {

    // 1 - Dividimos el contenido por saltos de linea
    const filas = contenido.split("\n").map((linea) => [linea])

    // 2 - convertimos ese array [linea] en una hoja de excel. 
    // cada fila, es una array de celdas => [["hola"],["mundo"]]
    // AOA - array of array => aoa to sheet(hoja) => el resultado sera que cada valor va a estar en su celda correspondiente
    const hoja = XLSX.utils.aoa_to_sheet(filas)

    // 3 - creamos un libro de excel vacio

    const libro = XLSX.utils.book_new()

    //4- agregamos la hoja creada al libro

    XLSX.utils.book_append_sheet(libro, hoja, "mensaje")

    // 5 - convertimos el libro en un array dew bytes binarios para poder descargar  y aso transformamos el objeto "libro", en un archivo descargable

    const buffer = XLSX.write(libro, { bookType: "xlsx", type: "array" })

    // 6 - creamos un blob con los datos generados

    const blob = new Blob([buffer], {
        type: "aplication/vnd.openxmlformats-officedocument.spreadsheetml.sheet "
    })

    // 7 - Usamos file-server para forzar la descarga

    saveAs(blob, `${titulo}.xlsx`)


}