"use client"

import { useState } from "react"
import { FiFileText, FiDownload, FiEye, FiEyeOff } from "react-icons/fi"

interface ProductDatasheetProps {
  url: string
  name?: string | null
  productTitle: string
}

/** Download button + optional inline PDF viewer for a product's technical datasheet. */
export default function ProductDatasheet({ url, name, productTitle }: ProductDatasheetProps) {
  const [open, setOpen] = useState(false)
  const fileName = name || `${productTitle}.pdf`

  return (
    <div className="mt-10">
      <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-text-3">Ficha técnica</h2>
      <div className="mt-3 card p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4">
        <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-teal-soft text-teal shrink-0">
          <FiFileText className="w-5 h-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-ink truncate">{fileName}</p>
          <p className="text-xs text-text-3 mt-0.5">PDF · especificaciones, dimensiones y materiales</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setOpen((v) => !v)} className="btn btn-outline !py-2 !px-4 text-sm" aria-expanded={open}>
            {open ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
            {open ? "Ocultar" : "Ver aquí"}
          </button>
          <a href={url} target="_blank" rel="noreferrer" download={fileName} className="btn btn-ink !py-2 !px-4 text-sm">
            <FiDownload className="w-4 h-4" /> Descargar
          </a>
        </div>
      </div>
      {open && (
        <div className="mt-3 rounded-[18px] overflow-hidden border border-line bg-paper-2">
          <iframe src={`${url}#view=FitH`} title={`Ficha técnica de ${productTitle}`} className="w-full h-[70vh] min-h-[480px]" />
        </div>
      )}
    </div>
  )
}
