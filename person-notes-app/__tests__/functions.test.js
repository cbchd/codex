const {filterPeople, addNoteToPerson} = require('../functions');

describe('filterPeople', () => {
  it('filters people case-insensitively', () => {
    const people = [
      {id: 0, name: 'Alice'},
      {id: 1, name: 'Bob'},
      {id: 2, name: 'Charlie'},
    ];
    const result = filterPeople(people, 'al');
    expect(result).toEqual([{id: 0, name: 'Alice'}]);
  });
});

describe('addNoteToPerson', () => {
  it('adds a note to the specified person without mutating others', () => {
    const people = [
      {id: 0, name: 'Alice', notes: []},
      {id: 1, name: 'Bob', notes: ['old']},
    ];
    const updated = addNoteToPerson(people, 0, 'new');
    expect(updated[0].notes).toContain('new');
    expect(updated[1].notes).toEqual(['old']);
    expect(people[0].notes).toEqual([]); // original not mutated
  });
  it('adds a note to the correct person when list is filtered', () => {
    const people = [
      {id: 0, name: 'Alice', notes: []},
      {id: 1, name: 'Bob', notes: []},
    ];
    const filtered = filterPeople(people, 'bo');
    const updated = addNoteToPerson(people, filtered[0].id, 'hey');
    expect(updated[1].notes).toEqual(['hey']);
    expect(updated[0].notes).toEqual([]);
  });
});
