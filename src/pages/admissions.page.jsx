// import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useEffect, useState } from 'react';
import FormButton from '../components/auth/FormButton.component';
import FormInput from '../components/auth/FormInput.component';

const Admissions = () => {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState('');
  const [form, setForm] = useState({
    // Step 1: Personal Info
    fullName: '',
    gender: '',
    dob: '',
    nationality: 'Ugandan',
    // Step 2: Location Details
    district: '',
    subCounty: '',
    parish: '',
    village: '',
    // Step 3: Parent/Guardian Details
    guardianName: '',
    guardianPhone: '',
    guardianRelationship: '',
    guardianNIN: '',
    // Step 4: Documents
    birthCertificate: null,
    pleResults: null,
    parentID: null,
  });

  useEffect(() => {
    const draft = localStorage.getItem('admissionDraft');
    if (draft) {
      try {
        const parsed = JSON.parse(draft);
        setForm((f) => ({ ...f, ...parsed }));
      } catch (e) {
        console.error('Error loading draft', e);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setForm((f) => ({ ...f, [name]: files[0] ? files[0].name : '' }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const saveDraft = () => {
    localStorage.setItem('admissionDraft', JSON.stringify(form));
    setStatus('Draft saved locally');
    setTimeout(() => setStatus(''), 2500);
  };

  const submitApplication = () => {
    if (!form.fullName || !form.dob) {
      setStatus('Please fill required personal fields');
      setTimeout(() => setStatus(''), 2500);
      return;
    }
    console.log('Submitting application', form);
    localStorage.removeItem('admissionDraft');
    setStatus('Application submitted');
    setTimeout(() => setStatus(''), 2500);
  };

  const nextStep = () => {
    setStep((s) => Math.min(4, s + 1));
    setStatus('Moved to next step');
    setTimeout(() => setStatus(''), 1500);
  };

  const prevStep = () => {
    setStep((s) => Math.max(1, s - 1));
  };

  return (
    <div className="container-fluid px-4 py-3 vh-100 d-flex flex-column justify-content-between bg-light">
      
      {/* Header Bar */}
      <div className="d-flex justify-content-between align-items-start mb-2">
        <div>
          <a href="#back" className="text-decoration-none text-primary fw-semibold d-inline-flex align-items-center gap-1 mb-1 small">
            &larr; Back to Admissions Dashboard
          </a>
          <h2 className="h4 fw-bold text-dark mb-0">New Student Admission</h2>
          <span className="text-secondary opacity-75" style={{ fontSize: '0.78rem' }}>
            Academic Year 2024 &bull; Term 1 Enrollment
          </span>
          {status && (
            <div className="alert alert-info py-1 px-2 mt-1 mb-0 border-0 rounded small" role="alert" style={{ fontSize: '0.75rem' }}>
              {status}
            </div>
          )}
        </div>

        <div className="d-flex gap-2">
          <FormButton 
            type="button" 
            className="btn btn-light bg-white border-0 px-3 py-1 text-dark shadow-sm rounded-3 small fw-medium"
            style={{ fontSize: '0.8rem' }}
            onClick={saveDraft}
          >
            Save as Draft
          </FormButton>
          <FormButton 
            type="button" 
            className="btn text-white px-3 py-1 shadow-sm rounded-3 small fw-medium border-0"
            style={{ backgroundColor: '#2E00CD', fontSize: '0.8rem' }}
            onClick={submitApplication}
          >
            Submit Application
          </FormButton>
        </div>
      </div>

      {/* Main Container Card */}
      <div className="card border-0 shadow-sm rounded-4 bg-white flex-grow-1 d-flex flex-column mb-3 overflow-hidden">
        
        {/* Step Navigation Ribbon */}
        <div className="px-4 pt-2 bg-light">
          <ul className="nav nav-pills gap-4 align-items-center border-0 list-unstyled d-flex mb-0">
            {[
              { id: 1, label: 'Personal Info' },
              { id: 2, label: 'Location Details' },
              { id: 3, label: 'Parent/Guardian' },
              { id: 4, label: 'Documents' },
            ].map((s) => (
              <li key={s.id} className="nav-item">
                <button 
                  type="button"
                  className={`nav-link p-0 pb-2 border-0 bg-transparent d-flex align-items-center gap-2 fw-semibold rounded-0 ${
                    step === s.id ? 'text-primary border-bottom border-2 border-primary' : 'text-secondary opacity-75'
                  }`}
                  style={{ fontSize: '0.82rem' }}
                  onClick={() => setStep(s.id)}
                >
                  <span className={`badge rounded-circle d-inline-flex align-items-center justify-content-center p-0 ${
                    step === s.id ? 'bg-primary text-white' : 'bg-secondary bg-opacity-25 text-secondary'
                  }`} style={{ width: '18px', height: '18px', fontSize: '0.68rem' }}>
                    {s.id}
                  </span>
                  {s.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Dynamic Form Content */}
        <div className="card-body p-4 d-flex flex-column justify-content-between flex-grow-1">
          
          {/* STEP 1: Personal Info */}
          {step === 1 && (
            <div className="row g-3">
              <div className="col-12 col-md-6">
                <label className="form-label text-uppercase fw-bold text-secondary" style={{ fontSize: '0.68rem' }}>
                  FULL LEGAL NAME
                </label>
                <FormInput
                  type="text"
                  className="form-control form-control-sm bg-light border-1 rounded-3"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="As it appears on birth certificate"
                />
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label text-uppercase fw-bold text-secondary" style={{ fontSize: '0.68rem' }}>
                  DATE OF BIRTH
                </label>
                <FormInput
                  type="text"
                  className="form-control form-control-sm bg-light border-1 rounded-3"
                  name="dob"
                  value={form.dob}
                  onChange={handleChange}
                  placeholder="mm/dd/yyyy"
                  onFocus={(e) => (e.target.type = 'date')}
                  onBlur={(e) => {
                    if (!e.target.value) e.target.type = 'text';
                  }}
                />
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label text-uppercase fw-bold text-secondary" style={{ fontSize: '0.68rem' }}>
                  GENDER
                </label>
                <select 
                  className="form-select form-select-sm bg-light border-1 rounded-3 text-secondary"
                  name="gender" 
                  value={form.gender} 
                  onChange={handleChange}
                >
                  <option value="" disabled hidden>Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label text-uppercase fw-bold text-secondary" style={{ fontSize: '0.68rem' }}>
                  NATIONALITY
                </label>
                <FormInput
                  type="text"
                  className="form-control form-control-sm bg-light border-1 rounded-3"
                  name="nationality"
                  value={form.nationality}
                  onChange={handleChange}
                  placeholder="Ugandan"
                />
              </div>
            </div>
          )}

          {/* STEP 2: Location Details */}
          {step === 2 && (
            <div className="row g-3">
              <div className="col-12 col-md-6">
                <label className="form-label text-uppercase fw-bold text-secondary" style={{ fontSize: '0.68rem' }}>
                  DISTRICT / CITY
                </label>
                <FormInput
                  type="text"
                  className="form-control form-control-sm bg-light border-1 rounded-3"
                  name="district"
                  value={form.district}
                  onChange={handleChange}
                  placeholder="e.g. Kampala, Wakiso"
                />
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label text-uppercase fw-bold text-secondary" style={{ fontSize: '0.68rem' }}>
                  SUB-COUNTY / DIVISION
                </label>
                <FormInput
                  type="text"
                  className="form-control form-control-sm bg-light border-1 rounded-3"
                  name="subCounty"
                  value={form.subCounty}
                  onChange={handleChange}
                  placeholder="e.g. Nakawa Division"
                />
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label text-uppercase fw-bold text-secondary" style={{ fontSize: '0.68rem' }}>
                  PARISH / WARD
                </label>
                <FormInput
                  type="text"
                  className="form-control form-control-sm bg-light border-1 rounded-3"
                  name="parish"
                  value={form.parish}
                  onChange={handleChange}
                  placeholder="Enter Parish"
                />
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label text-uppercase fw-bold text-secondary" style={{ fontSize: '0.68rem' }}>
                  VILLAGE / LC1
                </label>
                <FormInput
                  type="text"
                  className="form-control form-control-sm bg-light border-1 rounded-3"
                  name="village"
                  value={form.village}
                  onChange={handleChange}
                  placeholder="Enter Village/Zone"
                />
              </div>
            </div>
          )}

          {/* STEP 3: Parent / Guardian */}
          {step === 3 && (
            <div className="row g-3">
              <div className="col-12 col-md-6">
                <label className="form-label text-uppercase fw-bold text-secondary" style={{ fontSize: '0.68rem' }}>
                  GUARDIAN FULL NAME
                </label>
                <FormInput
                  type="text"
                  className="form-control form-control-sm bg-light border-1 rounded-3"
                  name="guardianName"
                  value={form.guardianName}
                  onChange={handleChange}
                  placeholder="Parent or Guardian's Name"
                />
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label text-uppercase fw-bold text-secondary" style={{ fontSize: '0.68rem' }}>
                  PHONE NUMBER
                </label>
                <FormInput
                  type="tel"
                  className="form-control form-control-sm bg-light border-1 rounded-3"
                  name="guardianPhone"
                  value={form.guardianPhone}
                  onChange={handleChange}
                  placeholder="+256 700 000 000"
                />
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label text-uppercase fw-bold text-secondary" style={{ fontSize: '0.68rem' }}>
                  RELATIONSHIP
                </label>
                <select 
                  className="form-select form-select-sm bg-light border-0 rounded-3 text-secondary"
                  name="guardianRelationship" 
                  value={form.guardianRelationship} 
                  onChange={handleChange}
                >
                  <option value="" disabled hidden>Select Relationship</option>
                  <option value="Father">Father</option>
                  <option value="Mother">Mother</option>
                  <option value="Guardian">Guardian</option>
                </select>
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label text-uppercase fw-bold text-secondary" style={{ fontSize: '0.68rem' }}>
                  NATIONAL ID (NIN)
                </label>
                <FormInput
                  type="text"
                  className="form-control form-control-sm bg-light border-1 rounded-3"
                  name="guardianNIN"
                  value={form.guardianNIN}
                  onChange={handleChange}
                  placeholder="CM1234567890"
                />
              </div>
            </div>
          )}

          {/* STEP 4: Documents Upload */}
          {step === 4 && (
            <div className="row g-3">
              <div className="col-12 col-md-4">
                <label className="form-label text-uppercase fw-bold text-secondary" style={{ fontSize: '0.68rem' }}>
                  BIRTH CERTIFICATE
                </label>
                <FormInput
                  type="file"
                  className="form-control form-control-sm bg-light border-1 rounded-3"
                  name="birthCertificate"
                  onChange={handleChange}
                />
              </div>

              <div className="col-12 col-md-4">
                <label className="form-label text-uppercase fw-bold text-secondary" style={{ fontSize: '0.68rem' }}>
                  PLE RESULT SLIP
                </label>
                <FormInput
                  type="file"
                  className="form-control form-control-sm bg-light border-1 rounded-3"
                  name="pleResults"
                  onChange={handleChange}
                />
              </div>

              <div className="col-12 col-md-4">
                <label className="form-label text-uppercase fw-bold text-secondary" style={{ fontSize: '0.68rem' }}>
                  PARENT ID COPY
                </label>
                <FormInput
                  type="file"
                  className="form-control form-control-sm bg-light border-1 rounded-3"
                  name="parentID"
                  onChange={handleChange}
                />
              </div>
            </div>
          )}

          {/* Banner & Action Controls */}
          <div className="mt-auto pt-3">
            <div 
              className="alert border-0 rounded-3 py-2 px-3 mb-3 d-flex align-items-center gap-2"
              style={{ backgroundColor: '#EEF2FF', color: '#312E81', fontSize: '0.78rem' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
              <span>
                Ensure all details are accurate according to official local council and result documents.
              </span>
            </div>

            <div className="d-flex justify-content-between align-items-center">
              {step > 1 ? (
                <button 
                  type="button" 
                  className="btn btn-light bg-white border-0 px-3 py-1 rounded-3 fw-medium text-secondary shadow-sm"
                  style={{ fontSize: '0.8rem' }}
                  onClick={prevStep}
                >
                  &lsaquo; Previous
                </button>
              ) : <div />}

              {step < 4 ? (
                <button 
                  type="button" 
                  className="btn text-white px-3 py-1 rounded-3 fw-medium border-0 shadow-sm"
                  style={{ backgroundColor: '#2E00CD', fontSize: '0.8rem' }}
                  onClick={nextStep}
                >
                  Next &rsaquo;
                </button>
              ) : (
                <button 
                  type="button" 
                  className="btn text-white px-3 py-1 rounded-3 fw-medium border-0 shadow-sm"
                  style={{ backgroundColor: '#10B981', fontSize: '0.8rem' }}
                  onClick={submitApplication}
                >
                  Complete Submission
                </button>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Auxiliary Section */}
      <div className="row g-3">
        
        <div className="col-12 col-md-4">
          <div className="card border-0 shadow-sm rounded-4 p-3 h-100 bg-white">
            <div className="d-flex align-items-center gap-2 mb-1 text-primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
              <h3 className="h6 fw-bold mb-0 text-dark" style={{ fontSize: '0.85rem' }}>Need Help?</h3>
            </div>
            <p className="text-secondary mb-0 lh-sm opacity-75" style={{ fontSize: '0.75rem' }}>
              Contact the registrar's office if you have trouble obtaining any location details.
            </p>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="card border-0 shadow-sm rounded-4 p-3 h-100" style={{ backgroundColor: '#EEF2FF' }}>
            <div className="d-flex align-items-center gap-2 mb-2 text-primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <h3 className="h6 fw-bold mb-0 text-primary" style={{ fontSize: '0.85rem' }}>Requirements</h3>
            </div>
            <ul className="list-unstyled text-secondary mb-0 d-flex flex-column gap-1 opacity-75" style={{ fontSize: '0.75rem' }}>
              <li className="d-flex align-items-center gap-2">
                <span className="text-primary fw-bold">&check;</span> Valid Birth Certificate
              </li>
              <li className="d-flex align-items-center gap-2">
                <span className="text-primary fw-bold">&check;</span> PLE Index Number
              </li>
              <li className="d-flex align-items-center gap-2">
                <span className="text-primary fw-bold">&check;</span> Parent ID Copy
              </li>
            </ul>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div 
            className="card border-0 shadow-sm rounded-4 p-3 h-100 text-white d-flex align-items-start justify-content-end overflow-hidden position-relative"
            style={{ 
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.65)), url('https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&q=80&w=800')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              minHeight: '100px'
            }}
          >
            <h3 className="fw-bold mb-0 position-relative z-1 text-white" style={{ fontSize: '1rem' }}>
              Welcome to PSMS.
            </h3>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Admissions;