import { useState, useEffect } from "react";
import VenueForm from "@/components/VenueForm";
import VenueTable from "@/components/VenueTable";
import { Card, CardContent } from "@/components/ui/card";

export default function VenueManagement() {
  const [venues, setVenues] = useState<any[]>([]);
  const [editingVenue, setEditingVenue] = useState<any | null>(null);

  useEffect(() => {
    fetch("/api/venues")
      .then((res) => res.json())
      .then((data) => setVenues(data));
  }, []);

  const handleAddOrUpdate = (venue: any) => {
    if (editingVenue) {
      // Update existing venue
      setVenues(venues.map((v) => (v.id === venue.id ? venue : v)));
      setEditingVenue(null);
    } else {
      // Add new venue
      setVenues([...venues, { ...venue, id: Date.now().toString() }]);
    }
  };

  const handleEdit = (venue: any) => {
    setEditingVenue(venue);
  };

  const handleDelete = (id: string) => {
    setVenues(venues.filter((v) => v.id !== id));
  };

  return (
    <div className="p-4 space-y-6">
      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold">Manage Venues</h2>
          <VenueForm onSubmit={handleAddOrUpdate} initialData={editingVenue} />
        </CardContent>
      </Card>
      
      <Card>
        <CardContent>
          <VenueTable venues={venues} onEdit={handleEdit} onDelete={handleDelete} />
        </CardContent>
      </Card>
    </div>
  );
}
