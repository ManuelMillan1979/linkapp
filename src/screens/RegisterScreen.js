import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';

export default function RegisterScreen({ navigation }) {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState('');

const register = async () => {
    try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
      // Por defecto plan free
    await setDoc(doc(db, 'users', cred.user.uid), { plan: 'free' });
    navigation.navigate('Home');
    } catch (err) {
    setError(err.message);
    }
};

return (
    <View style={styles.container}>
    <Text style={styles.title}>Registrarse</Text>
    {error ? <Text style={styles.error}>{error}</Text> : null}
    <TextInput style={styles.input} placeholder="Email" onChangeText={setEmail} />
    <TextInput style={styles.input} placeholder="Contraseña" secureTextEntry onChangeText={setPassword} />
    <Button title="Crear cuenta" onPress={register} />
    </View>
);
}

const styles = StyleSheet.create({
container: { flex: 1, justifyContent: 'center', padding: 20 },
title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
input: { borderWidth: 1, marginBottom: 10, padding: 8, borderRadius: 5 },
error: { color: 'red', marginBottom: 10 }
});
