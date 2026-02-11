import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { Alert, Button, RefreshControl, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useAuth } from "../../contexts/AuthContext";

const UserInfo = () => {
    const db = useSQLiteContext();
    const { userId } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [editingFields, setEditingFields] = useState({ fullname: false, username: false, email: false, language: false });
    const [editedUser, setEditedUser] = useState({});

    const loadUser = async () => {
        if (!db) return;
        try {
            setIsLoading(true);
            if (!userId) {
                setUser(null);
                return;
            }
            const results = await db.getAllAsync("SELECT * FROM users WHERE id = ?", [userId]);
            if (results.length > 0) {
                const userData = results[0];
                setUser(userData);
                setEditedUser(userData);
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error("Failed to load user:", error);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    const saveField = async (field) => {
        if (!db || !user) return;
        try {
            setIsLoading(true);
            const updateQuery = `UPDATE users SET ${field} = ? WHERE id = ?`;
            await db.runAsync(updateQuery, [editedUser[field], userId]);
            setUser({ ...user, [field]: editedUser[field] });
            setEditingFields({ ...editingFields, [field]: false });
            Alert.alert("Success", `${field} updated successfully!`);
        } catch (error) {
            console.error(`Failed to update ${field}:`, error);
            Alert.alert("Error", `Failed to update ${field}.`);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadUser();
    }, [userId, db]);

    if (isLoading) {
        return (
            <View style={styles.container}>
                <Text>Loading user...</Text>
            </View>
        );
    }

    if (!user) {
        return (
            <View style={styles.container}>
                <Text>No user information found. Please log in.</Text>
            </View>
        );
    }

    const renderCard = (field, label, keyboardType = 'default') => (
        <View style={styles.card}>
            <Text style={styles.label}>{label}:</Text>
            {editingFields[field] ? (
                <TextInput
                    style={styles.input}
                    value={editedUser[field]}
                    onChangeText={(text) => setEditedUser({ ...editedUser, [field]: text })}
                    keyboardType={keyboardType}
                />
            ) : (
                <Text style={styles.value}>{user[field]}</Text>
            )}
            <View style={styles.buttonContainer}>
                {editingFields[field] ? (
                    <>
                        <Button title="Save" onPress={() => saveField(field)} />
                        <Button title="Cancel" onPress={() => {
                            setEditingFields({ ...editingFields, [field]: false });
                            setEditedUser({ ...editedUser, [field]: user[field] });
                        }} />
                    </>
                ) : (
                    <Button title="Edit" onPress={() => setEditingFields({ ...editingFields, [field]: true })} />
                )}
            </View>
        </View>
    );

    return (
        <ScrollView
            style={styles.container}
            refreshControl={
                <RefreshControl refreshing={isLoading} onRefresh={loadUser} />
            }
        >
            {renderCard('fullname', 'Full Name')}
            {renderCard('username', 'Username')}
            {renderCard('email', 'Email', 'email-address')}
            {renderCard('language', 'Language')}
        </ScrollView>
    );
};
export default UserInfo;

const styles = StyleSheet.create({
    container: {
        borderRadius: 8,
        flex: 1,
        padding: 10,
        width: '98%',
        
    },
    card: {
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 15,
        marginVertical: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
    },
    value: {
        fontSize: 16,
        color: '#666',
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 8,
        fontSize: 16,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
