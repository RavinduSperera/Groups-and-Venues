import jsPDF from "jspdf";
import autoTable, { UserOptions } from "jspdf-autotable";

declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: UserOptions) => void;
  }
}

(jsPDF as any).API.autoTable = autoTable;

export function generateGroupPDF(groups: any) {
  const doc = new jsPDF();
  doc.text("Group Management Report", 20, 10);

  const tableData = groups.map((g: any) => [g.groupName, g.faculty, g.year, g.semester, g.students]);

  doc.autoTable({
    head: [["Group Name", "Faculty", "Year", "Semester", "Students"]],
    body: tableData,
    startY: 20,
  });

  doc.save("Group_Report.pdf");
}

export function generateVenuePDF(venues: any) {
  const doc = new jsPDF();
  doc.text("Venue Management Report", 20, 10);

  const tableData = venues.map((v: any) => [v.hallName, v.faculty, v.type, v.capacity]);

  doc.autoTable({
    head: [["Hall Name", "Faculty", "Type", "Capacity"]],
    body: tableData,
    startY: 20,
  });

  doc.save("Venue_Report.pdf");
}
