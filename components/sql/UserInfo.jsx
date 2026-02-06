import { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet , RefreshControl} from "react-native";
import { useSQLiteContext } from "expo-sqlite";

const UserInfo = () => {

    const { db } = useSQLiteContext();
    const [isLoading, setIsLoading] = useState(false);
    const [users, setUsers] = useState([]);
    
    const loadUser = async () => {
        try{
            setIsLoading(true);
            const results = await db.executeSqlAsync("SELECT * FROM users");
            const usersData = results[0].rows._array;
            setUsers (usersData);
        } catch (error) {
            console.error("Failed to load users:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadUser();
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
                data={users}
                refreshControl={
                    <RefreshControl refreshing={isLoading} onRefresh={loadUser} />
                }
                renderItem={({ item }) => (
                    <View style={styles.userItem}>
                        <Text style={styles.userName}>{item.name}</Text>
        </View>
                )}
                ListEmptyComponent={<Text>No users found.</Text>}
            />
            </View>
    );
 }   
export default UserInfo;

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