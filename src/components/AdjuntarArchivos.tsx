
/* usuario selecciona un archivo
    => valida + extrae el texto 
    => vista previa
            => no => borra el texto
            no => borra el texto
            si => se envia la informacion al chat
*/
const EXTENSIONES_MIMES_VALIDAS = [
    "application/pdf", //PDF
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",// DOCX
    "text/plain",// TXT
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",// XLSX
]

import { useState } from "react"
import { LIMITE_TEXTO } from "../config/limites"
import { leerDocx } from "../utils/leerDocx"
import { leerPdf } from "../utils/leerPdf"
import { leerXlsx } from "../utils/leerXlsx"

const MAX_SIZE_BYTES = 5 * 1024 * 1024 // 5MB

const EXTENSIONES_VALIDAS = ["pdf", "docx", "txt", "xlsx"]

type PropAdjuntarArchivo = {
    envioTextoExtraido: (
        entrada: {
            texto: string,
            esArchivo: boolean
        }
    ) => void
}

export default function AdjuntarArchivos({ envioTextoExtraido }: PropAdjuntarArchivo) {

    const [texto, setTexto] = useState("")

    const manejarArchivo = async (e: React.ChangeEvent<HTMLInputElement>) => {

        const archivo = e.target.files?.[0]

        if (!archivo) return

        const extension = archivo.name.split(".").pop()?.toLowerCase()

        //validaciones generales

        if (!extension || !EXTENSIONES_VALIDAS.includes(extension)) {
            alert("Formato de archivo no permitido")
            return
        }

        if (!EXTENSIONES_MIMES_VALIDAS.includes(archivo.type)) {
            alert("Tipo MIME no permitido")
            return
        }

        if (archivo.size > MAX_SIZE_BYTES) {

            alert("El archivo excede el tamaño máximo permitido (5MB)")
            return
        }

        //procesamos archivos por su tipo

        // TXT
        if (extension === "txt") {

            const lector = new FileReader()
            lector.onload = () => {
                const resultado = (lector.result as string).slice(0, LIMITE_TEXTO)
                setTexto(resultado)
            }
            lector.readAsText(archivo)
            return
        }

        // DOCX
        if (extension === "docx") {

            const lector = new FileReader() // 1 -nuevo archivo
            // 2 - como vamos a procesar el archivo y por ende, como se tiene que leer
            // 4 - nos devuelve el contenido crudo y ya estamos listos para procesar el contenido y enviarlo a index ventana chat atraves de setTexto
            lector.onload = async () => {
                const resultado = await leerDocx(archivo)
                setTexto(resultado)
            }
            // 3 - leemos el archivo de acuerdo a las especificaciones que nos indican en lector.onload
            lector.readAsArrayBuffer(archivo)
            return
        }

        // PDF

        if (extension === "pdf") {
            const resultado = await leerPdf(archivo)
            setTexto(resultado)
            return

        }

        // XLSX

        if (extension === "xlsx") {
            const lector = new FileReader()
            lector.onload = async () => {
                const resultado = await leerXlsx(archivo)
                setTexto(resultado)
            }
            lector.readAsArrayBuffer(archivo)
        }


    }
    //funcion para confirmar
    const confirmar = () => {
        envioTextoExtraido({
            texto,
            esArchivo: true
        })
        setTexto("")
    }

    //funcion para rechazar
    const rechazar = () => {
        setTexto("")
    }

    return (
        <div className="mt-4 space-y-2 " >
            <label
                className=" inlaine-block cursor-pointer text-sm bg-zinc-700 text-white px-3 py-1 hpver:bg-zinc-500 "
            >
                Elegir archivo
                <input type="file"
                    accept=".txt, .pdf, .docx, .xlsx"
                    className="hidden"
                    onChange={manejarArchivo}
                />
            </label>
            {texto && (
                <div className="text-sm bg-zinc-800 p-3 rounded text-center " >
                    <p className="mb-2 " >Quieres analizar este archivo? </p>
                    <div className="flex justify-center gap-2 " >
                        <button
                            className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600 cursor-pointer "
                            onClick={confirmar}
                        >
                            si
                        </button>

                        <button
                            className="bg-amber-700 px-3 py-1 rounded hover:bg-amber-800 cursor-pointer"
                            onClick={rechazar}
                        >
                            no
                        </button>
                    </div>
                </div>
            )}
        </div>

    )
}
