import { Stack, usePathname, useRouter } from 'expo-router';
import { SQLiteProvider } from 'expo-sqlite';
import React, { useEffect } from 'react';
import { AuthProvider, useAuth } from '../contexts/AuthContext';


const RootLayoutNav = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading) {
      if (user && pathname.startsWith('/(auth)')) {
        router.replace('/(student)/dashboard');
      } else if (!user && !pathname.startsWith('/(auth)') && pathname !== '/') {
        router.replace('/(auth)/login');
      }
    }
}, [user, loading, pathname]);

  // if (loading) {
    // return null; // Loading screen
  // }

  return <Stack screenOptions={{headerShown: false}}/>;
};

const _layout = () => {
  return (
    <AuthProvider>
      <SQLiteProvider
        databaseName="icm5.db"
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
          CREATE TABLE IF NOT EXISTS content (
            CONTENT_ID INTEGER PRIMARY KEY AUTOINCREMENT,
            course_id INTEGER NOT NULL,
            video_url TEXT NOT NULL UNIQUE,
            video_duration INTEGER NOT NULL,
            video_title TEXT NOT NULL,
            audio_url TEXT NOT NULL UNIQUE,
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
          ('1','http://10.42.0.1/videos/ENG-MBC-OTS-01.mp4','811','Introduction to the Bible#1 What is the Bible','http://10.42.0.1/Audio/ENG-MBC-OTS-01.mp3','1676','Lesson 1'),
          ('1','http://10.42.0.1/videos/ENG-MBC-OTS-02.mp4','882','Introduction to the Bible#2 The Purpose of the Bible','http://10.42.0.1/Audio/ENG-MBC-OTS-02.mp3','1687','Lesson 2'),
          ('1','http://10.42.0.1/videos/ENG-MBC-OTS-03.mp4','638','Introduction to the Bible#3 How to study the bible','http://10.42.0.1/Audio/ENG-MBC-OTS-03.mp3','1691','Lesson 3'),
          ('2','http://10.42.0.1/videos/ENG-MBC-OTS-04.mp4','720','Genesis#1 Genesis and Creation','http://10.42.0.1/Audio/ENG-MBC-OTS-04.mp3','1692','Lesson 4'),
          ('2','http://10.42.0.1/videos/ENG-MBC-OTS-05.mp4','720','Genesis#2 The Birth of Mankind: The Story of Adam and Eve','http://10.42.0.1/Audio/ENG-MBC-OTS-05.mp3','1693','Lesson 5'),
          ('2','http://10.42.0.1/videos/ENG-MBC-OTS-06.mp4','720','Genesis#3 Where are you; Story and Fall','http://10.42.0.1/Audio/ENG-MBC-OTS-06.mp3','1694','Lesson 6'),
          ('2','http://10.42.0.1/videos/ENG-MBC-OTS-07.mp4','720','Genesis#4 Where is Your Brother Story of Cain and Abel','http://10.42.0.1/Audio/ENG-MBC-OTS-07.mp3','1695','Lesson 7'),
          ('2','http://10.42.0.1/videos/ENG-MBC-OTS-08.mp4','720','Genesis#5 Father of Faith: Story of Abraham','http://10.42.0.1/Audio/ENG-MBC-OTS-08.mp3','1696','Lesson 8'),
          ('2','http://10.42.0.1/videos/ENG-MBC-OTS-09.mp4','720','Genesis#6 Who are you: The Story of Jacob','http://10.42.0.1/Audio/ENG-MBC-OTS-09.mp3','1697','Lesson 9'),
          ('2','http://10.42.0.1/videos/ENG-MBC-OTS-10.mp4','720','Genesis#7 The God whois in charge: The Story of Joseph','http://10.42.0.1/Audio/ENG-MBC-OTS-10.mp3','1698','Lesson 10'),
          ('2','http://10.42.0.1/videos/ENG-MBC-OTS-11.mp4','720','Exodus#1 Moses learns Humility','http://10.42.0.1/Audio/ENG-MBC-OTS-11.mp3','1696','Lesson 11'),
          ('2','http://10.42.0.1/videos/ENG-MBC-OTS-12.mp4','720','Exodus#2 Moses learns the 4 Spiritual Laws','http://10.42.0.1/Audio/ENG-MBC-OTS-12.mp3','1697','Lesson 12'),
          ('2','http://10.42.0.1/videos/ENG-MBC-OTS-13.mp4','720','Exodus#3 Principles of Deliverance The Story of Exodus','http://10.42.0.1/Audio/ENG-MBC-OTS-13.mp3','1698','Lesson 13'),
          ('2','http://10.42.0.1/videos/ENG-MBC-OTS-14.mp4','720','Exodus#4 The 10 commandments','http://10.42.0.1/Audio/ENG-MBC-OTS-14.mp3','1696','Lesson 14'),
          ('3','http://10.42.0.1/videos/ENG-MBC-OTS-15.mp4','720','Leviticus#1 Nadab, Abihu and Holiness','http://10.42.0.1/Audio/ENG-MBC-OTS-15.mp3','1696','Lesson 15'),
          ('3','http://10.42.0.1/videos/ENG-MBC-OTS-16.mp4','720','Leviticus#2 Approaching the Holy One','http://10.42.0.1/Audio/ENG-MBC-OTS-16.mp3','1697','Lesson 16'),
          ('3','http://10.42.0.1/videos/ENG-MBC-OTS-17.mp4','720','Leviticus#3 The Tent of Worship','http://10.42.0.1/Audio/ENG-MBC-OTS-17.mp3','1698','Lesson 17'),
          ('3','http://10.42.0.1/videos/ENG-MBC-OTS-18.mp4','720','Numbers#1 The Level Of Decision','http://10.42.0.1/Audio/ENG-MBC-OTS-18.mp3','1699','Lesson 18'),
          ('3','http://10.42.0.1/videos/ENG-MBC-OTS-19.mp4','720','Numbers#2 Allegories in the Wilderness','http://10.42.0.1/Audio/ENG-MBC-OTS-19.mp3','1700','Lesson 19'),
          ('3','http://10.42.0.1/videos/ENG-MBC-OTS-20.mp4','720','Numbers#3 Why Moses?','http://10.42.0.1/Audio/ENG-MBC-OTS-20.mp3','1701','Lesson 20'),
          ('3','http://10.42.0.1/videos/ENG-MBC-OTS-21.mp4','720','Deuteronomy#1 Teach it to your children','http://10.42.0.1/Audio/ENG-MBC-OTS-21.mp3','1702','Lesson 21'),
          ('3','http://10.42.0.1/videos/ENG-MBC-OTS-22.mp4','720','Deuteronomy#2 The Magnificent Sermons of Moses','http://10.42.0.1/Audio/ENG-MBC-OTS-22.mp3','1703','Lesson 22'),
          ('3','http://10.42.0.1/videos/ENG-MBC-OTS-23.mp4','720','Deuteronomy#3 More Magnificent Sermons of Moses','http://10.42.0.1/Audio/ENG-MBC-OTS-23.mp3','1704','Lesson 23'),
          ('3','http://10.42.0.1/videos/ENG-MBC-OTS-24.mp4','720','Joshua#1 Possess Your Possessions The Story of the Conquest of Canaan','http://10.42.0.1/Audio/ENG-MBC-OTS-24.mp3','1705','Lesson 24'),
          ('3','http://10.42.0.1/videos/ENG-MBC-OTS-25.mp4','720','Joshua#2 A Panorama of Faith: The Story of the Conquest of Jericho','http://10.42.0.1/Audio/ENG-MBC-OTS-25.mp3','1706','Lesson 25'),
          ('3','http://10.42.0.1/videos/ENG-MBC-OTS-26.mp4','720','Joshua#3 Struggles in the Hourney of Faith: The Story of Achan and the Conquest of Ai','http://10.42.0.1/Audio/ENG-MBC-OTS-26.mp3','1707','Lesson 26'),
          ('4','http://10.42.0.1/videos/ENG-MBC-OTS-27.mp4','720','Introduction to the Historical Books: Why We Study Hebrew History','http://10.42.0.1/Audio/ENG-MBC-OTS-27.mp3','1708','Lesson 27'),
          ('4','http://10.42.0.1/videos/ENG-MBC-OTS-28.mp4','720','Judges#1 The Agonies of Apostasy','http://10.42.0.1/Audio/ENG-MBC-OTS-28.mp3','1709','Lesson 28'),
          ('4','http://10.42.0.1/videos/ENG-MBC-OTS-29.mp4','720','Judges#2 Extraordinary Things through Ordinary People','http://10.42.0.1/Audio/ENG-MBC-OTS-29.mp3','1710','Lesson 29'),
          ('4','http://10.42.0.1/videos/ENG-MBC-OTS-30.mp4','720','Judges#3 Every Man in His Place: The story of Gideon','http://10.42.0.1/Audio/ENG-MBC-OTS-30.mp3','1711','Lesson 30'),
          ('4','http://10.42.0.1/videos/ENG-MBC-OTS-31.mp4','720','Ruth#1 Hope in th Darkness THe Story of Naomi','http://10.42.0.1/Audio/ENG-MBC-OTS-31.mp3','1712','Lesson 31'),
          ('4','http://10.42.0.1/videos/ENG-MBC-OTS-32.mp4','720','Ruth#2 Th Romance of Redemption: The story of Ruth and Boaz','http://10.42.0.1/Audio/ENG-MBC-OTS-32.mp3','1713','Lesson 32'),
          ('4','http://10.42.0.1/videos/ENG-MBC-OTS-33.mp4','720','1 Samuel#1 The Kingdom of God: A survey of 1st & 2nd Samuel','http://10.42.0.1/Audio/ENG-MBC-OTS-33.mp3','1714','Lesson 33'),
          ('4','http://10.42.0.1/videos/ENG-MBC-OTS-34.mp4','720','1 Samuel#2 Samuel, Saul and David','http://10.42.0.1/Audio/ENG-MBC-OTS-34.mp3','1715','Lesson 34'),
          ('4','http://10.42.0.1/videos/ENG-MBC-OTS-35.mp4','720','1 Samuel#3 A Man after Gods own Heart','http://10.42.0.1/Audio/ENG-MBC-OTS-35.mp3','1716','Lesson 35'),
          ('4','http://10.42.0.1/videos/ENG-MBC-OTS-36.mp4','720','2 Samuel#1 How to Fail Successfully','http://10.42.0.1/Audio/ENG-MBC-OTS-36.mp3','1717','Lesson 36'),
          ('4','http://10.42.0.1/videos/ENG-MBC-OTS-37.mp4','720','2 Samuel#2 The Blessedness of Forgiveness','http://10.42.0.1/Audio/ENG-MBC-OTS-37.mp3','1718','Lesson 37'),
          ('4','http://10.42.0.1/videos/ENG-MBC-OTS-38.mp4','720','2 Samuel#3 Godly Character on Display','http://10.42.0.1/Audio/ENG-MBC-OTS-38.mp3','1719','Lesson 38'),
          ('4','http://10.42.0.1/videos/ENG-MBC-OTS-39.mp4','720','Kings#1 Kings and Prophets','http://10.42.0.1/Audio/ENG-MBC-OTS-39.mp3','1720','Lesson 39'),
          ('4','http://10.42.0.1/videos/ENG-MBC-OTS-40.mp4','720','Kings#2 Examples and Warnings from Kings','http://10.42.0.1/Audio/ENG-MBC-OTS-40.mp3','1721','Lesson 40'),
          ('4','http://10.42.0.1/videos/ENG-MBC-OTS-41.mp4','720','Chronicles: Another Inspired perspective','http://10.42.0.1/Audio/ENG-MBC-OTS-41.mp3','1722','Lesson 41'),
('4','http://10.42.0.1/videos/ENG-MBC-OTS-42.mp4','720','Ezra and Nehemiah#1 God''s Work','http://10.42.0.1/Audio/ENG-MBC-OTS-42.mp3','1723','Lesson 42'),
('4','http://10.42.0.1/videos/ENG-MBC-OTS-43.mp4','720','Ezra and Nehemiah#2 Oppostion to God''s Work','http://10.42.0.1/Audio/ENG-MBC-OTS-43.mp3','1724','Lesson 43'),
          ('4','http://10.42.0.1/videos/ENG-MBC-OTS-44.mp4','720','Ezra and Nehemiah#3 Characters of a Godly Leader','http://10.42.0.1/Audio/ENG-MBC-OTS-44.mp3','1725','Lesson 44'),
          ('4','http://10.42.0.1/videos/ENG-MBC-OTS-45.mp4','720','Esther#1 The Providence of God in the Story of Esther','http://10.42.0.1/Audio/ENG-MBC-OTS-45.mp3','1726','Lesson 45'),
          ('5','http://10.42.0.1/videos/ENG-MBC-OTS-46.mp4','720','Introduction to Biblical Poetry: THe language of the Heart','http://10.42.0.1/Audio/ENG-MBC-OTS-46.mp3','1727','Lesson 46'),
          ('5','http://10.42.0.1/videos/ENG-MBC-OTS-47.mp4','720','Job#1 Hurting Hearts','http://10.42.0.1/Audio/ENG-MBC-OTS-47.mp3','1728','Lesson 47'),
          ('5','http://10.42.0.1/videos/ENG-MBC-OTS-48.mp4','720','Job#2 The Story of Job and His Friends','http://10.42.0.1/Audio/ENG-MBC-OTS-48.mp3','1729','Lesson 48'),
('5','http://10.42.0.1/videos/ENG-MBC-OTS-49.mp4','720','Job#3 Biblical Reasons Why God''s People Suffer','http://10.42.0.1/Audio/ENG-MBC-OTS-49.mp3','1730','Lesson 49'),
('5','http://10.42.0.1/videos/ENG-MBC-OTS-50.mp4','720','Job#4 More Biblical Reasons Why God''s People Suffer','http://10.42.0.1/Audio/ENG-MBC-OTS-50.mp3','1731','Lesson 50'),
          ('5','http://10.42.0.1/videos/ENG-MBC-OTS-51.mp4','720','Pslams#1 The Good Shepard','http://10.42.0.1/Audio/ENG-MBC-OTS-51.mp3','1732','Lesson 51'),
          ('5','http://10.42.0.1/videos/ENG-MBC-OTS-52.mp4','720','Pslams#2 The Blessed man','http://10.42.0.1/Audio/ENG-MBC-OTS-52.mp3','1733','Lesson 52'),
          ('5','http://10.42.0.1/videos/ENG-MBC-OTS-53.mp4','720','Pslams#3 The Blessed Family','http://10.42.0.1/Audio/ENG-MBC-OTS-53.mp3','1734','Lesson 53'),
          ('5','http://10.42.0.1/videos/ENG-MBC-OTS-54.mp4','720','Pslams#4 Solutions To Stress','http://10.42.0.1/Audio/ENG-MBC-OTS-54.mp3','1735','Lesson 54'),
          ('5','http://10.42.0.1/videos/ENG-MBC-OTS-55.mp4','720','Pslams#5 Seeing the world through Gods Eyes OR the Destiny of the the Wicked ','http://10.42.0.1/Audio/ENG-MBC-OTS-55.mp3','1736','Lesson 55'),
          ('5','http://10.42.0.1/videos/ENG-MBC-OTS-56.mp4','720','Pslams#6 The Coming and Going of Worship','http://10.42.0.1/Audio/ENG-MBC-OTS-56.mp3','1737','Lesson 56'),
          ('5','http://10.42.0.1/videos/ENG-MBC-OTS-57.mp4','720','Pslams#7 The Coming Messiah ','http://10.42.0.1/Audio/ENG-MBC-OTS-57.mp3','1738','Lesson 57'),
          ('5','http://10.42.0.1/videos/ENG-MBC-OTS-58.mp4','720','Proverbs: The Wisdom of Solomon','http://10.42.0.1/Audio/ENG-MBC-OTS-58.mp3','1739','Lesson 58'),
          ('5','http://10.42.0.1/videos/ENG-MBC-OTS-59.mp4','720','Ecclesiastes: Solomons Final Message','http://10.42.0.1/Audio/ENG-MBC-OTS-59.mp3','1740','Lesson 59'),
          ('5','http://10.42.0.1/videos/ENG-MBC-OTS-60.mp4','720','Song of Solomon: The finest Love Song ','http://10.42.0.1/Audio/ENG-MBC-OTS-60.mp3','1741','Lesson 60'),
          ('6','http://10.42.0.1/videos/ENG-MBC-OTS-61.mp4','720','Prophets: The Prophets of Israel ','http://10.42.0.1/Audio/ENG-MBC-OTS-61.mp3','1742','Lesson 61'),
          ('6','http://10.42.0.1/videos/ENG-MBC-OTS-62.mp4','720','Isaiah#1 The callign and commissioning of Isaiah ','http://10.42.0.1/Audio/ENG-MBC-OTS-62.mp3','1743','Lesson 62'),
          ('6','http://10.42.0.1/videos/ENG-MBC-OTS-63.mp4','720','Isaiah#2 The Messiah in Isaiah ','http://10.42.0.1/Audio/ENG-MBC-OTS-63.mp3','1744','Lesson 63'),
          ('6','http://10.42.0.1/videos/ENG-MBC-OTS-64.mp4','720','Isaiah#3 Songs of our Suffering Subsitute ','http://10.42.0.1/Audio/ENG-MBC-OTS-64.mp3','1745','Lesson 64'),
          ('6','http://10.42.0.1/videos/ENG-MBC-OTS-65.mp4','720','Jerimiah#1 The Weeping prophet ','http://10.42.0.1/Audio/ENG-MBC-OTS-65.mp3','1746','Lesson 65'),
          ('6','http://10.42.0.1/videos/ENG-MBC-OTS-66.mp4','720','Jerimiah#2 Surrendering to Gods Discipline ','http://10.42.0.1/Audio/ENG-MBC-OTS-66.mp3','1747','Lesson 66'),
          ('6','http://10.42.0.1/videos/ENG-MBC-OTS-67.mp4','720','Jerimiah#3 The Sermons of Jerimiah','http://10.42.0.1/Audio/ENG-MBC-OTS-67.mp3','1748','Lesson 67'),
          ('6','http://10.42.0.1/videos/ENG-MBC-OTS-68.mp4','720','Lamentations: Hope in Lament','http://10.42.0.1/Audio/ENG-MBC-OTS-68.mp3','1749','Lesson 68'),
          ('6','http://10.42.0.1/videos/ENG-MBC-OTS-69.mp4','720', 'Ezekiel#1 the Prophet ','http://10.42.0.1/Audio/ENG-MBC-OTS-69.mp3', '  1750', 'Lesson  69'),
          ('6','http://10.42.0.1/videos/ENG-MBC-OTS-70.mp4','720', 'Ezekiel#2 Dry Bones ','http://10.42.0.1/Audio/ENG-MBC-OTS-70.mp3', '  1751', 'Lesson  70'),
          ('6','http://10.42.0.1/videos/ENG-MBC-OTS-71.mp4','720', 'Daniel#1 Believers Versus Babylonians ','http://10.42.0.1/Audio/ENG-MBC-OTS-71.mp3', '  1752', 'Lesson  71'),
          ('6','http://10.42.0.1/videos/ENG-MBC-OTS-72.mp4','720', 'Daniel#2 babylon Believes ','http://10.42.0.1/Audio/ENG-MBC-OTS-72.mp3', '  1753', 'Lesson  72'),
          ('6','http://10.42.0.1/videos/ENG-MBC-OTS-73.mp4','720', 'Daniel#3 Daniels Apocalyptic Visions ','http://10.42.0.1/Audio/ENG-MBC-OTS-73.mp3', '  1754', 'Lesson  73'),
('7','http://10.42.0.1/videos/ENG-MBC-OTS-74.mp4','720', 'Hosea: God''s Unfailing Love ','http://10.42.0.1/Audio/ENG-MBC-OTS-74.mp3', '  1755', 'Lesson  74'),
          ('7','http://10.42.0.1/videos/ENG-MBC-OTS-75.mp4','720', 'Joel: The Day of the Lord ','http://10.42.0.1/Audio/ENG-MBC-OTS-75.mp3', '  1756', 'Lesson  75'),
          ('7','http://10.42.0.1/videos/ENG-MBC-OTS-76.mp4','720', 'Amos: God roars against the Disobediant','http://10.42.0.1/Audio/ENG-MBC-OTS-76.mp3', '  1757', 'Lesson  76'),
          ('7','http://10.42.0.1/videos/ENG-MBC-OTS-77.mp4','720', 'Obadiah: Edom chooses its Own Destruction','http://10.42.0.1/Audio/ENG-MBC-OTS-77.mp3', '  1758', 'Lesson  77'),
          ('7','http://10.42.0.1/videos/ENG-MBC-OTS-78.mp4','720', 'Jonah#1 The rebellious Prophet ','http://10.42.0.1/Audio/ENG-MBC-OTS-78.mp3', '  1759', 'Lesson  78'),
          ('7','http://10.42.0.1/videos/ENG-MBC-OTS-89.mp4','720', 'Jonah#2 the Prejudiced Prophet ','http://10.42.0.1/Audio/ENG-MBC-OTS-89.mp3', '  1869', 'Lesson  89'),
          ('7','http://10.42.0.1/videos/ENG-MBC-OTS-90.mp4','720', 'Micah#1 The Politcal Prophet ','http://10.42.0.1/Audio/ENG-MBC-OTS-90.mp3', '  1870', 'Lesson  90'),
          ('8','http://10.42.0.1/videos/ENG-MBC-NTS-01.mp4','720', 'Introduction to the Gospel #1 The Centrality of Jesus Christ','http://10.42.0.1/Audio/ENG-MBC-NTS-01.mp3', '  1881', 'Lesson  1'),
          ('8','http://10.42.0.1/videos/ENG-MBC-NTS-02.mp4','720', 'Introduction to the Gospel #2 The Uniquesness of the Gospels','http://10.42.0.1/Audio/ENG-MBC-NTS-02.mp3', '  1882', 'Lesson  2'),
          ('8','http://10.42.0.1/videos/ENG-MBC-NTS-03.mp4','720', 'Introduction to the Gospel #3 Ministries of the Messiah','http://10.42.0.1/Audio/ENG-MBC-NTS-03.mp3', '  1883', 'Lesson  3'),
          ('8','http://10.42.0.1/videos/ENG-MBC-NTS-04.mp4','720', 'Matthew#1 the Stragey of the Saviour','http://10.42.0.1/Audio/ENG-MBC-NTS-04.mp3', '  1884', 'Lesson  4'),
          ('8','http://10.42.0.1/videos/ENG-MBC-NTS-05.mp4','720', 'Matthew#2 The Kingdom of Heaven','http://10.42.0.1/Audio/ENG-MBC-NTS-05.mp3', '  1885', 'Lesson  5'),
          ('8','http://10.42.0.1/videos/ENG-MBC-NTS-06.mp4','720', 'Matthew#3 The Crisis of Christ','http://10.42.0.1/Audio/ENG-MBC-NTS-06.mp3', '  1886', 'Lesson  6'),
          ('8','http://10.42.0.1/videos/ENG-MBC-NTS-07.mp4','720', 'Matthew#4 The Beautiful Attitudes ','http://10.42.0.1/Audio/ENG-MBC-NTS-07.mp3', '  1887', 'Lesson  7'),
          ('8','http://10.42.0.1/videos/ENG-MBC-NTS-08.mp4','720', 'Matthew#5 Christ-Like Character','http://10.42.0.1/Audio/ENG-MBC-NTS-08.mp3', '  1888', 'Lesson  8'),
          ('8','http://10.42.0.1/videos/ENG-MBC-NTS-09.mp4','720', 'Matthew#6 Relational Righteousness','http://10.42.0.1/Audio/ENG-MBC-NTS-09.mp3', '  1889', 'Lesson  9'),
          ('8','http://10.42.0.1/videos/ENG-MBC-NTS-10.mp4','720', 'Matthew#7 Being Different','http://10.42.0.1/Audio/ENG-MBC-NTS-10.mp3', '  1890', 'Lesson  10'),
          ('8','http://10.42.0.1/videos/ENG-MBC-NTS-11.mp4','720', 'Matthew#8 Prayer and Fasting','http://10.42.0.1/Audio/ENG-MBC-NTS-11.mp3', '  1891', 'Lesson  11'),
          ('8','http://10.42.0.1/videos/ENG-MBC-NTS-12.mp4','720', 'Matthew#9 The Choices of the Commited','http://10.42.0.1/Audio/ENG-MBC-NTS-12.mp3', '  1892', 'Lesson  12'),
          ('8','http://10.42.0.1/videos/ENG-MBC-NTS-13.mp4','720', 'Matthew#10 The Commission of the Commited','http://10.42.0.1/Audio/ENG-MBC-NTS-13.mp3', '  1893', 'Lesson  13'),
          ('8','http://10.42.0.1/videos/ENG-MBC-NTS-14.mp4','720', 'Matthew#11 Salvation adn Parables','http://10.42.0.1/Audio/ENG-MBC-NTS-14.mp3', '  1894', 'Lesson  14'),
          ('8','http://10.42.0.1/videos/ENG-MBC-NTS-15.mp4','720', 'Matthew#12 Jesus & Peter','http://10.42.0.1/Audio/ENG-MBC-NTS-15.mp3', '  1895', 'Lesson  15'),
('8','http://10.42.0.1/videos/ENG-MBC-NTS-16.mp4','720', 'Matthew#13 Fully Following Jesus','http://10.42.0.1/Audio/ENG-MBC-NTS-16.mp3', '  1896', 'Lesson  16'),
          ('8','http://10.42.0.1/videos/ENG-MBC-NTS-17.mp4','720', 'Matthew#14 The Last is the First','http://10.42.0.1/Audio/ENG-MBC-NTS-17.mp3', '  1897', 'Lesson  17'),
          ('8','http://10.42.0.1/videos/ENG-MBC-NTS-18.mp4','720', 'Matthew#15 Christs Final Crisis','http://10.42.0.1/Audio/ENG-MBC-NTS-18.mp3', '  1898', 'Lesson  18'),
          ('9','http://10.42.0.1/videos/ENG-MBC-NTS-19.mp4','720', 'Luke#1 The Manifesto of the Messiah','http://10.42.0.1/Audio/ENG-MBC-NTS-19.mp3', '  1899', 'Lesson  19'),
          ('9','http://10.42.0.1/videos/ENG-MBC-NTS-20.mp4','720', 'Luke#2 Catch Men','http://10.42.0.1/Audio/ENG-MBC-NTS-20.mp3', '  1900', 'Lesson  20'),
          ('9','http://10.42.0.1/videos/ENG-MBC-NTS-21.mp4','720', 'Luke#3 Eternal Investments','http://10.42.0.1/Audio/ENG-MBC-NTS-21.mp3', '  1901', 'Lesson  21'),
          ('9','http://10.42.0.1/videos/ENG-MBC-NTS-22.mp4','720', 'Luke#4 The Birth of Christ','http://10.42.0.1/Audio/ENG-MBC-NTS-22.mp3', '  1902', 'Lesson  22'),
          ('9','http://10.42.0.1/videos/ENG-MBC-NTS-23.mp4','720', 'Luke#5 Approaching Jesus','http://10.42.0.1/Audio/ENG-MBC-NTS-23.mp3', '  1903', 'Lesson  23'),
          ('9','http://10.42.0.1/videos/ENG-MBC-NTS-24.mp4','720', 'Luke#6 Repentance','http://10.42.0.1/Audio/ENG-MBC-NTS-24.mp3', '  1904', 'Lesson  24'),
          ('9','http://10.42.0.1/videos/ENG-MBC-NTS-25.mp4','720', 'John#1 The Seven Signs of Jesus','http://10.42.0.1/Audio/ENG-MBC-NTS-25.mp3', '  1905', 'Lesson  25'),
          ('9','http://10.42.0.1/videos/ENG-MBC-NTS-26.mp4','720', 'John#2 Joyously Born Again','http://10.42.0.1/Audio/ENG-MBC-NTS-26.mp3', '  1906', 'Lesson  26'),
          ('9','http://10.42.0.1/videos/ENG-MBC-NTS-27.mp4','720', 'John#3 The Woman at the Well','http://10.42.0.1/Audio/ENG-MBC-NTS-27.mp3', '  1907', 'Lesson  27'),
          ('9','http://10.42.0.1/videos/ENG-MBC-NTS-28.mp4','720', 'John#4 Fighing with Pharisees','http://10.42.0.1/Audio/ENG-MBC-NTS-28.mp3', '  1908', 'Lesson  28'),
          ('9','http://10.42.0.1/videos/ENG-MBC-NTS-29.mp4','720', 'John#5 The Great I am','http://10.42.0.1/Audio/ENG-MBC-NTS-29.mp3', '  1909', 'Lesson  29'),
          ('9','http://10.42.0.1/videos/ENG-MBC-NTS-30.mp4','720', 'John#6 The Last Discipleship Trainin Event','http://10.42.0.1/Audio/ENG-MBC-NTS-30.mp3', '  1910', 'Lesson  30'),
          ('10','http://10.42.0.1/videos/ENG-MBC-NTS-31.mp4','720', 'Acts#1 Introduction to Acts','http://10.42.0.1/Audio/ENG-MBC-NTS-31.mp3', '  1911', 'Lesson  31'),
          ('10','http://10.42.0.1/videos/ENG-MBC-NTS-32.mp4','720', 'Acts#2 The Foundational Fingerprints of the Church','http://10.42.0.1/Audio/ENG-MBC-NTS-32.mp3', '  1912', 'Lesson  32'),
          ('10','http://10.42.0.1/videos/ENG-MBC-NTS-33.mp4','720', 'Acts#3 The Exemplary Patterns of the Church','http://10.42.0.1/Audio/ENG-MBC-NTS-33.mp3', '  1913', 'Lesson  33'),
          ('10','http://10.42.0.1/videos/ENG-MBC-NTS-34.mp4','720', 'Acts#4 Patterns of Pentecost','http://10.42.0.1/Audio/ENG-MBC-NTS-34.mp3', '  1914', 'Lesson  34'),
          ('10','http://10.42.0.1/videos/ENG-MBC-NTS-35.mp4','720', 'Acts#5 Making Disciples','http://10.42.0.1/Audio/ENG-MBC-NTS-35.mp3', '  1915', 'Lesson  35'),
          ('10','http://10.42.0.1/videos/ENG-MBC-NTS-36.mp4','720', 'Acts#6 The Personal Pentecost of Paul','http://10.42.0.1/Audio/ENG-MBC-NTS-36.mp3', '  1916', 'Lesson  36'),
          ('10','http://10.42.0.1/videos/ENG-MBC-NTS-37.mp4','720', 'Acts#7 God Launches Paul into Ministry','http://10.42.0.1/Audio/ENG-MBC-NTS-37.mp3', '  1917', 'Lesson  37'),
          ('10','http://10.42.0.1/videos/ENG-MBC-NTS-38.mp4','720', 'Acts#8  The Preaching of Paul','http://10.42.0.1/Audio/ENG-MBC-NTS-38.mp3', '  1918', 'Lesson  38'),
          ('10','http://10.42.0.1/videos/ENG-MBC-NTS-39.mp4','720', 'Acts#9 Pauls Trials','http://10.42.0.1/Audio/ENG-MBC-NTS-39.mp3', '  1919', 'Lesson  39'),
          ('10','http://10.42.0.1/videos/ENG-MBC-NTS-40.mp4','720', 'Romans#1 Introduction to Romans','http://10.42.0.1/Audio/ENG-MBC-NTS-40.mp3', '  1920', 'Lesson  40'),
          ('10','http://10.42.0.1/videos/ENG-MBC-NTS-41.mp4','720', 'Romans#2 The Four Kings and the Four Laws','http://10.42.0.1/Audio/ENG-MBC-NTS-41.mp3', '  1921', 'Lesson  41'),
          ('10','http://10.42.0.1/videos/ENG-MBC-NTS-42.mp4','720', 'Romans#3 Therefore','http://10.42.0.1/Audio/ENG-MBC-NTS-42.mp3', '  1922', 'Lesson  42'),
          ('10','http://10.42.0.1/videos/ENG-MBC-NTS-43.mp4','720', 'Romans#4 practical applications','http://10.42.0.1/Audio/ENG-MBC-NTS-43.mp3', '  1923', 'Lesson  43'),
          ('11','http://10.42.0.1/videos/ENG-MBC-NTS-44.mp4','720', '1 Corinthians#1 A church in Disorder','http://10.42.0.1/Audio/ENG-MBC-NTS-44.mp3', '  1924', 'Lesson  44'),
          ('11','http://10.42.0.1/videos/ENG-MBC-NTS-45.mp4','720', '1 Corinthians#2 Is Christ Divided','http://10.42.0.1/Audio/ENG-MBC-NTS-45.mp3', '  1925', 'Lesson  45'),
          ('11','http://10.42.0.1/videos/ENG-MBC-NTS-46.mp4','720', '1 Corinthians#3 Love Confronts','http://10.42.0.1/Audio/ENG-MBC-NTS-46.mp3', '  1926', 'Lesson  46'),
          ('11','http://10.42.0.1/videos/ENG-MBC-NTS-47.mp4','720', '1 Corinthians#4 Singleness and Marriage','http://10.42.0.1/Audio/ENG-MBC-NTS-47.mp3', '  1927', 'Lesson  47'),
          ('11','http://10.42.0.1/videos/ENG-MBC-NTS-48.mp4','720', '1 Corinthians#5 The Right to be Loving','http://10.42.0.1/Audio/ENG-MBC-NTS-48.mp3', '  1928', 'Lesson  48'),
          ('11','http://10.42.0.1/videos/ENG-MBC-NTS-49.mp4','720', '1 Corinthians#6 The Right to Practice Spiritual Gifts','http://10.42.0.1/Audio/ENG-MBC-NTS-49.mp3', '  1929', 'Lesson  49'),
          ('11','http://10.42.0.1/videos/ENG-MBC-NTS-50.mp4','720', '1 Corinthians#7 The Power of Godly Love','http://10.42.0.1/Audio/ENG-MBC-NTS-50.mp3', '  1930', 'Lesson  50'),
          ('11','http://10.42.0.1/videos/ENG-MBC-NTS-51.mp4','720', '2 Corinthians#1 The Task of the Minister','http://10.42.0.1/Audio/ENG-MBC-NTS-51.mp3', '  1931', 'Lesson  51'),
          ('11','http://10.42.0.1/videos/ENG-MBC-NTS-52.mp4','720', '2 Corinthians#2 Validating a Minister','http://10.42.0.1/Audio/ENG-MBC-NTS-52.mp3', '  1932', 'Lesson  52'),
          ('11','http://10.42.0.1/videos/ENG-MBC-NTS-53.mp4','720', '2 Corinthians#3 The Transformation of paul','http://10.42.0.1/Audio/ENG-MBC-NTS-53.mp3', '  1933', 'Lesson  53'),
          ('11','http://10.42.0.1/videos/ENG-MBC-NTS-54.mp4','720', '2 Corinthians#4 The Generous Steward','http://10.42.0.1/Audio/ENG-MBC-NTS-54.mp3', '  1934', 'Lesson  54'),
          ('12','http://10.42.0.1/videos/ENG-MBC-NTS-55.mp4','720', 'Galatians#1 Refuting the False Gospel','http://10.42.0.1/Audio/ENG-MBC-NTS-55.mp3', '  1935', 'Lesson  55'),
          ('12','http://10.42.0.1/videos/ENG-MBC-NTS-56.mp4','720', 'Galatians#2 Explaining the true Gospel','http://10.42.0.1/Audio/ENG-MBC-NTS-56.mp3', '  1936', 'Lesson  56'),
          ('12','http://10.42.0.1/videos/ENG-MBC-NTS-57.mp4','720', 'Galatians#3 The Gospel Reaped','http://10.42.0.1/Audio/ENG-MBC-NTS-57.mp3', '  1937', 'Lesson  57'),
          ('12','http://10.42.0.1/videos/ENG-MBC-NTS-58.mp4','720', 'Ephesians#1 Spiritual Blessing','http://10.42.0.1/Audio/ENG-MBC-NTS-58.mp3', '  1938', 'Lesson  58'),
          ('12','http://10.42.0.1/videos/ENG-MBC-NTS-59.mp4','720', 'Ephesians#2 Being Christs Church','http://10.42.0.1/Audio/ENG-MBC-NTS-59.mp3', '  1939', 'Lesson  59'),
          ('12','http://10.42.0.1/videos/ENG-MBC-NTS-60.mp4','720', 'Ephesians#3 The Extraordinary Life of Church','http://10.42.0.1/Audio/ENG-MBC-NTS-60.mp3', '  1940', 'Lesson  60'),
          ('12','http://10.42.0.1/videos/ENG-MBC-NTS-61.mp4','720', 'Phillipians#1 the fellowship in the Gospel','http://10.42.0.1/Audio/ENG-MBC-NTS-61.mp3', '  1941', 'Lesson  61'),
          ('12','http://10.42.0.1/videos/ENG-MBC-NTS-62.mp4','720', 'Phillipians#2 Patterns for Living in Christ','http://10.42.0.1/Audio/ENG-MBC-NTS-62.mp3', '  1942', 'Lesson  62'),
          ('12','http://10.42.0.1/videos/ENG-MBC-NTS-63.mp4','720', 'Phillipians#3 Path to Peace','http://10.42.0.1/Audio/ENG-MBC-NTS-63.mp3', '  1943', 'Lesson  63'),
          ('12','http://10.42.0.1/videos/ENG-MBC-NTS-64.mp4','720', 'Colossians: christs first','http://10.42.0.1/Audio/ENG-MBC-NTS-64.mp3', '  1944', 'Lesson  64'),
          ('12','http://10.42.0.1/videos/ENG-MBC-NTS-65.mp4','720', '1 Thessalonians: the blessed hope','http://10.42.0.1/Audio/ENG-MBC-NTS-65.mp3', '  1945', 'Lesson  65'),
          ('12','http://10.42.0.1/videos/ENG-MBC-NTS-66.mp4','720', '2 Thessalonians: Events of the Second Coming','http://10.42.0.1/Audio/ENG-MBC-NTS-66.mp3', '  1946', 'Lesson  66'),
          ('12','http://10.42.0.1/videos/ENG-MBC-NTS-67.mp4','720', '1Pastoral Epistles and Introduction','http://10.42.0.1/Audio/ENG-MBC-NTS-67.mp3', '  1947', 'Lesson  67'),
          ('12','http://10.42.0.1/videos/ENG-MBC-NTS-68.mp4','720', '1 Timothy: Godly Oversight','http://10.42.0.1/Audio/ENG-MBC-NTS-68.mp3', '  1948', 'Lesson  68'),
          ('12','http://10.42.0.1/videos/ENG-MBC-NTS-69.mp4','720', '1 Timothy & titus: The church of the three epiphanies','http://10.42.0.1/Audio/ENG-MBC-NTS-69.mp3', '  1949', 'Lesson  69'),
          ('12','http://10.42.0.1/videos/ENG-MBC-NTS-70.mp4','720', 'Philemon: From Slave to Brother','http://10.42.0.1/Audio/ENG-MBC-NTS-70.mp3', '  1950', 'Lesson  70'),
          ('12','http://10.42.0.1/videos/ENG-MBC-NTS-71.mp4','720', '2 Timothy#1 gods faithful minister','http://10.42.0.1/Audio/ENG-MBC-NTS-71.mp3', '  1951', 'Lesson  71'),
          ('12','http://10.42.0.1/videos/ENG-MBC-NTS-72.mp4','720', '2 Timothy#2 finishing Well','http://10.42.0.1/Audio/ENG-MBC-NTS-72.mp3', '  1952', 'Lesson  72'),
          ('13','http://10.42.0.1/videos/ENG-MBC-NTS-73.mp4','720', 'Hebrews#1 Jesus is Better','http://10.42.0.1/Audio/ENG-MBC-NTS-73.mp3', '  1953', 'Lesson  73'),
          ('13','http://10.42.0.1/videos/ENG-MBC-NTS-74.mp4','720', 'Hebrews#2 Beware the Road to Apostasy','http://10.42.0.1/Audio/ENG-MBC-NTS-74.mp3', '  1954', 'Lesson  74'),
          ('13','http://10.42.0.1/videos/ENG-MBC-NTS-75.mp4','720', 'Hebrews#3 The Family of Faith','http://10.42.0.1/Audio/ENG-MBC-NTS-75.mp3', '  1955', 'Lesson  75'),
          ('13','http://10.42.0.1/videos/ENG-MBC-NTS-76.mp4','720', 'James#1 Not Just Words but Actions','http://10.42.0.1/Audio/ENG-MBC-NTS-76.mp3', '  1956', 'Lesson  76'),
          ('13','http://10.42.0.1/videos/ENG-MBC-NTS-77.mp4','720', 'James#2 Transfomrative Faith','http://10.42.0.1/Audio/ENG-MBC-NTS-77.mp3', '  1957', 'Lesson  77'),
          ('13','http://10.42.0.1/videos/ENG-MBC-NTS-78.mp4','720', 'James#3 Single-minded Devotion','http://10.42.0.1/Audio/ENG-MBC-NTS-78.mp3', '  1958', 'Lesson  78'),
          ('13','http://10.42.0.1/videos/ENG-MBC-NTS-79.mp4','720', 'Epistles of Peter#1 The Three peters','http://10.42.0.1/Audio/ENG-MBC-NTS-79.mp3', '  1959', 'Lesson  79'),
          ('13','http://10.42.0.1/videos/ENG-MBC-NTS-80.mp4','720', 'Epistles of Peter#2 Salvation is Worth Suffering','http://10.42.0.1/Audio/ENG-MBC-NTS-80.mp3', '  1960', 'Lesson  80'),
          ('13','http://10.42.0.1/videos/ENG-MBC-NTS-81.mp4','720', 'Epistles of Peter#3 Escaping the Unnecessary Suffering','http://10.42.0.1/Audio/ENG-MBC-NTS-81.mp3', '  1961', 'Lesson  81'),
          ('13','http://10.42.0.1/videos/ENG-MBC-NTS-82.mp4','720', 'Epistles of Peter#4 Blessing in Persecution','http://10.42.0.1/Audio/ENG-MBC-NTS-82.mp3', '  1962', 'Lesson  82'),
          ('13','http://10.42.0.1/videos/ENG-MBC-NTS-83.mp4','720', 'Epistles of Peter#5 Knowing God Personally','http://10.42.0.1/Audio/ENG-MBC-NTS-83.mp3', '  1963', 'Lesson  83'),
          ('13','http://10.42.0.1/videos/ENG-MBC-NTS-84.mp4','720', '1 John#1 Assurance of Salvation','http://10.42.0.1/Audio/ENG-MBC-NTS-84.mp3', '  1964', 'Lesson  84'),
          ('13','http://10.42.0.1/videos/ENG-MBC-NTS-85.mp4','720', '1 John#2 Children of God or the Devil','http://10.42.0.1/Audio/ENG-MBC-NTS-85.mp3', '  1965', 'Lesson  85'),
          ('13','http://10.42.0.1/videos/ENG-MBC-NTS-86.mp4','720', '2&3 John True Love','http://10.42.0.1/Audio/ENG-MBC-NTS-86.mp3', '  1966', 'Lesson  86'),
          ('13','http://10.42.0.1/videos/ENG-MBC-NTS-87.mp4','720', 'Jude: fighting for Faith','http://10.42.0.1/Audio/ENG-MBC-NTS-87.mp3', '  1967', 'Lesson  87'),
          ('13','http://10.42.0.1/videos/ENG-MBC-NTS-88.mp4','720', 'Revelation#1 Faith in the Victorious God','http://10.42.0.1/Audio/ENG-MBC-NTS-88.mp3', '  1968', 'Lesson  88'),
          ('13','http://10.42.0.1/videos/ENG-MBC-NTS-89.mp4','720', 'Revelation#2 The Seven Churches of Revelation','http://10.42.0.1/Audio/ENG-MBC-NTS-89.mp3', '  1969', 'Lesson  89'),
          ('13','http://10.42.0.1/videos/ENG-MBC-NTS-90.mp4','720', 'Revelation#3 The End','http://10.42.0.1/Audio/ENG-MBC-NTS-90.mp3', '  1970', 'Lesson  90');

          

          
          PRAGMA journal_mode=WAL;
          pragma foreign_keys=ON;
        `);
      }}
      options={{useNewConnection: false}}>
    <Stack 
      screenOptions={{headerShown: false}}/>
      </SQLiteProvider>
      </AuthProvider>
  )
}

export default _layout