import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

export default function LoginScreen({ navigation }) {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState('');

const login = async () => {
    try {
    await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
    setError(err.message);
    }
};

return (
    <View style={styles.container}>
    <Text style={styles.title}>Iniciar Sesión</Text>
    {error ? <Text style={styles.error}>{error}</Text> : null}
    <TextInput style={styles.input} placeholder="Email" onChangeText={setEmail} />
    <TextInput style={styles.input} placeholder="Contraseña" secureTextEntry onChangeText={setPassword} />
    <Button title="Entrar" onPress={login} />
    <Button title="Registrarse" onPress={() => navigation.navigate('Register')} />
    </View>
);
}

const styles = StyleSheet.create({
container: { flex: 1, justifyContent: 'center', padding: 20 },
title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
input: { borderWidth: 1, marginBottom: 10, padding: 8, borderRadius: 5 },
error: { color: 'red', marginBottom: 10 }
});
