import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

interface GroupFormProps {
  onSubmit: (data: any) => void;
  initialData?: any;
}

export default function GroupForm({ onSubmit, initialData }: GroupFormProps) {
  const [formData, setFormData] = useState(initialData || { name: "", year: "", semester: "", type: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Card className="w-full p-4">
      <CardContent className="space-y-4">
        <Label>Group Name</Label>
        <Input name="name" value={formData.name} onChange={handleChange} placeholder="Enter group name" />

        <Label>Year</Label>
        <Input name="year" type="number" value={formData.year} onChange={handleChange} placeholder="Enter year" />

        <Label>Semester</Label>
        <Input name="semester" type="number" value={formData.semester} onChange={handleChange} placeholder="Enter semester" />

        <Label>Type</Label>
        <Select onValueChange={(value: any) => setFormData({ ...formData, type: value })} value={formData.type}>
          <SelectTrigger><SelectValue placeholder="Select Type" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="weekday">Weekday</SelectItem>
            <SelectItem value="weekend">Weekend</SelectItem>
          </SelectContent>
        </Select>

        <Button className="w-full" onClick={() => onSubmit(formData)}>Submit</Button>
      </CardContent>
    </Card>
  );
}
