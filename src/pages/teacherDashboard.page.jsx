import { useState, useMemo } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
// ---------------------------------------------------------
// Teacher Dashboard - React + Bootstrap version
//
// Requirements in your project:
//   npm install bootstrap
//   and in your entry file (e.g. index.js / main.jsx):
//   import 'bootstrap/dist/css/bootstrap.min.css';
//
// All data below is sample/mock data held in component state.
// Replace CLASSES / INITIAL_ASSESSMENTS with data from your
// backend (fetch/axios calls) when ready, and swap the
// TODO-marked handlers for real API calls.
// ---------------------------------------------------------

const CLASSES = {
  "S2 East": ["Achen Grace", "Bwambale Ivan", "Cheptoek Ruth", "Draru Sam", "Eyoku Faith"],
  "S3 West": ["Kato Brian", "Lubega Sarah", "Mugisha Peter", "Nakato Joan", "Okello David"],
  "S3 East": ["Apio Mary", "Byaruhanga Tom", "Chelangat Joy", "Duku Isaac", "Ejiu Patricia"],
  "S4 North": ["Kirabo Angel", "Lwanga Moses", "Namara Grace", "Odongo Kevin", "Pearl Namuli"],
};

const TIMETABLE = [
  { time: "8:00 AM", cls: "S2 East", room: "Room 12" },
  { time: "9:40 AM", cls: "S3 West", room: "Room 6" },
  { time: "11:20 AM", cls: "S3 East", room: "Room 6" },
  { time: "2:00 PM", cls: "S4 North", room: "Lab 2" },
];

const INITIAL_ASSESSMENTS = [
  { title: "Algebra CAT 1", cls: "S3 East", type: "CAT", date: "2026-08-03", status: "Upcoming" },
  { title: "Geometry Assignment", cls: "S2 East", type: "Assignment", date: "2026-08-05", status: "Upcoming" },
  { title: "Mid-Term Exam", cls: "S4 North", type: "Exam", date: "2026-07-22", status: "Pending Grading" },
  { title: "Trig Quiz", cls: "S3 West", type: "CAT", date: "2026-07-20", status: "Pending Grading" },
];

const STATUS_CYCLE = ["present", "late", "absent"];
const STATUS_LABEL = { present: "Present", late: "Late", absent: "Absent" };
const STATUS_BADGE = { present: "success", late: "warning", absent: "danger" };

