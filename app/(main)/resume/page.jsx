import { getResume } from "@/actions/resume";
import ResumeBuilder from "./_components/resume-builder";

export default async function ResumePage() {


  return (
    <div className="container mx-auto py-6">
      <ResumeBuilder  />
    </div>
  );
}
