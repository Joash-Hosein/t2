import { useSQLiteContext } from 'expo-sqlite';
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';


const Login = () => {
    const db = useSQLiteContext();
    const [form, setForm] = useState({
        username: '',
        password: ''
    })
    const handleSubmit = async () => {
        try {
            if (!form.username || !form.password) {
                throw new Error("All fields are required.");
            }
            const results = await db.getAllAsync(
                `SELECT * FROM users WHERE username = ? AND password = ?`,
                [form.username, form.password]
            );
            if (results.length === 0) {
                throw new Error("Invalid username or password.");
            }
            Alert.alert("Success", "Login successful!");
            
            setForm({ username: '', password: '' });
        } catch (error) {
            Alert.alert("Error", error.message);
        }
     
        }
    
  return (
    <SafeAreaView style={styles.container}>
        <TextInput 
            style={styles.input}
            placeholder="Username"
            value={form.username}
            onChangeText={text => setForm({...form, username: text})}
        />
        <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={form.password}
            onChangeText={text => setForm({...form, password: text})}
        />
        <Button title="Login" onPress={handleSubmit} />
        <Link href="/register" style={styles.link}> register</Link>
    </SafeAreaView>

     

    )
}

export default Login;

const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            padding: 16,
        },  
    input: {
            height: 40,
            borderColor: 'gray', 
            borderWidth: 1,
            marginBottom: 12,
            paddingHorizontal: 8,
        },
         link:{
        marginTop: 10,
        color: 'blue',
      }
    });  