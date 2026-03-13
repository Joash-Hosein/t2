
import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Homebanner from "../components/banners/homebanner";
import { useAuth } from "../contexts/AuthContext";
import { AuthProvider } from "../contexts/AuthContext";
import { SQLiteProvider } from "expo-sqlite";
import { useRouter } from "expo-router";

export default function Index() {
  const { user } = useAuth();
  const router = useRouter();

  return (
        <SafeAreaProvider style={styles.Safecontainer}>
        <SafeAreaView style={styles.container}>
        <Homebanner />
          <View style={styles.card}>
            {user ? (
              <Link href="/(student)/dashboard">Go to Dashboard</Link>
            ) : (
              <Link href="/(auth)/login">Login to access courses</Link>
            )}
          </View>
      </SafeAreaView>    

      </SafeAreaProvider> 
      )
}

const styles = StyleSheet.create({
  Safecontainer: {
    flex: 1,
    backgroundColor: '#324599',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffffff',
  },
   card: {
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
    borderRadius: 6,
    width: 350,
    justifyContent: 'center',
    height: 150,
    alignItems: 'center',
  },
  videoContainer: {
    width: '100%',
    height: 200,
    backgroundColor: '#000',
    marginVertical: 10,
  },
  video: {
    width: '100%',
    height: '100%',
  }
})
