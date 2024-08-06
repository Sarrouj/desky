"use client";
import { Spinner } from "@/Components/ui/spinner";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutralBg">
      <Spinner size={"medium"}/>
    </div>
  );
}
