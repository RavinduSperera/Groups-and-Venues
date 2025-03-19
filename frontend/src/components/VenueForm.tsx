import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

interface VenueFormProps {
  onSubmit: (data: any) => void;
  initialData?: any;
}

export default function VenueForm({ onSubmit, initialData }: VenueFormProps) {
  const [formData, setFormData] = useState(initialData || { 
    faculty: "", building: "", hall: "", type: "", capacity: "" 
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Card className="w-full p-4">
      <CardContent className="space-y-4">
        <Label>Faculty/Department</Label>
        <Input name="faculty" value={formData.faculty} onChange={handleChange} placeholder="Enter faculty/department" />

        <Label>Building</Label>
        <Input name="building" value={formData.building} onChange={handleChange} placeholder="Enter building name" />

        <Label>Hall Name</Label>
        <Input name="hall" value={formData.hall} onChange={handleChange} placeholder="Enter hall name" />

        <Label>Type</Label>
        <Select onValueChange={(value) => setFormData({ ...formData, type: value })} value={formData.type}>
          <SelectTrigger><SelectValue placeholder="Select Type" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="lecture">Lecture</SelectItem>
            <SelectItem value="tutorial">Tutorial</SelectItem>
            <SelectItem value="lab">Lab</SelectItem>
          </SelectContent>
        </Select>

        <Label>Capacity</Label>
        <Input name="capacity" type="number" value={formData.capacity} onChange={handleChange} placeholder="Enter capacity" />

        <Button className="w-full" onClick={() => onSubmit(formData)}>Submit</Button>
      </CardContent>
    </Card>
  );
}
