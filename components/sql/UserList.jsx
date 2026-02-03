import { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet , RefreshControl} from "react-native";
import { useSQLiteContext } from "expo-sqlite";

const UserList = () => {
    const [Users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const db = useSQLiteContext();


    const loadUsers= async () => {
        try {
            setIsLoading(true);
            const results = await db.getAllAsync(`SELECT * FROM users ORDER BY id DESC`);
            setUsers(results);
        } catch (error) {
            console.error("Failed to load users:", error);
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        loadUsers();
    }, []);
    if (isLoading) {
        return (
            <View style={styles.container}> 
                <Text>Loading users...</Text>
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <FlatList
                data={Users}
                refreshControl={
                    <RefreshControl refreshing={isLoading} onRefresh={loadUsers} />
                }
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.userItem}>
                        <Text style={styles.userName}>{item.name}</Text>
                        <Text>{item.email}</Text>
                        <Text>{item.password}</Text>
                        <Text>{item.language}</Text>
                    </View>
                )}
                ListEmptyComponent={<Text>No users found.</Text>}
            />
        </View>
    );
 }   
export default UserList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    userItem: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
}); 