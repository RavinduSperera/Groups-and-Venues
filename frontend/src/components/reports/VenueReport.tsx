import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { generateVenuePDF } from "@/components/utils/pdfGenerator";

export default function VenueReport() {
  const [venues, setVenues] = useState<{ hallName: string; faculty: string; type: string; capacity: number }[]>([]);

  useEffect(() => {
    // Fetch venues from backend (replace with actual API call)
    setVenues([
      { hallName: "Hall A", faculty: "CS", type: "Lecture", capacity: 100 },
      { hallName: "Lab 1", faculty: "IT", type: "Lab", capacity: 30 },
    ]);
  }, []);

  return (
    <div className="space-y-4">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Hall Name</th>
            <th className="border p-2">Faculty</th>
            <th className="border p-2">Type</th>
            <th className="border p-2">Capacity</th>
          </tr>
        </thead>
        <tbody>
          {venues.map((venue, index) => (
            <tr key={index} className="text-center">
              <td className="border p-2">{venue.hallName}</td>
              <td className="border p-2">{venue.faculty}</td>
              <td className="border p-2">{venue.type}</td>
              <td className="border p-2">{venue.capacity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Button onClick={() => generateVenuePDF(venues)}>Download PDF</Button>
    </div>
  );
}
