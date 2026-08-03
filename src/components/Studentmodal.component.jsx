import "../styles/Studentmodal.styles.css";

function AddStudentModal({ onClose, onAdd }) {
  function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = {
      name: form.name.value,
      class: form.class.value,
      stream: form.stream.value,
      parentName: form.parentName.value,
      parentPhone: form.parentPhone.value,
      admissionNo: form.admissionNo.value,
      feeStatus: "pending",
    };
    onAdd(formData);
  }

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>Add New Student</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-grid">
            <label className="field">
              <span>Full name</span>
              <input name="name" placeholder="e.g. Mwesigwa Joshua" required />
            </label>
            <label className="field">
              <span>Admission no.</span>
              <input name="admissionNo" placeholder="PSMS/2026/0000" required />
            </label>
            <label className="field">
              <span>Class</span>
              <input name="class" placeholder="e.g. Senior 3" required />
            </label>
            <label className="field">
              <span>Stream</span>
              <input name="stream" placeholder="e.g. A" required />
            </label>
            <label className="field">
              <span>Parent name</span>
              <input name="parentName" placeholder="e.g. Ssempijja Robert" required />
            </label>
            <label className="field">
              <span>Parent phone</span>
              <input name="parentPhone" placeholder="+256 7xx xxxxxx" required />
            </label>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-outline" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">Add Student</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddStudentModal;
