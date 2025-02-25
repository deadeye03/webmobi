import React from 'react'
import PdfUpload from './_component/pdf-upload'

const page = () => {
  return (
    <div>
      <div>
        <h1 className='font-bold text-5xl md:text-6xl gradient-title text-center'>Is your resume good enough?</h1>
        <p className='text-center text-muted-foreground'>Check your ATS score and resume quality</p>
      </div>
      <div className='mt-8 '>
          <PdfUpload/>
      </div>
    </div>
  )
}

export default page
