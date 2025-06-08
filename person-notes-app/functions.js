function filterPeople(people, query) {
  return people.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
}

function addNoteToPerson(people, index, note) {
  const updated = people.map(p => ({...p, notes: [...p.notes]}));
  if (!note || !updated[index]) return updated;
  updated[index].notes.push(note);
  return updated;
}

module.exports = { filterPeople, addNoteToPerson };
