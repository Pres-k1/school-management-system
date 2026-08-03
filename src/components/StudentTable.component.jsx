import "../styles/StudentTable.styles.css";

const AVATAR_TONES = ["tone-a", "tone-b", "tone-c", "tone-d"];

function toneFor(id) {
  return AVATAR_TONES[id % AVATAR_TONES.length];
}

function StudentTable({ students = [], onView, onEdit }) {
  return (
    <section className="student-table">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Admission No</th>
            <th>Class/Stream</th>
            <th>Parent Name</th>
            <th>Fee Status</th>
            <th className="col-actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>
                <div className="student-cell">
                  <div className={`avatar ${toneFor(student.id)}`}>{student.initials}</div>
                  <div>
                    <div className="student-name">{student.name}</div>
                    <div className="student-email">{student.email}</div>
                  </div>
                </div>
              </td>
              <td>{student.admissionNo}</td>
              <td>
                <span className="class-pill">{student.class}</span> {student.stream}
              </td>
              <td>
                <div className="parent-name">{student.parentName}</div>
                <div className="parent-phone">{student.parentPhone}</div>
              </td>
              <td>
                <span className={`status-badge ${student.feeStatus}`}>{student.feeStatus}</span>
              </td>
              <td className="col-actions">
                <button className="action-btn" title="View" onClick={() => onView?.(student)}>👁</button>
                <button className="action-btn" title="Edit" onClick={() => onEdit?.(student)}>✎</button>
              </td>
            </tr>
          ))}

          {students.length === 0 && (
            <tr>
              <td colSpan={6} className="empty-row">No students match your filters.</td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
}

export default StudentTable;
