import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Sbanner from '../../components/banners/Sbanner';

// Sample data for mockup
const overallProgress = 75; // Percentage
const courses = [
  { id: 1, name: 'Study of the New Testament', progress: 90.2, image: require('../../assets/course_images/course-01.png') },
  { id: 2, name: 'Study of the Old Testament', progress: 62.5, image: require('../../assets/course_images/course-02.png') },
];

const progresstracker = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Sbanner />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Overall Progress Summary */}
        <View style={styles.summaryContainer}>
          <Text style={styles.title}>Overall Progress</Text>
          <Text style={styles.progressText}>{overallProgress}% Complete</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${overallProgress}%` }]} />
          </View>
        </View>

        {/* Courses List */}
        <View style={styles.coursesContainer}>
          <Text style={styles.sectionTitle}>Course Progress</Text>
          {courses.map((course) => (
            <View key={course.id} style={styles.courseItem}>
              <Image source={course.image} style={styles.courseImage} />
              <View style={styles.courseDetails}>
                <Text style={styles.courseName}>{course.name}</Text>
                <Text style={styles.courseProgressText}>{course.progress}% Complete</Text>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: `${course.progress}%` }]} />
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default progresstracker

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    padding: 20,
  },
  summaryContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#324599',
    marginBottom: 10,
  },
  progressText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
  progressBar: {
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    width: '100%',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#324599',
    borderRadius: 5,
  },
  coursesContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#324599',
    marginBottom: 15,
  },
  courseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  courseImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 15,
  },
  courseDetails: {
    flex: 1,
  },
  courseName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  courseProgressText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
})
