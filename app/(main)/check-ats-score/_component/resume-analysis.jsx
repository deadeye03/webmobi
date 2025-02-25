"use client"

import ReactMarkdown from "react-markdown"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CheckCircle, XCircle } from "lucide-react"



const ATSScoreSpeedometer = ({ score }) => {
    const circumference = 2 * Math.PI * 45
    const offset = circumference - (score / 100) * circumference

    return (
        <div className="relative w-48 h-48">
            <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                    className="text-muted-foreground"
                    strokeWidth="10"
                    stroke="currentColor"
                    fill="transparent"
                    r="45"
                    cx="50"
                    cy="50"
                />
                <circle
                    className="text-primary"
                    strokeWidth="10"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="45"
                    cx="50"
                    cy="50"
                />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl font-bold">{score}</span>
            </div>
        </div>
    )
}



export default function ResumeAnalysis({ data }) {
    // console.log("DATA IS ANALYSIS", data)

    if (!data) {
        return <div>Loading...</div>
    }

    return (
        <div className="container mx-auto p-4 space-y-6 mt-6">
            <h1 className="text-3xl md:text-4xl font-bold gradient-title text-center">Resume Analysis</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <Card >
                    <CardHeader>
                        <CardTitle>ATS SCORE</CardTitle>
                    </CardHeader>
                    <CardContent className="flex justify-center">
                        <ATSScoreSpeedometer score={data?.ats_score || 60} />
                    </CardContent>
                </Card>
                <Card >
                    <CardHeader>
                        <CardTitle>JOB FIT SCORE</CardTitle>
                    </CardHeader>
                    <CardContent className="flex justify-center">
                        <ATSScoreSpeedometer score={data?.job_fit_score || 80} />
                    </CardContent>
                </Card>
                <Card >
                    <CardHeader>
                        <CardTitle>READALIBLIY SCORE</CardTitle>
                    </CardHeader>
                    <CardContent className="flex justify-center">
                        <ATSScoreSpeedometer score={data?.readability_score || 60} />
                    </CardContent>
                </Card>


            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Improvement Tips</CardTitle>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-[300px] w-full">
                        <ul className="space-y-2">
                            {data?.improvement_suggestions?.map((tip, index) => (
                                <li key={index} className="text-sm">
                                    

                                    <span className="font-bold text-lg mr-1 text-pink-300">{tip.category}:</span> {tip.suggestion}
                                    {/* </ReactMarkdown> */}
                                </li>
                            ))}
                        </ul>
                    </ScrollArea>
                </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-max">
                <Card>
                    <CardHeader>
                        <CardTitle>
                            <h2 className="text-xl font-semibold">Skills Anlaysis</h2>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className='flex justify-between '>
                        <ul className="list-disc list-inside">
                            <h2 className="text-xl font-semibold gradient-title">Hard Skills </h2>
                            {data.skills_analysis?.hard_skills?.map((skill, index) => (
                                <li key={skill} className="text-sm">
                                    <span className="font-bold  mr-1 text-teal-300">{skill} </span> 
                                </li>
                            ))}
                        </ul>
                        <ul className="list-disc list-inside">
                            <h2 className="text-xl font-semibold gradient-title">Soft Skills </h2>
                            {data.skills_analysis?.soft_skills?.map((skill, index) => (
                                <li key={skill} className="text-sm min-w-max">
                                    <span className="font-bold mr-1 text-cyan-500">{skill} </span> 
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>
                            <h2 className="text-xl font-semibold">Formating Issues</h2>
                        </CardTitle>
                        <CardContent>
                            <ul className="list-disc list-inside">
                                {data?.formatting_issues?.map((issue, index) => (
                                    <li key={issue} className="text-sm">
                                        <span className="font-bold text-lg mr-1 text-purple-500">{issue} </span> 
                                    </li>
                            ))}
                            </ul>
                        </CardContent>
                    </CardHeader>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-max">
                <Card>
                    <CardHeader>
                        <CardTitle>
                            <h2 className="text-xl font-semibold">Need to fill out the following sections:</h2>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside">
                           <li className='flex gap-2 items-center' >Contact Information {data.section_completeness?.Contact_information?<CheckCircle className="h-4 w-4 text-teal-400" />:<XCircle className="h-4 w-4 text-red-500" />}</li>
                           <li className='flex gap-2 items-center' >Education {data.section_completeness?.Education?<CheckCircle className="h-4 w-4 text-teal-400" />:<XCircle className="h-4 w-4 text-red-500" />}</li>
                           <li className='flex gap-2 items-center' >Contact Summary {data.section_completeness?.Summary?<CheckCircle className="h-4 w-4 text-teal-400" />:<XCircle className="h-4 w-4 text-red-500" />}</li>
                           <li className='flex gap-2 items-center' >Work Experience {data.section_completeness?.Work_experience?<CheckCircle className="h-4 w-4 text-teal-400" />:<XCircle className="h-4 w-4 text-red-500" />}</li>
                           <li className='flex gap-2 items-center' >Skills {data.section_completeness?.Skills?<CheckCircle className="h-4 w-4 text-teal-400" />:<XCircle className="h-4 w-4 text-red-500" />}</li>
                           <li className='flex gap-2 items-center' >Projects {data.section_completeness?.Projects?<CheckCircle className="h-4 w-4 text-teal-400" />:<XCircle className="h-4 w-4 text-red-500" />}</li>
                           <li className='flex gap-2 items-center' >Cerfifications {data.section_completeness?.Cerfifications?<CheckCircle className="h-4 w-4 text-teal-400" />:<XCircle className="h-4 w-4 text-red-500" />}</li>
                        </ul>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>
                            <h2 className="text-xl font-semibold">Missing Keywords</h2>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside">
                        {data.missing_keywords?.map((keyword, index) => (
                            <li key={keyword} className="text-sm">
                            {keyword}
                            </li>
                        ))}
                        </ul>
                    </CardContent>
                </Card>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-max">
                <Card >
                    <CardHeader>
                        <CardTitle>Spelling Mistakes</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside">
                            {data.spelling_mistakes.map((mistake, index) => (
                                <li key={index} className="text-sm text-red-500">
                                    {mistake}
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Grammatical Errors</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-[300px] w-full">
                            <ul className="space-y-4">
                                {data.grammatical_errors.map((error, index) => (
                                    <li key={index} className="text-sm">
                                        <p className="text-red-500">{error.error}</p>
                                        <p className="text-green-500 mt-1">{error.suggestion}</p>
                                    </li>
                                ))}
                            </ul>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

