"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function SecretStep1() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-orange-100">
      <h1 className="text-3xl font-bold mb-6">Step 1: Are you sure you want to continue?</h1>
      <Button onClick={() => router.push("/tunnel/step2")}>Next</Button>
    </div>
  );
}
