import { Link } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useState } from 'react';
import { Alert, Button, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const Register = () => {
    const db = useSQLiteContext();
    const router = useRouter();
    const [form, setForm] = useState({
        fullname: '',
        username: '',
        email: '',
        password: '',
        language: ''

    })

    const handleSubmit = async () => {
        try {
            if (!form.fullname || !form.username || !form.email || !form.password || !form.language) {
                throw new Error("All fields are required.");
            }
            await db.runAsync(
                `INSERT INTO users (fullname, username, email, password, language) VALUES (?, ?, ?, ?, ?)`,
                [form.fullname, form.username, form.email, form.password, form.language]
            );
            Alert.alert("Success", "User registered successfully!");
            router.replace('/login');
            setForm({ fullname: '', username: '', email: '', password: '', language: '' });
        } catch (error) {
            Alert.alert("Error", error.message);
        }
      }



  return (
    <SafeAreaView style={styles.container}>
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
      <Button title="Register" onPress={handleSubmit} />
      <Link href="/login" style={styles.link}> login</Link>
    </SafeAreaView>
  )

};

export default Register;

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
         borderColor: 'blue',
        borderRadius: 5,
        padding: 10,
        marginTop: 10,
        color: 'blue',
      }
    });  