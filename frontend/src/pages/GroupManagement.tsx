import { useState, useEffect } from "react";
import GroupForm from "@/components/GroupForm";
import GroupTable from "@/components/GroupTable";
import { Card, CardContent } from "@/components/ui/card";

export default function GroupManagement() {
  const [groups, setGroups] = useState<any[]>([]);
  const [editingGroup, setEditingGroup] = useState<any | null>(null);

  useEffect(() => {
    fetch("/api/groups")
      .then((res) => res.json())
      .then((data) => setGroups(data));
  }, []);

  const handleAddOrUpdate = (group: any) => {
    const duplicateGroup = groups.find(g => g.groupName.toLowerCase() === group.groupName.toLowerCase());
  
    if (duplicateGroup) {
      alert("A group with this name already exists! Please use a different name.");
      return;
    }
  
    if (editingGroup) {
      // Update existing group
      setGroups(groups.map((g) => (g.id === group.id ? group : g)));
      setEditingGroup(null);
    } else {
      // Add new group
      setGroups([...groups, { ...group, id: Date.now().toString() }]);
    }

    if ((group.year === "3" || group.year === "4") && group.semester === "1") {
      alert("3rd and 4th-year students cannot be in Semester 1!");
      return;
    }

    if (group.year === "1" && group.semester === "2") {
      alert("1st-year students cannot be in Semester 2!");
      return;
    }
  };
  

  const handleEdit = (group: any) => {
    setEditingGroup(group);
  };

  const handleDelete = (id: string) => {
    setGroups(groups.filter((g) => g.id !== id));
  };

  return (
    <div className="p-4 space-y-6 justify-center align-middle">

      {/* sidebar  */}
      <div className="">

      </div>

      {/* nav bar */}
      <div className="">

      </div>
      
      <Card className="w-174">
        <CardContent>
          <h2 className="text-xl font-bold mb-5">Add Groups</h2>
          <GroupForm onSubmit={handleAddOrUpdate} initialData={editingGroup} />
        </CardContent>
      </Card>
      
      <Card>
        <CardContent>
          <GroupTable groups={groups} onEdit={handleEdit} onDelete={handleDelete} />
        </CardContent>
      </Card>
    </div>
  );
}
