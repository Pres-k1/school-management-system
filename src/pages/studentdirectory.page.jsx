import { useMemo, useState } from "react";
import Filters from "../components/Filter.component";
import Sidebar from "../components/Sidebar.component";
import Topbar from "../components/Topbar.component";
import PageHeader from "../components/PageHeader.component";
import StatsCards from "../components/Statscard.component";
import StudentTable from "../components/StudentTable.component";
import BottomPanels from "../components/Bottompanel.component";
import AddStudentModal from "../components/Studentmodal.component";
import { useSearch } from "../context/SearchContext";
import { useNotifications } from "../context/NotificationContext";
import Footer from "../components/Footer.component";

const initialStudents = [
  { id: 1, name: "Mwesigwa Joshua", email: "mwesigwa.j@psms.edu", initials: "MJ",
    admissionNo: "PSMS/2024/0421", class: "Senior 3", stream: "A",
    parentName: "Ssempijja Robert", parentPhone: "+256 772 123456", feeStatus: "paid",
    isNewAdmission: false, isSuspended: false },
  { id: 2, name: "Amina Nakato", email: "amina.n@psms.edu", initials: "AN",
    admissionNo: "PSMS/2024/0115", class: "Senior 1", stream: "B",
    parentName: "Musa Kato", parentPhone: "+256 701 987654", feeStatus: "partial",
    isNewAdmission: true, isSuspended: false },
  { id: 3, name: "Lule Brian", email: "lule.b@psms.edu", initials: "LB",
    admissionNo: "PSMS/2023/0882", class: "Senior 4", stream: "A",
    parentName: "Babirye Sarah", parentPhone: "+256 755 334455", feeStatus: "pending",
    isNewAdmission: false, isSuspended: true },
  { id: 4, name: "Otim Kenneth", email: "otim.k@psms.edu", initials: "OK",
    admissionNo: "PSMS/2024/0512", class: "Senior 2", stream: "C",
    parentName: "Okwera John", parentPhone: "+256 782 665677", feeStatus: "paid",
    isNewAdmission: true, isSuspended: false },
];

function Studentdirectorypage() {
  const [students, setStudents] = useState(initialStudents);
  const [showAddModal, setShowAddModal] = useState(false);
  const [classFilter, setClassFilter] = useState("all");
  const [streamFilter, setStreamFilter] = useState("all");
  const [feeFilter, setFeeFilter] = useState("all");

  // Shared with Topbar's search box, so typing there filters this table live.
  const { searchTerm, setSearchTerm } = useSearch();
  const { addNotification } = useNotifications();

  const classOptions = useMemo(
    () => [...new Set(students.map((s) => s.class))].sort(),
    [students]
  );
  const streamOptions = useMemo(
    () => [...new Set(students.map((s) => s.stream))].sort(),
    [students]
  );

  const filteredStudents = students.filter((s) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      s.name.toLowerCase().includes(term) ||
      s.admissionNo.toLowerCase().includes(term) ||
      s.parentName.toLowerCase().includes(term);
    const matchesClass = classFilter === "all" || s.class === classFilter;
    const matchesStream = streamFilter === "all" || s.stream === streamFilter;
    const matchesFee = feeFilter === "all" || s.feeStatus === feeFilter;
    return matchesSearch && matchesClass && matchesStream && matchesFee;
  });

  const newAdmissionsCount = students.filter((s) => s.isNewAdmission).length;
  const suspendedCount = students.filter((s) => s.isSuspended).length;

  function handleAddStudent(formData) {
    const newStudent = {
      id: Date.now(),
      ...formData,
      initials: formData.name.split(" ").map((w) => w[0]).join("").toUpperCase(),
      email: `${formData.name.split(" ")[0].toLowerCase()}@psms.edu`,
      admissionNo: formData.admissionNo || `PSMS/2026/${Math.floor(Math.random() * 9000 + 1000)}`,
      isNewAdmission: true,
      isSuspended: false,
    };

    setStudents([newStudent, ...students]);
    setShowAddModal(false);
    addNotification(`New student admitted: ${newStudent.name}`, "success");
  }

  function handleExport() {
    const header = ["Name", "Admission No", "Class", "Stream", "Parent", "Fee Status"];
    const rows = filteredStudents.map((s) => [
      s.name, s.admissionNo, s.class, s.stream, s.parentName, s.feeStatus,
    ]);
    const csv = [header, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "students.csv";
    link.click();
    URL.revokeObjectURL(url);
    addNotification("Student list exported", "info");
  }

  return (
    <div className="app-layout">
      <Sidebar onNewAdmission={() => setShowAddModal(true)} />

      <main className="main">
        <Topbar />
        <PageHeader onAddStudent={() => setShowAddModal(true)} onExport={handleExport} />

        <StatsCards
          totalCount={students.length}
          newAdmissionsCount={newAdmissionsCount}
          suspendedCount={suspendedCount}
        />

        <Filters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          resultsCount={filteredStudents.length}
          totalCount={students.length}
          classOptions={classOptions}
          streamOptions={streamOptions}
          classFilter={classFilter}
          streamFilter={streamFilter}
          feeFilter={feeFilter}
          onClassChange={setClassFilter}
          onStreamChange={setStreamFilter}
          onFeeChange={setFeeFilter}
        />

        <StudentTable students={filteredStudents} />

        <BottomPanels />

        {showAddModal && (
          <AddStudentModal
            onClose={() => setShowAddModal(false)}
            onAdd={handleAddStudent}
          />
        )}
        <Footer />
      </main>
    </div>
  );
}

export default Studentdirectorypage;
