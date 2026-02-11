import { useSQLiteContext } from 'expo-sqlite';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CourseContent from '../../../components/sql/Course_content.tsx';

interface Course {
  COURSES_ID: number;
  course_name: string;
  description: string;
  language: string;
  course_image: string;
}

const getCourseImage = (imageName: string) => {
  const images: { [key: string]: any } = {
    'course-01.png': require('../../../assets/course-images/course-01.png'),
    'course-02.png': require('../../../assets/course-images/course-02.png'),
    'course-03.png': require('../../../assets/course-images/course-03.png'),
    'course-04.png': require('../../../assets/course-images/course-04.png'),
    'course-05.png': require('../../../assets/course-images/course-05.png'),
    'course-06.png': require('../../../assets/course-images/course-06.png'),
    'course-07.png': require('../../../assets/course-images/course-07.png'),
    'course-08.png': require('../../../assets/course-images/course-08.png'),
    'course-09.png': require('../../../assets/course-images/course-09.png'),
    'course-10.png': require('../../../assets/course-images/course-10.png'),
    'course-11.png': require('../../../assets/course-images/course-11.png'),
    'course-12.png': require('../../../assets/course-images/course-12.png'),
    'course-13.png': require('../../../assets/course-images/course-13.png'),
  };
  return images[imageName] || require('../../../assets/course-images/course-01.png'); // default
};

const CourseHome = () => {
  const db = useSQLiteContext();
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const result = await db.getAllAsync('SELECT * FROM courses');
        setCourses(result as Course[]);
      } catch (err) {
        setError('Failed to load courses');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [db]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  if (selectedCourseId) {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => setSelectedCourseId(null)} style={styles.backButton}>
          <Text style={styles.backText}>Back to Courses</Text>
        </TouchableOpacity>
        <CourseContent courseId={selectedCourseId} />
      </View>
    );
  }

  const renderCourse = ({ item }: { item: Course }) => (
    <TouchableOpacity
      style={styles.courseItem}
      onPress={() => setSelectedCourseId(item.COURSES_ID)}
    >
      <Image source={getCourseImage(item.course_image)} style={styles.courseImage} />
      <Text style={styles.courseName}>{item.course_name}</Text>
      <Text style={styles.courseDescription}>{item.description}</Text>
      <Text style={styles.courseLanguage}>Language: {item.language}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select a Course</Text>
      <FlatList
        data={courses}
        keyExtractor={(item) => item.COURSES_ID.toString()}
        renderItem={renderCourse}
        ListEmptyComponent={<Text>No courses available.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  courseItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  courseImage: {
    width: 60,
    height: 60,
    marginRight: 15,
    borderRadius: 8,
  },
  courseName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  courseDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  courseLanguage: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
  },
  backButton: {
    backgroundColor: '#324599',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  backText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    fontSize: 16,
  },
});

export default CourseHome;
