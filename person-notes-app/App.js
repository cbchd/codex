import React, {useState} from 'react';
import {FlatList, View} from 'react-native';
import {Provider as PaperProvider, Appbar, Searchbar, Card, TextInput, Button, List} from 'react-native-paper';
import {filterPeople, addNoteToPerson} from './functions';

export default function App() {
  const [people, setPeople] = useState([
    {id: 0, name: 'Alice', notes: []},
    {id: 1, name: 'Bob', notes: []},
    {id: 2, name: 'Charlie', notes: []},
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [noteInputs, setNoteInputs] = useState({});

  const filtered = filterPeople(people, searchQuery);

  const addNote = (id) => {
    const note = noteInputs[id];
    if (!note) return;
    const updated = addNoteToPerson(people, id, note);
    setPeople(updated);
    setNoteInputs({...noteInputs, [id]: ''});
  };

  const renderItem = ({item}) => (
    <Card style={{margin: 8}}>
      <Card.Title title={item.name} />
      <Card.Content>
        {item.notes.map((n, i) => (
          <List.Item key={i} title={n} left={() => <List.Icon icon="note" />} />
        ))}
        <TextInput
          label="Add Note"
          value={noteInputs[item.id] || ''}
          onChangeText={t => setNoteInputs({...noteInputs, [item.id]: t})}
        />
        <Button onPress={() => addNote(item.id)}>Add</Button>
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
          keyExtractor={item => String(item.id)}
        />
      </View>
    </PaperProvider>
  );
}
