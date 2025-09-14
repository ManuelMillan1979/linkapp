import React, { useState, useContext, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import { AuthContext } from '../context/AuthContext';

export default function AddLink() {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');
  const [currentCount, setCurrentCount] = useState(0);

  const { plan } = useContext(AuthContext);

  useEffect(() => {
    // contamos links del usuario
    const fetchCount = async () => {
      const q = query(
        collection(db, 'links'),
        where('userId', '==', auth.currentUser.uid)
      );
      const snap = await getDocs(q);
      setCurrentCount(snap.size);
    };
    fetchCount();
  }, []);

  const handleAddLink = async () => {
    // si es free y tiene 20 links, bloquea
    if (plan === 'free' && currentCount >= 20) {
      setError('Has alcanzado el límite de 20 enlaces en el plan Free');
      return;
    }
    try {
      await addDoc(collection(db, 'links'), {
        name,
        url,
        category,
        userId: auth.currentUser.uid,
        createdAt: new Date(),
      });
      setName('');
      setUrl('');
      setCategory('');
      setError('');
      setCurrentCount(currentCount + 1); // actualiza localmente
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar enlace</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="URL"
        value={url}
        onChangeText={setUrl}
      />
      <TextInput
        style={styles.input}
        placeholder="Categoría"
        value={category}
        onChangeText={setCategory}
      />
      <Button title="Agregar" onPress={handleAddLink} />
      <Text style={styles.counter}>
        {`Tienes ${currentCount} enlaces / Límite ${plan === 'free' ? 20 : '∞'}`}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { borderWidth: 1, marginBottom: 10, padding: 8, borderRadius: 5 },
  error: { color: 'red', marginBottom: 10 },
  title: { fontSize: 20, marginBottom: 10 },
  counter: { marginTop: 5, textAlign: 'center', color: '#555' },
});
