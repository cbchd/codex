const {filterPeople, addNoteToPerson} = require('../functions');

describe('filterPeople', () => {
  it('filters people case-insensitively', () => {
    const people = [{name: 'Alice'}, {name: 'Bob'}, {name: 'Charlie'}];
    const result = filterPeople(people, 'al');
    expect(result).toEqual([{name: 'Alice'}]);
  });
});

describe('addNoteToPerson', () => {
  it('adds a note to the specified person without mutating others', () => {
    const people = [
      {name: 'Alice', notes: []},
      {name: 'Bob', notes: ['old']},
    ];
    const updated = addNoteToPerson(people, 0, 'new');
    expect(updated[0].notes).toContain('new');
    expect(updated[1].notes).toEqual(['old']);
    expect(people[0].notes).toEqual([]); // original not mutated
  });
});
