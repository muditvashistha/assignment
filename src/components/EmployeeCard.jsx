import React from "react";

export default function EmployeeCard({ emp, onEdit }) {
  return (
    <article className="card">
      <div className="avatar" aria-hidden>
        {emp.name.split(" ").map(p=>p[0]).slice(0,2).join("")}
      </div>
      <div className="card-body">
        <h3 className="card-title">{emp.name}</h3>
        <p className="muted">{emp.role}</p>
        <span className="pill">{emp.department}</span>
      </div>
      <button className="btn ghost" onClick={() => onEdit(emp)}>Edit</button>
    </article>
  );
}
