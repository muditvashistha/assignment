import React, { useEffect, useMemo, useState } from "react";
import SearchBar from "../components/SearchBar";
import EmployeeList from "../components/EmployeeList";
import EmployeeForm from "../components/EmployeeForm";
import * as EmployeeService from "../services/employeeService";

export default function Directory() {
  const [employees, setEmployees] = useState([]);
  const [query, setQuery] = useState("");
  const [dept, setDept] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    setEmployees(EmployeeService.getAll());
  }, []);

  const departments = useMemo(
    () => Array.from(new Set(employees.map((e) => e.department))).sort(),
    [employees]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return employees.filter(e => {
      const matchesQ = !q || `${e.name} ${e.role}`.toLowerCase().includes(q);
      const matchesDept = !dept || e.department === dept;
      return matchesQ && matchesDept;
    });
  }, [employees, query, dept]);

  function openAdd() { setEditing(null); setModalOpen(true); }
  function openEdit(emp) { setEditing(emp); setModalOpen(true); }

  function save(emp) {
    const updated = EmployeeService.save(emp);
    setEmployees(updated);
    setModalOpen(false);
  }

  return (
    <>
      <div className="toolbar">
        <SearchBar query={query} dept={dept} onQuery={setQuery} onDept={setDept} depts={departments} />
        <button className="btn primary" onClick={openAdd}>+ Add Employee</button>
      </div>
      <EmployeeList employees={filtered} onEdit={openEdit} />
      <EmployeeForm
        open={modalOpen}
        initial={editing}
        onClose={() => setModalOpen(false)}
        onSave={save}
        departments={["Engineering","Design","Sales","HR","Finance", ...departments.filter(d=>!["Engineering","Design","Sales","HR","Finance"].includes(d))]}
      />
    </>
  );
}
