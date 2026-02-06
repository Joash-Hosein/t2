import { SQLiteProvider } from "expo-sqlite";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Homebanner from "../components/banners/homebanner";
import { StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
   <SQLiteProvider
      databaseName="icm.db"
      onInit ={async (db) => {
        await db.execAsync(`
          CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            fullname TEXT NOT NULL,
            username TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            language TEXT NOT NULL
          );
          CREATE TABLE IF NOT EXISTS courses (
            COURSES_ID INTEGER PRIMARY KEY AUTOINCREMENT,
            course name TEXT NOT NULL,
            description TEXT NOT NULL,
            language TEXT NOT NULL
          );
          CREATE TABLE IF NOT EXISTS progress (
            PROGRESS_ID INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            course_id INTEGER NOT NULL,
            progress_percentage REAL NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id),
            FOREIGN KEY (course_id) REFERENCES courses(COURSES_ID)
          );
          create TABLE IF NOT EXISTS content (
            CONTENT_ID INTEGER PRIMARY KEY AUTOINCREMENT,
            course_id INTEGER NOT NULL,
            title TEXT NOT NULL,
            video_url TEXT NOT NULL,
            video_duration INTEGER NOT NULL,
            video_title TEXT NOT NULL,
            audio_url TEXT NOT NULL,
            audio_duration INTEGER NOT NULL,
            audio_title TEXT NOT NULL,
            FOREIGN KEY (course_id) REFERENCES courses(COURSES_ID)
          );
          CREATE TABLE IF NOT EXISTS quizzes (
            QUIZ_ID INTEGER PRIMARY KEY AUTOINCREMENT,
            course_id INTEGER NOT NULL,
            question TEXT NOT NULL,
            options TEXT NOT NULL,
            correct_answer TEXT NOT NULL,
            FOREIGN KEY (course_id) REFERENCES courses(COURSES_ID)
          );
          CreatE TABLE IF NOT EXISTS certificates (
            CERTIFICATE_ID INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            course_id INTEGER NOT NULL,
            issue_date TEXT NOT NULL,
            certificate_url TEXT NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id),
            FOREIGN KEY (course_id) REFERENCES courses(COURSES_ID)
          );

          
          PRAGMA journal_mode=WAL;
          pragma foreign_keys=ON;
        `);
      }}
      options={{useNewConnection: false}}>
        <SafeAreaProvider style={styles.Safecontainer}>
        <SafeAreaView style={styles.container}>
        <Homebanner />
        <Link href="/(student)/dashboard"> clic </Link>
      </SafeAreaView>    
      </SafeAreaProvider>  
   </SQLiteProvider>); 
  
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
  }
})
