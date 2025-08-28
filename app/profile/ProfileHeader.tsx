import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProfileHeader({ currentLanguage }: { currentLanguage: string }) {
  return (
    <div className="mb-6 flex justify-start">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => window.history.back()}
        className="text-white hover:bg-white/10"
      >
        <ArrowLeft className="h-4 w-4 mr-2 text-2xl" />
        {currentLanguage === "ne" ? "फिर्ता" : "Back"}
      </Button>
    </div>
  );
}