function formatDate(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

function letterGrade(total) {
  if (total === null) return "-";
  if (total >= 80) return "A";
  if (total >= 65) return "B";
  if (total >= 50) return "C";
  if (total >= 40) return "D";
  return "F";
}

const GRADE_BADGE = { A: "success", B: "primary", C: "warning", D: "danger", F: "danger" };

export default function TeacherDashboard() {
  const [view, setView] = useState("overview");
  const [attendanceClass, setAttendanceClass] = useState("S2 East");
  const [gradesClass, setGradesClass] = useState("S2 East");

  // attendance[className][studentName] = "present" | "late" | "absent"
  const [attendance, setAttendance] = useState(() => {
    const initial = {};
    Object.keys(CLASSES).forEach((cls) => {
      initial[cls] = {};
      CLASSES[cls].forEach((name) => (initial[cls][name] = "present"));
    });
    return initial;
  });

  // grades[className][studentName] = { cat1, cat2, exam }
  const [grades, setGrades] = useState(() => {
    const initial = {};
    Object.keys(CLASSES).forEach((cls) => {
      initial[cls] = {};
      CLASSES[cls].forEach((name) => (initial[cls][name] = { cat1: "", cat2: "", exam: "" }));
    });
    return initial;
  });

  const [assessments, setAssessments] = useState(INITIAL_ASSESSMENTS);
  const [newAssessment, setNewAssessment] = useState({
    title: "",
    cls: "S2 East",
    type: "CAT",
    date: "",
  });
  const [savedFlash, setSavedFlash] = useState(null); // "attendance" | "grades" | null

  // ----- Derived values -----
  const attendanceRate = useMemo(() => {
    const record = attendance[attendanceClass];
    const total = CLASSES[attendanceClass].length;
    const present = Object.values(record).filter((s) => s === "present").length;
    return { present, total, pct: Math.round((present / total) * 100) };
  }, [attendance, attendanceClass]);

  const pendingGradingCount = useMemo(
    () => assessments.filter((a) => a.status === "Pending Grading").length,
    [assessments]
  );

  const upcomingAssessments = useMemo(
    () =>
      assessments
        .filter((a) => a.status === "Upcoming")
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, 5),
    [assessments]
  );

  const classAverage = useMemo(() => {
    const totals = CLASSES[gradesClass]
      .map((name) => {
        const g = grades[gradesClass][name];
        const cat1 = parseFloat(g.cat1),
          cat2 = parseFloat(g.cat2),
          exam = parseFloat(g.exam);
        return !isNaN(cat1) && !isNaN(cat2) && !isNaN(exam) ? cat1 + cat2 + exam : null;
      })
      .filter((t) => t !== null);
    if (totals.length === 0) return null;
    return (totals.reduce((a, b) => a + b, 0) / totals.length).toFixed(1);
  }, [grades, gradesClass]);

  // ----- Handlers -----
  function cycleStatus(cls, student) {
    setAttendance((prev) => {
      const current = prev[cls][student];
      const next = STATUS_CYCLE[(STATUS_CYCLE.indexOf(current) + 1) % STATUS_CYCLE.length];
      return { ...prev, [cls]: { ...prev[cls], [student]: next } };
    });
  }

  function updateGradeField(cls, student, field, value) {
    setGrades((prev) => ({
      ...prev,
      [cls]: { ...prev[cls], [student]: { ...prev[cls][student], [field]: value } },
    }));
  }

  function rowTotal(cls, student) {
    const g = grades[cls][student];
    const cat1 = parseFloat(g.cat1),
      cat2 = parseFloat(g.cat2),
      exam = parseFloat(g.exam);
    return !isNaN(cat1) && !isNaN(cat2) && !isNaN(exam) ? cat1 + cat2 + exam : null;
  }

  function saveAttendance() {
    // TODO: send `attendance[attendanceClass]` to your backend, e.g.
    // fetch('/api/attendance', { method: 'POST', body: JSON.stringify(attendance[attendanceClass]) })
    setSavedFlash("attendance");
    setTimeout(() => setSavedFlash(null), 1500);
  }

  function saveGrades() {
    // TODO: send `grades[gradesClass]` to your backend here.
    setSavedFlash("grades");
    setTimeout(() => setSavedFlash(null), 1500);
  }

  function handleAddAssessment(e) {
    e.preventDefault();
    if (!newAssessment.title.trim() || !newAssessment.date) return;
    setAssessments((prev) => [...prev, { ...newAssessment, status: "Upcoming" }]);
    setNewAssessment({ title: "", cls: "S2 East", type: "CAT", date: "" });
  }

  const now = new Date();
  const greetingWord =
    now.getHours() < 12 ? "Good morning" : now.getHours() < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="d-flex" style={{ minHeight: "100vh", backgroundColor: "#f7f9fa" }}>
      {/* Sidebar */}
      {/* <div
        className="d-flex flex-column p-3 text-white"
        style={{ width: 240, backgroundColor: "#1a2536", flexShrink: 0 }}
      >
        <h5 className="mb-0">School Management System</h5>
        <p className="small mb-4" style={{ color: "#8892b0" }}>
          Teacher Portal
        </p>

        <nav className="nav nav-pills flex-column gap-1 flex-grow-1">
          {[
            ["overview", "🏠 Dashboard"],
            ["attendance", "🗓️ Attendance"],
            ["grades", "📘 Gradebook"],
            ["assessments", "📝 Assessments"],
          ].map(([key, label]) => (
            <button
              key={key}
              className={`nav-link text-start ${view === key ? "active" : ""}`}
              style={view === key ? {} : { color: "#c3c9dc" }}
              onClick={() => setView(key)}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="pt-3 border-top" style={{ borderColor: "#2a3650" }}>
          <div className="d-flex align-items-center gap-2">
            <div
              className="rounded-circle d-flex align-items-center justify-content-center fw-semibold"
              style={{ width: 36, height: 36, backgroundColor: "#2b5ce6", fontSize: "0.8rem" }}
            >
              MN
            </div>
            <div>
              <div className="small fw-semibold">Ms. Nakato</div>
              <div className="small" style={{ color: "#8892b0" }}>
                Mathematics
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Main content */}
      <div className="flex-grow-1 p-4" style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <div className="d-flex justify-content-between align-items-start flex-wrap gap-3 mb-4">
          <div>
            <h2 className="mb-1">{greetingWord}, Ms. Nakato</h2>
            <p className="text-muted mb-0">
              Here's your teaching day for{" "}
              {now.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}.
            </p>
          </div>
          <div className="d-flex gap-2">
            <button className="btn btn-outline-secondary" onClick={() => setView("assessments")}>
              📝 New Assessment
            </button>
            <button className="btn btn-primary" onClick={() => setView("attendance")}>
              ✔️ Take Attendance
            </button>
          </div>
        </div>

        {/* Metric cards */}
        <div className="row g-3 mb-4">
          <MetricCard title="Classes Today" value="4" subtext="S2 East, S3 West, S3 East, S4 North" />
          <MetricCard title="Total Students" value="138" subtext="Across 4 classes" />
          <MetricCard
            title="Attendance Today"
            value={`${attendanceRate.pct}%`}
            subtext={`${attendanceRate.present} / ${attendanceRate.total} present (${attendanceClass})`}
          />
          <MetricCard title="Pending Grading" value={pendingGradingCount} subtext="Assessments awaiting scores" />
        </div>

        {/* Overview */}
        {view === "overview" && (
          <div className="row g-3">
            <div className="col-lg-8">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="card-title mb-0">Today's Timetable</h5>
                    <span className="text-muted small">
                      {now.toLocaleDateString("en-GB", { weekday: "long" })}
                    </span>
                  </div>
                  <div className="d-flex flex-column gap-2">
                    {TIMETABLE.map((row, i) => (
                      <div
                        key={i}
                        className="d-flex align-items-center gap-3 p-2 rounded"
                        style={{ backgroundColor: "#f7f9fa", border: "1px solid #eee" }}
                      >
                        <span className="fw-semibold text-primary small" style={{ width: 70 }}>
                          {row.time}
                        </span>
                        <div>
                          <div className="fw-semibold">{row.cls}</div>
                          <div className="text-muted small">{row.room}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title mb-3">Upcoming Assessments</h5>
                  {upcomingAssessments.length === 0 ? (
                    <p className="text-muted small">No upcoming assessments scheduled.</p>
                  ) : (
                    <div className="d-flex flex-column gap-2">
                      {upcomingAssessments.map((a, i) => (
                        <div
                          key={i}
                          className="d-flex justify-content-between align-items-center p-2 rounded"
                          style={{ backgroundColor: "#f7f9fa", border: "1px solid #eee" }}
                        >
                          <div>
                            <div className="fw-semibold small">{a.title}</div>
                            <div className="text-muted" style={{ fontSize: "0.75rem" }}>
                              {a.cls} · {a.type}
                            </div>
                          </div>
                          <span className="badge rounded-pill text-bg-light border">{formatDate(a.date)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Attendance */}
        {view === "attendance" && (
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
                <h5 className="card-title mb-0">Mark Attendance</h5>
                <select
                  className="form-select form-select-sm w-auto"
                  value={attendanceClass}
                  onChange={(e) => setAttendanceClass(e.target.value)}
                >
                  {Object.keys(CLASSES).map((cls) => (
                    <option key={cls} value={cls}>
                      {cls}
                    </option>
                  ))}
                </select>
              </div>
              <p className="text-muted small mb-3">
                Click a student's status to cycle Present → Late → Absent.
              </p>

              <div className="d-flex flex-column gap-2" style={{ maxHeight: 420, overflowY: "auto" }}>
                {CLASSES[attendanceClass].map((name) => {
                  const status = attendance[attendanceClass][name];
                  return (
                    <div
                      key={name}
                      className="d-flex justify-content-between align-items-center p-2 px-3 rounded"
                      style={{ backgroundColor: "#f7f9fa", border: "1px solid #eee" }}
                    >
                      <span className="fw-medium">{name}</span>
                      <button
                        className={`btn btn-sm rounded-pill btn-${STATUS_BADGE[status]}`}
                        style={{ minWidth: 90 }}
                        onClick={() => cycleStatus(attendanceClass, name)}
                      >
                        {STATUS_LABEL[status]}
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="d-flex justify-content-between align-items-center mt-3">
                <span className="text-muted small">
                  {attendanceRate.present} / {attendanceRate.total} marked present
                </span>
                <button className="btn btn-primary" onClick={saveAttendance}>
                  {savedFlash === "attendance" ? "Saved ✓" : "Save Attendance"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Gradebook */}
        {view === "grades" && (
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
                <h5 className="card-title mb-0">Gradebook</h5>
                <select
                  className="form-select form-select-sm w-auto"
                  value={gradesClass}
                  onChange={(e) => setGradesClass(e.target.value)}
                >
                  {Object.keys(CLASSES).map((cls) => (
                    <option key={cls} value={cls}>
                      {cls}
                    </option>
                  ))}
                </select>
              </div>

              <div className="table-responsive">
                <table className="table align-middle">
                  <thead>
                    <tr className="text-muted small text-uppercase">
                      <th>Student</th>
                      <th>
                        CAT 1 <span className="text-muted fw-normal">/20</span>
                      </th>
                      <th>
                        CAT 2 <span className="text-muted fw-normal">/20</span>
                      </th>
                      <th>
                        Exam <span className="text-muted fw-normal">/60</span>
                      </th>
                      <th>Total</th>
                      <th>Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {CLASSES[gradesClass].map((name) => {
                      const g = grades[gradesClass][name];
                      const total = rowTotal(gradesClass, name);
                      const letter = letterGrade(total);
                      return (
                        <tr key={name}>
                          <td>{name}</td>
                          <td>
                            <input
                              type="number"
                              min="0"
                              max="20"
                              className="form-control form-control-sm"
                              style={{ width: 70 }}
                              value={g.cat1}
                              onChange={(e) => updateGradeField(gradesClass, name, "cat1", e.target.value)}
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              min="0"
                              max="20"
                              className="form-control form-control-sm"
                              style={{ width: 70 }}
                              value={g.cat2}
                              onChange={(e) => updateGradeField(gradesClass, name, "cat2", e.target.value)}
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              min="0"
                              max="60"
                              className="form-control form-control-sm"
                              style={{ width: 70 }}
                              value={g.exam}
                              onChange={(e) => updateGradeField(gradesClass, name, "exam", e.target.value)}
                            />
                          </td>
                          <td className="fw-bold">{total === null ? "-" : total}</td>
                          <td>
                            {letter !== "-" ? (
                              <span className={`badge text-bg-${GRADE_BADGE[letter]}`}>{letter}</span>
                            ) : (
                              "-"
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="d-flex justify-content-between align-items-center mt-2">
                <span className="text-muted small">
                  Class average: {classAverage === null ? "--" : `${classAverage} / 100`}
                </span>
                <button className="btn btn-primary" onClick={saveGrades}>
                  {savedFlash === "grades" ? "Saved ✓" : "Save Grades"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Assessments */}
        {view === "assessments" && (
          <div className="row g-3">
            <div className="col-lg-8">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title mb-3">All Assessments</h5>
                  <div className="d-flex flex-column gap-2">
                    {assessments
                      .slice()
                      .sort((a, b) => new Date(b.date) - new Date(a.date))
                      .map((a, i) => (
                        <div
                          key={i}
                          className="d-flex justify-content-between align-items-center p-2 px-3 rounded"
                          style={{ backgroundColor: "#f7f9fa", border: "1px solid #eee" }}
                        >
                          <div>
                            <div className="fw-semibold small">{a.title}</div>
                            <div className="text-muted" style={{ fontSize: "0.78rem" }}>
                              {a.cls} · {a.type} · Due {formatDate(a.date)}
                            </div>
                          </div>
                          <span
                            className={`badge rounded-pill text-bg-${
                              a.status === "Pending Grading" ? "warning" : "primary"
                            }`}
                          >
                            {a.status}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title mb-3">New Assessment</h5>
                  <form onSubmit={handleAddAssessment} className="d-flex flex-column gap-3">
                    <div>
                      <label className="form-label small fw-semibold">Title</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. End of Term Test"
                        value={newAssessment.title}
                        onChange={(e) => setNewAssessment((p) => ({ ...p, title: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <label className="form-label small fw-semibold">Class</label>
                      <select
                        className="form-select"
                        value={newAssessment.cls}
                        onChange={(e) => setNewAssessment((p) => ({ ...p, cls: e.target.value }))}
                      >
                        {Object.keys(CLASSES).map((cls) => (
                          <option key={cls} value={cls}>
                            {cls}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="form-label small fw-semibold">Type</label>
                      <select
                        className="form-select"
                        value={newAssessment.type}
                        onChange={(e) => setNewAssessment((p) => ({ ...p, type: e.target.value }))}
                      >
                        <option>CAT</option>
                        <option>Exam</option>
                        <option>Assignment</option>
                        <option>Project</option>
                      </select>
                    </div>
                    <div>
                      <label className="form-label small fw-semibold">Due Date</label>
                      <input
                        type="date"
                        className="form-control"
                        value={newAssessment.date}
                        onChange={(e) => setNewAssessment((p) => ({ ...p, date: e.target.value }))}
                        required
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Add Assessment
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function MetricCard({ title, value, subtext }) {
  return (
    <div className="col-6 col-lg-3">
      <div className="card border-0 shadow-sm h-100">
        <div className="card-body">
          <div className="text-uppercase text-muted small fw-semibold mb-2" style={{ fontSize: "0.72rem" }}>
            {title}
          </div>
          <div className="fs-3 fw-bold">{value}</div>
          <div className="text-muted small">{subtext}</div>
        </div>
      </div>
    </div>
  );
}
