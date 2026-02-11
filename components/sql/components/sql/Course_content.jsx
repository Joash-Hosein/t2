import { useSQLiteContext } from 'expo-sqlite';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Video } from 'expo-av';

interface ContentItem {
  CONTENT_ID: number;
  course_id: number;
  video_url: string;
  video_duration: number;
  video_title: string;
  audio_url: string;
  audio_duration: number;
  audio_title: string;
}

interface CourseContentProps {
  courseId: number;
}

const CourseContent = ({ courseId }: CourseContentProps) => {
  const db = useSQLiteContext();
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const result = await db.getAllAsync('SELECT * FROM content WHERE course_id = ?', [courseId]);
        setContent(result as ContentItem[]);
      } catch (err) {
        setError('Failed to load content');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [db, courseId]);

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Loading content...</Text>
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

  const renderContentItem = ({ item }: { item: ContentItem }) => (
    <View style={styles.contentItem}>
      <Text style={styles.title}>{item.video_title}</Text>
      <Video
        source={{ uri: item.video_url }}
        style={styles.video}
        useNativeControls
        resizeMode="contain"
      />
      <Text style={styles.title}>{item.audio_title}</Text>
      <Video
        source={{ uri: item.audio_url }}
        style={styles.audio}
        useNativeControls
        resizeMode="contain"
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Course Content</Text>
      <FlatList
        data={content}
        keyExtractor={(item) => item.CONTENT_ID.toString()}
        renderItem={renderContentItem}
        ListEmptyComponent={<Text>No content available.</Text>}
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
  contentItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  video: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  audio: {
    width: '100%',
    height: 50,
  },
  error: {
    color: 'red',
    fontSize: 16,
  },
});

export default CourseContent;
