const KEY = "employees@directory";

const seed = [
  { id: crypto.randomUUID(), name: "Aarav Sharma", role: "Frontend Engineer", department: "Engineering" },
  { id: crypto.randomUUID(), name: "Meera Iyer", role: "Product Designer",   department: "Design" },
  { id: crypto.randomUUID(), name: "Kabir Singh", role: "Account Manager",   department: "Sales" },
  { id: crypto.randomUUID(), name: "Riya Patel",  role: "HR Specialist",     department: "HR" },
];

function read() {
  const raw = localStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : null;
}

function write(list) {
  localStorage.setItem(KEY, JSON.stringify(list));
  return list;
}

export function getAll() {
  const data = read();
  if (data?.length) return data;
  return write(seed);
}

export function save(emp) {
  const list = getAll();
  const idx = list.findIndex(e => e.id === emp.id);
  if (idx >= 0) list[idx] = emp;        // edit
  else list.unshift(emp);               // add to top
  return write(list);
}
