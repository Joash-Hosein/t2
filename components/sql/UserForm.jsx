import { useSQLiteContext } from 'expo-sqlite';
import { useState } from 'react';
import { Alert, Button, StyleSheet, TextInput, View } from 'react-native';

const UserForm = () => {
    const [form, setForm] = useState({
        fullname: '',
        username: '',
        email: '',
        password: '',
        language: ''
    });
    const db = useSQLiteContext();

    const handleSubmit = async () => {
        try {
            
            if (!form.fullname || !form.username || !form.email || !form.password || !form.language) {
                throw new Error("All fields are required.");
            }
            await db.runAsync(
                `INSERT INTO users (fullname, username, email, password, language) VALUES (?, ?, ?, ?, ?)`,
                [form.fullname, form.username, form.email, form.password, form.language]
            );
            Alert.alert("Success", "User added successfully!");
            setForm({ fullname: '', username: '', email: '', password: '', language: '' });
        } catch (error) {
            Alert.alert("Error", error.message);
        }
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Full Name"
                value={form.fullname}
                onChangeText={text => setForm({...form, fullname: text})}
            />
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={form.username}
                onChangeText={text => setForm({...form, username: text})}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={form.email}
                onChangeText={text => setForm({...form, email: text})}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={form.password}
                onChangeText={text => setForm({...form, password: text})}
            />
            <TextInput
                style={styles.input}
                placeholder="Language"
                value={form.language}
                onChangeText={text => setForm({...form, language: text})}
            />
            <Button title="Submit" onPress={handleSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});

export default UserForm;
