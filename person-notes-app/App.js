import React, {useState} from 'react';
import {FlatList, View} from 'react-native';
import {Provider as PaperProvider, Appbar, Searchbar, Card, TextInput, Button, List} from 'react-native-paper';
import {filterPeople, addNoteToPerson} from './functions';

export default function App() {
  const [people, setPeople] = useState([
    {name: 'Alice', notes: []},
    {name: 'Bob', notes: []},
    {name: 'Charlie', notes: []},
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [noteInputs, setNoteInputs] = useState({});

  const filtered = filterPeople(people, searchQuery);

  const addNote = (index) => {
    const note = noteInputs[index];
    if (!note) return;
    const updated = addNoteToPerson(people, index, note);
    setPeople(updated);
    setNoteInputs({...noteInputs, [index]: ''});
  };

  const renderItem = ({item, index}) => (
    <Card style={{margin: 8}}>
      <Card.Title title={item.name} />
      <Card.Content>
        {item.notes.map((n, i) => (
          <List.Item key={i} title={n} left={() => <List.Icon icon="note" />} />
        ))}
        <TextInput
          label="Add Note"
          value={noteInputs[index] || ''}
          onChangeText={t => setNoteInputs({...noteInputs, [index]: t})}
        />
        <Button onPress={() => addNote(index)}>Add</Button>
      </Card.Content>
    </Card>
  );

  return (
    <PaperProvider>
      <Appbar.Header>
        <Appbar.Content title="Person Notes" />
      </Appbar.Header>
      <View style={{padding: 8, flex: 1}}>
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={{marginBottom: 8}}
        />
        <FlatList
          data={filtered}
          renderItem={renderItem}
          keyExtractor={(_, i) => String(i)}
        />
      </View>
    </PaperProvider>
  );
}
