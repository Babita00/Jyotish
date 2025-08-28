export default function ProfileStats({ currentLanguage }: { currentLanguage: string }) {
  return (
    <div>
      <h4 className="text-lg font-semibold text-gray-900 mb-4">
        {currentLanguage === "ne" ? "खाता तथ्याङ्क" : "Account Statistics"}
      </h4>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-4 bg-indigo-50 rounded-lg border">
          <div className="text-3xl font-bold text-indigo-600 mb-1">0</div>
          <div className="text-sm font-medium text-gray-600">
            {currentLanguage === "ne" ? "बुकिङहरू" : "Bookings"}
          </div>
        </div>
        <div className="text-center p-4 bg-purple-50 rounded-lg border">
          <div className="text-3xl font-bold text-purple-600 mb-1">0</div>
          <div className="text-sm font-medium text-gray-600">
            {currentLanguage === "ne" ? "परामर्शहरू" : "Consultations"}
          </div>
        </div>
      </div>
    </div>
  );
}
