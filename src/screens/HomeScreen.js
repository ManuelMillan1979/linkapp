import React, { useState } from 'react';
import { View, SafeAreaView, Button, StyleSheet } from 'react-native';
import AddLink from '../components/AddLink';
import LinkList from '../components/LinkList';
import { auth } from '../firebaseConfig';

export default function HomeScreen() {
const [refresh, setRefresh] = useState(false);

const handleLinkAdded = () => {
    setRefresh(prev => !prev);
};

return (
    <SafeAreaView style={styles.container}>
    <View style={styles.header}>
        <Button title="Cerrar sesión" onPress={() => auth.signOut()} />
    </View>

    <AddLink onLinkAdded={handleLinkAdded} />

    <View style={styles.listContainer}>
        <LinkList refresh={refresh} />
    </View>
    </SafeAreaView>
);
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#fff'
},
header: {
    padding: 10,
    alignItems: 'flex-end'
},
listContainer: {
    flex: 1
}
});
