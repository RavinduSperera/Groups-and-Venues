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
    if (editingGroup) {
      // Update existing group
      setGroups(groups.map((g) => (g.id === group.id ? group : g)));
      setEditingGroup(null);
    } else {
      // Add new group
      setGroups([...groups, { ...group, id: Date.now().toString() }]);
    }
  };

  const handleEdit = (group: any) => {
    setEditingGroup(group);
  };

  const handleDelete = (id: string) => {
    setGroups(groups.filter((g) => g.id !== id));
  };

  return (
    <div className="p-4 space-y-6">
      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold">Manage Groups</h2>
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
