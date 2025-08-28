import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function ProfileAuthRequired() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardContent className="text-center py-8">
          <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Authentication Required</h2>
          <p className="text-gray-600 mb-4">Please log in to view your profile.</p>
          <Button asChild>
            <a href="/login">Go to Login</a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
