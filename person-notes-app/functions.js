function filterPeople(people, query) {
  return people.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );
}

function addNoteToPerson(people, id, note) {
  const updated = people.map(p => ({...p, notes: [...p.notes]}));
  const idx = updated.findIndex(p => p.id === id);
  if (!note || idx === -1) return updated;
  updated[idx].notes.push(note);
  return updated;
}

module.exports = { filterPeople, addNoteToPerson };
