import React from "react";
import { Button } from "./ui/button";
import {
  PenBox,
  LayoutDashboard,
  FileText,
  GraduationCap,
  ChevronDown,
  StarsIcon,
  Gauge,
  BookA,
} from "lucide-react";
import Link from "next/link";

import Image from "next/image";


export default function Header() {


  return (
    <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          
          <h1 className=" text-xl  md:text-4xl
           font-sans
           font-bold bg-gradient-to-tr text-transparent bg-clip-text from-sky-400
           via-gray-200 to-sky-500">WEBMOBI AI</h1>
        </Link>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 md:space-x-4">

          {/* Growth Tools Dropdown */}
          <Link href="/check-ats-score" className="flex items-center gap-2">
            <Gauge className="h-4 w-4" />
            Resume Analyzer
          </Link>


          <Link href="/resume" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Build Resume
          </Link>
        </div>

    </nav>
    </header >
  );
}
