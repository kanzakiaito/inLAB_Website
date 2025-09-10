"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function SecretStep5() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-orange-100">
      <h1 className="text-3xl font-bold mb-6">Step 5: You made it! Go back to start?</h1>
      <Button onClick={() => router.push("/")}>Back to Start</Button>
    </div>
  );
}
