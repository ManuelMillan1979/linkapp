import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Button, Linking, StyleSheet } from 'react-native';
import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useNavigation } from '@react-navigation/native';

export default function LinkList({ refresh }) {
const [links, setLinks] = useState([]);
const [search, setSearch] = useState('');
const navigation = useNavigation();

useEffect(() => {
    const unsub = onSnapshot(collection(db, 'links'), (snapshot) => {
    const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
    setLinks(data);
    });
    return () => unsub();
}, [refresh]);

const filtered = links.filter(l =>
    l.name.toLowerCase().includes(search.toLowerCase())
);

const deleteLink = async (id) => {
    await deleteDoc(doc(db, 'links', id));
};

return (
    <View style={styles.container}>
    <TextInput
        style={styles.input}
        placeholder="Buscar"
        value={search}
        onChangeText={setSearch}
    />
    <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
        <View style={styles.item}>
            <Text
            style={styles.text}
            onPress={() => Linking.openURL(item.url)}
            >
            {item.name} ({item.category})
            </Text>
            <View style={styles.buttons}>
            <Button title="Editar" onPress={() => navigation.navigate('EditLink', { link: item })} />
            <Button title="Eliminar" onPress={() => deleteLink(item.id)} />
            </View>
        </View>
        )}
    />
    </View>
);
}

const styles = StyleSheet.create({
container: { flex: 1, padding: 10 },
input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    padding: 8,
    borderRadius: 5
},
item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
},
buttons: {
    flexDirection: 'row',
    gap: 5
},
text: { fontSize: 16, color: 'blue', flex: 1 }
});
