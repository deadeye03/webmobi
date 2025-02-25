"use client"


import { motion } from "framer-motion"
import { FileText, ScanIcon as Scanner } from "lucide-react"

export default function PDFUploadProgress({progress, status}) {


  return (
    <div className="flex items-center justify-center min-h-48 bg-gray-100 rounded-lg overflow-hidden">
      <div className=" min-w-80  p-8 bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-center mb-6">
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
          >
            <FileText size={64} className="text-blue-500" />
          </motion.div>
        </div>
        <h2 className="mb-4 text-2xl font-semibold text-center text-gray-800">{status}</h2>
        <div className="relative h-4 mb-6 overflow-hidden bg-gray-200 rounded-full">
          <motion.div
            className="h-full bg-blue-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <div className="relative flex items-center justify-center">
          <motion.div
            className="absolute w-full h-1 bg-blue-200"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: progress === 100 ? [0, 1, 0] : 0 }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "easeInOut" }}
          />
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: progress === 100 ? 1 : 0 }}>
            <Scanner size={32} className="text-blue-500" />
          </motion.div>
        </div>
      </div>
    </div>
  )
}


