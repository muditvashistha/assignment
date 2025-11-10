import React, { useEffect, useState } from "react";
import { required } from "../utils/validators";

const empty = { id: null, name: "", role: "", department: "" };

export default function EmployeeForm({ open, initial, onClose, onSave, departments }) {
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});

  useEffect(() => { setForm(initial || empty); setErrors({}); }, [initial, open]);

  function validate() {
    const e = {};
    if (!required(form.name)) e.name = "Name is required";
    if (!required(form.role)) e.role = "Role is required";
    if (!required(form.department)) e.department = "Department is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    if (!validate()) return;
    onSave({ ...form, id: form.id ?? crypto.randomUUID() });
  }

  if (!open) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e)=>e.stopPropagation()} role="dialog" aria-modal="true">
        <header className="modal-header">
          <h2>{form.id ? "Edit Employee" : "Add Employee"}</h2>
          <button className="btn icon" onClick={onClose} aria-label="Close">✕</button>
        </header>

        <form className="form" onSubmit={handleSubmit}>
          <label>
            <span>Name</span>
            <input value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})} />
            {errors.name && <small className="error">{errors.name}</small>}
          </label>

          <label>
            <span>Role</span>
            <input value={form.role} onChange={(e)=>setForm({...form, role:e.target.value})} />
            {errors.role && <small className="error">{errors.role}</small>}
          </label>

          <label>
            <span>Department</span>
            <select value={form.department} onChange={(e)=>setForm({...form, department:e.target.value})}>
              <option value="">Choose…</option>
              {departments.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            {errors.department && <small className="error">{errors.department}</small>}
          </label>

          <div className="actions">
            <button type="button" className="btn ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn primary">{form.id ? "Save" : "Add"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
