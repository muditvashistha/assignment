import React from "react";
import EmployeeCard from "./EmployeeCard";

export default function EmployeeList({ employees, onEdit }) {
  if (!employees.length) {
    return <p className="empty">No employees match your search.</p>;
  }
  return (
    <section className="grid">
      {employees.map((e) => (
        <EmployeeCard key={e.id} emp={e} onEdit={onEdit} />
      ))}
    </section>
  );
}
