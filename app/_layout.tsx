import { Stack } from 'expo-router';
import { SQLiteProvider } from "expo-sqlite";
import React from 'react';
import { AuthProvider } from '../contexts/AuthContext';

const _layout = () => {
  return (
    <SQLiteProvider
      databaseName="test2.db"
      onInit={async (db) => {
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
            course_image TEXT NOT NULL,
            course_name TEXT NOT NULL,
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
          CREATE TABLE IF NOT EXISTS certificates (
            CERTIFICATE_ID INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            course_id INTEGER NOT NULL,
            issue_date TEXT NOT NULL,
            certificate_url TEXT NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id),
            FOREIGN KEY (course_id) REFERENCES courses(COURSES_ID)
          );

          INSERT OR IGNORE INTO COURSES (course_image, course_name, description, language) VALUES
          ('course-01.png', 'Introduction to the Bible', 'Introduction to the Bible is an essential course for all those who want to be students of God Word. This course will help to develop a solid foundation for Bible study by answering three main questions: What is the Bible? What is the purpose of the Bible? and How to study the Bible? In answering the question, What is the Bible? one will learn about the themes, divisions, and genres of Scripture. While studying the purpose of the Bible, one will learn that Scripture is all about the redemption of the world through the work of the Father, Son, and Spirit. Lastly, the lesson on How to Study the Bible, focuses on a three-part process for Bible study: observation, interpretation, and application. Furthermore, this lesson will provide twelve rules that help one study the Bible in its proper context so that the correct meaning can be learned.', 'English'),
          ('course-02.png', 'Genesis-Exodus','Genesis and Exodus are the first two books of the Bible and are the first two of five books which constitute the Torah. Genesis begins with the creation narrative and teaches that God is the one who made everything that exists. This book also teaches about God calling of Abraham and how all the nations of the earth would be blessed through his offspring. The Book of Exodus tells of the bondage of God chosen people - Israel - in Egypt and how God, through his servant Moses, frees them from this bondage.','English'),
          ('course-03.png', 'Leviticus-Joshua','Leviticus through Joshua continues the narrative of Israels wandering through the wilderness. It is a significant time in Israels history because it is during this time God continues to set apart the children of Israel as the people of God. The Law of God is given to the people of Israel in the wilderness as well as the instructions for the proper mode of worship. Some of the instructions are difficult to understand but they all play a symbolic role and were given by God to help the people understand Him better as well as the role of the coming Messiah. The narrative will conclude with the children of Israel wandering having come to an end. They enter the land God has promise to them and will have to drive out the enemies of God who dwell there. There will be a series of victories and defeats as the Israelites go back and forth between trusting God and then thinking they can rely on their own strength and wisdom for success.','English'),
          ('course-04.png', 'History Books: Judges − Esther','Judges through Esther continues Israels history from where it left off in the book of Joshua. After the death of Joshua, Israel was ruled by a series of Judges. This time in Israels history is characterized as a downward spiral of disobedience towards God. The children of Israel continue to be influenced by the various Pagan cultures in the land and eventually they cry out to God for a human king to rule them. God grants them this wish even though they were essentially rejecting God as their king. The first king is a failure but the second and third kings of Israel - David and Solomon - see the most prosperous times in the history of Israels kingdom, including the building of Gods temple in Jerusalem. Following the death of Solomon, the kingdom of Israel is divided into two kingdoms - the Northern and Southern kingdoms. From here the story of Israel is mostly characterized by sin against God until both kingdoms are conquered by other kingdoms and the people are taken into exile. But the story does not end there, God is not done with His people and he remains faithful to the covenant even though the children of Israel have not. The latter books in this section tell the story of Gods faithfulness in exile and the raising up of leaders who lead the people back to the land God promised.','English'),
          ('course-05.png', 'Poetry: Job - Song of Solomon','The Word of God includes five poetic books, also known as books of wisdom or wisdom: Job, Psalms, Proverbs, Ecclesiastes and Song of Songs. In these books, God speaks to the heart of his people when he is suffering (Job), worshiping (Psalms), facing lifes decisions (Proverbs), doubting (Ecclesiastes) and expressing the intimacies of marriage (Song of Songs). Gods desire is that we be changed from the inside out, these books speak to the personal areas of life and provide direction on how to live a godly life.','English'),
          ('course-06.png','Major Prophets: Isaiah- Daniel','The prophets of Israel were men from many different backgrounds who were called to speak in the name of God. The prophets taught the people and most of them warned about comings judgments that were the result of Israels unfaithfulness to their covenant with God. In all of these warnings, during the darkest days of God people, there is a message of God grace and hope, that is, God grace in offering forgiveness and hope in the coming Messiah.','English'),
          ('course-07.png','Minor Prophets: Hosea - Malachi','The prophets in this grouping are in no way minor in terms of their significance. This description only refers to the length of the individual book, they are shorter in length than those of the major prophets. The Minor Prophets includes lives of different prophets, from different social strata and in different parts of the kingdom of Israel, who, like the Major Prophets, were used by God to carry his message of warning and reconciliation to his chosen people.','English'),
          ('course-08.png','Introduction to New Testament: Matthew','The first four books of the New Testament are called gospels, which means good news. They are fundamental to the revelation of  eternal plan to redeem and save lost humanity. They are often called biographies for they each tell the story of Jesus, his birth, ministry, death, and resurrection. The good news of the Gospels is that Jesus has come, that he is both Savior and King, and people can know this is true because God has raised him from the dead. This section specifically focuses on the longest of the four Gospels, the Gospel of Matthew.','English'),
          ('course-09.png','Luke and John','Luke is the favorite Gospel of many, because it highlights the humanity of Jesus as God-man. It shows Jesus compassion and how he identified with us. Many of Jesus best known parables, such as the stories of the Prodigal Son and the Good Samaritan, only appear in Luke. Luke tells us more about the birth of Jesus than any other writer of the Gospels. And Luke presents us with the manifesto of Christ - the clear statement of His mission - the key to the ministry of the Messiah. The Gospel of John is unique in style compared to the other three Gospels. It is unique in that it provides a series of I AM statements that teach us about Jesus. John also focuses on theme of signs, and the gospel author with end the book with this statement: these things were written so that you might believe that Jesus is the Christ the son of God, and that by believing you may have life in his name (John 20:31).','English'),
          ('course-10.png','Acts and Romans','The book of Acts records the foundation, the beginning and the work of the Church by obeying the Great Commission. The promised Comforter - the Holy Spirit - arrived to live in believers, with signs that have never been matched. Jesus church expanded greatly during this time reaching many portions of the known world at the time. The book of Romans is Pauls theological masterpiece. Paul establishes the fundamental doctrine of justification, that is, the act by which God declares to the unrighteous as completely righteous by the work of Jesus Christ.','English'),
          ('course-11.png','I and II Corinthians','Pauls letters to the Corinthian church were written to a church he knew very well. He wrote to correct problems he had heard about in the church and to instruct and correct believers in their faith. There are significance lessons for the church in these books, especially regarding the Lords Table and Spiritual Gifts.','English'),
          ('course-12.png','Pauline Epistles: Galatians - II Timothy','This section includes more of Pauls letters to various churches in Asia Minor as well as certain individuals who were in ministry with Paul. These books include a blend of both instruction and warning, of praise and rebuke. A central theme of these books is instruction to the church. The church universal relies heavily on the instruction in these books to know how churches are to operate and who is qualified spiritually to lead and guide them.','English'),
          ('course-13.png','Hebrews - Revelation','Sometimes called The Mysterious Masterpiece, this section begins with the book of Hebrews, a book that more than any other book in the Bible, ties the Old and New Testaments together. The Book of Hebrews presents Jesus Christ as the Messiah Who was prophesied in the Old Testament, as the Lord Who was revealed in the New Testament and as the coming King of kings Who is going to come again. This section also consists of what are called the general epistles. They are called general because they are not necessarily addressed to any one church, city, or person but are written to the church at large. They too like the Pauline epistles contain invaluable instruction for the godly health of the church. Lastly, this section concludes with the book of Revelation. Most of this book consists of a vision that the apostle John had while in exile in Patmos. God gave John this vision of what is the come at the end of all things. Revelation is full of imagry and symbolism and is difficult to understand; nonetheless, it is an important book and it encourages believers to konw that in the end God will be victorious over His enemies and the people of God will live forever with Him.','English');


           INSERT OR IGNORE INTO CONTENT (course_id,video_url,video_duration,video_title,audio_url,audio_duration,audio_title) VALUES
          ('1','ENG-MBC-OTS-01.mp4','811','Introduction to the Bible#1 What is the Bible','ENG-MBC-OTS-01.mp3','1676','Lesson 1'),
          ('1','ENG-MBC-OTS-02.mp4','882','Introduction to the Bible#2 The Purpose of the Bible','ENG-MBC-OTS-02.mp3','1687','Lesson 2'),
          ('1','ENG-MBC-OTS-03.mp4','638','Introduction to the Bible#3 How to study the bible','ENG-MBC-OTS-03.mp3','1691','Lesson 3');



          PRAGMA journal_mode=WAL;
          pragma foreign_keys=ON;
        `);
      }}
      options={{useNewConnection: false}}>
      <AuthProvider>
        <Stack
          screenOptions={{headerShown: false}}/>
      </AuthProvider>
    </SQLiteProvider>
  )
}

export default _layout
