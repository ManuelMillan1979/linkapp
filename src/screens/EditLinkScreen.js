import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function EditLinkScreen({ route, navigation }) {
const { id, name: initialName, url: initialUrl, category: initialCategory } = route.params;
const [name, setName] = useState(initialName);
const [url, setUrl] = useState(initialUrl);
const [category, setCategory] = useState(initialCategory);

const handleUpdate = async () => {
    await updateDoc(doc(db, 'links', id), { name, url, category });
    navigation.goBack();
};

return (
    <View style={styles.container}>
    <Text style={styles.title}>Editar Link</Text>
    <TextInput style={styles.input} value={name} onChangeText={setName} />
    <TextInput style={styles.input} value={url} onChangeText={setUrl} />
    <TextInput style={styles.input} value={category} onChangeText={setCategory} />
    <Button title="Actualizar" onPress={handleUpdate} />
    </View>
);
}

const styles = StyleSheet.create({
container: { flex: 1, padding: 20 },
input: { borderWidth: 1, marginBottom: 10, padding: 8, borderRadius: 5 },
title: { fontSize: 20, marginBottom: 10 }
});
