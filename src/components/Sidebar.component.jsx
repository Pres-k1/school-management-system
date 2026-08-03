import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/Sidebar.styles.css";

const NAV_GROUPS = [
  { label: "Dashboard", to: "/" },
  {
    label: "Admissions",
    children: [
      { label: "New Admission", to: "/admissions/new" },
      { label: "Pending Review", to: "/admissions/pending" },
    ],
  },
  {
    label: "Students",
    children: [
      { label: "Directory", to: "/students" },
      { label: "Suspensions", to: "/students/suspensions" },
    ],
  },
  { label: "Teachers", to: "/teachers" },
  { label: "Parents", to: "/parents"},
  { label: "Classes", to: "/classes" },
  { label: "Subjects", to: "/subjects" },
  { label: "Timetable", to: "/timetable" },
  { label: "Attendance", to: "/attendance" },
  { label: "Examinations", to: "/examinations" },
  {
    label: "School Fees",
    children: [
      { label: "Fee Structure", to: "/fees/structure" },
      { label: "Payments", to: "/fees/payments" },
    ],
  },
];

function Sidebarcomponent({ onNewAdmission }) {
  const [openGroup, setOpenGroup] = useState(null);
  const navigate = useNavigate();

  function toggleGroup(label) {
    setOpenGroup((prev) => (prev === label ? null : label));
  }

  return (
    <aside className="sidebar">
      <div className="brand">
        <h1>PSMS Uganda</h1>
        <span>Admin Portal</span>
      </div>

      <button
        className="btn-new-admission"
        onClick={() => (onNewAdmission ? onNewAdmission() : navigate("/admissions/new"))}
      >
        + New Admission
      </button>

      <nav className="sidebar-nav" onMouseLeave={() => setOpenGroup(null)}>
        {NAV_GROUPS.map((group) =>
          group.children ? (
            <div className="nav-group" key={group.label}>
              <button
                type="button"
                className={`nav-item nav-toggle ${openGroup === group.label ? "open" : ""}`}
                onClick={() => toggleGroup(group.label)}
                onMouseEnter={() => setOpenGroup(group.label)}
                aria-expanded={openGroup === group.label}
              >
                <span className="nav-item-label">
                  <span className="icon">{group.icon}</span>
                  {group.label}
                </span>
                <span className="chevron">{openGroup === group.label ? "▾" : "▸"}</span>
              </button>

              {openGroup === group.label && (
                <div className="glass-flyout">
                  {group.children.map((child) => (
                    <NavLink
                      key={child.to}
                      to={child.to}
                      className={({ isActive }) => `flyout-item ${isActive ? "active" : ""}`}
                      onClick={() => setOpenGroup(null)}
                    >
                      {child.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <NavLink
              key={group.to}
              to={group.to}
              end={group.to === "/"}
              className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
              onMouseEnter={() => setOpenGroup(null)}
            >
              <span className="icon">{group.icon}</span> {group.label}
            </NavLink>
          )
        )}
      </nav>

      <div className="sidebar-bottom">
        <a className="nav-item">
          <span className="icon">⚙</span> Settings
        </a>
        <a className="nav-item logout">
          <span className="icon">⎋</span> Logout
        </a>
      </div>
    </aside>
  );
}

export default Sidebarcomponent;
