import React from "react";

export default function SearchBar({ query, dept, onQuery, onDept, depts }) {
  return (
    <div className="searchbar">
      <input
        value={query}
        onChange={(e) => onQuery(e.target.value)}
        placeholder="Search by name or role…"
        aria-label="Search employees"
      />
      <select value={dept} onChange={(e) => onDept(e.target.value)} aria-label="Filter by department">
        <option value="">All Departments</option>
        {depts.map((d) => (
          <option key={d} value={d}>{d}</option>
        ))}
      </select>
    </div>
  );
}
