'use client'
import React, { useRef, useState } from 'react'



import { IKImage, IKUpload, ImageKitProvider, } from 'imagekitio-next';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import PDFUploadProgress from './pdf-upload-progress';
import { atsChecker } from '@/actions/ats-checker';
import ResumeAnalysis from './resume-analysis';
import { toast } from 'sonner';
import { motion } from "framer-motion"
const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_KEY;

const authenticator = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/upload-auth`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Request failed with status ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};


function PdfUpload() {
  const ikUploadRef = useRef(null)
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState("Uploading PDF...")
  const [isUploaded, setIsUploaded] = useState(false)
  const [imgPath, setImgPath] = useState('');
  const [data,setData]=useState({})
  const [error,setError]=useState('')
  const onError = err => {
    console.log("Error is", err);
    toast.error('Unable to upload file')
    setIsLoading(false);
    setIsUploaded(false);
    setStatus('Uploading PDF...')
  };

  const onSuccess = async (res) => {
    // console.log("Success", res);
    setProgress(100)
    setStatus("Scanning PDF...")
    setImgPath(res.filePath)
    const response = await atsChecker(res.url);
    if (!response) {
      setIsLoading(false);
      setIsUploaded(false);
      toast.error("This is internal problem please try again with valid Resume")

    }
    else{
      setData(response)
      setIsUploaded(true);
      setIsLoading(false);
      toast.success('Resume uploaded successfully')
      setStatus("Uploading PDF...")
    }

  };

  const onUploadProgress = progress => {
    // console.log("Progress", progress);
    setStatus("Processing PDF...")
    setProgress(50)

  };

  const onUploadStart = evt => {
    setIsLoading(true)
    // console.log("Start", evt);
  };
  return (
    <div className='upload'>

      <ImageKitProvider publicKey={publicKey} urlEndpoint={urlEndpoint} authenticator={authenticator}>
        <div className='flex items-center justify-center'>
          <IKUpload
            fileName="resume.pdf"
            onError={onError}
            onSuccess={onSuccess}
            useUniqueFileName={true}
            onUploadProgress={onUploadProgress}
            onUploadStart={onUploadStart}
            style={{ display: 'none' }}
            ref={ikUploadRef}
          />
          {(!isLoading && !isUploaded) &&
            <label onClick={() => ikUploadRef.current.click()} className='flex items-center justify-center gap-2 min-h-48 w-80 border-white border-2 cursor-pointer rounded-lg bg-muted/50'>
              <Button className='text-white bg-gradient-to-r from-emerald-400 to-emerald-600'>
                <Image src="/attachment.png" alt="attach" height={20} width={20} />
                <span>Attach Resume</span>

              </Button>
            </label>


          }
          {(!isLoading && isUploaded) &&
            <div className='flex items-center justify-center gap-2 min-h-48  w-80 border-white border-2 cursor-pointer rounded-lg bg-muted/50 relative box-border'>
              <IKImage urlEndpoint={urlEndpoint} path='/Saurabh%20Feb_2025%20Resume_page-0001.jpg' width={400} height={400} alt="Alt text" />
              <motion.div
                initial={{ opacity: 0,y:-100 }}
                animate={{ opacity: 1,y:0 }}
                transition={{ duration: 0.5 }}
                className='absolute z-10 flex items-center justify-center gap-2 min-h-full w-80 border-white cursor-pointer rounded-lg bg-muted/50  border-2 backdrop-blur-[2px] '
              >
                <Button onClick={() => ikUploadRef.current.click()} className='text-white bg-gradient-to-r from-emerald-400 to-emerald-600'>
                  <Image src="/attachment.png" alt="attach" height={20} width={20} />
                  <span>Upload Resume</span>

                </Button>
              </motion.div>
            </div>

          }

          <div>
            {isLoading && <PDFUploadProgress progress={progress} status={status} />}
          </div>
        </div>
      </ImageKitProvider>
      {isUploaded && <ResumeAnalysis data={data}/>}
    </div>
  )
}

export default PdfUpload
