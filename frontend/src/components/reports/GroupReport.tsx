import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { generateGroupPDF } from "@/components/utils/pdfGenerator";

export default function GroupReport() {
  const [groups, setGroups] = useState<{ groupName: string; faculty: string; year: string; semester: string; students: number }[]>([]);

  useEffect(() => {
    // Fetch groups from backend (replace with actual API call)
    setGroups([
      { groupName: "CS 2025", faculty: "CS", year: "2", semester: "1", students: 45 },
      { groupName: "IT 2025", faculty: "IT", year: "2", semester: "2", students: 50 },
    ]);
  }, []);

  return (
    <div className="space-y-4">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Group Name</th>
            <th className="border p-2">Faculty</th>
            <th className="border p-2">Year</th>
            <th className="border p-2">Semester</th>
            <th className="border p-2">Students</th>
          </tr>
        </thead>
        <tbody>
          {groups.map((group, index) => (
            <tr key={index} className="text-center">
              <td className="border p-2">{group.groupName}</td>
              <td className="border p-2">{group.faculty}</td>
              <td className="border p-2">{group.year}</td>
              <td className="border p-2">{group.semester}</td>
              <td className="border p-2">{group.students}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Button onClick={() => generateGroupPDF(groups)}>Download PDF</Button>
    </div>
  );
}
