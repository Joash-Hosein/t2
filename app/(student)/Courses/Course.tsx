import { Audio } from 'expo-av';
import { useSQLiteContext } from 'expo-sqlite';
import { VideoView, useVideoPlayer } from 'expo-video';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// Course type from database
interface Course {
  COURSES_ID: number;
  course_image: string;
  course_name: string;
  description: string;
  language: string;
}

// Content type from database
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

// Separate component for video items (defined outside to follow Rules of Hooks)
interface VideoItemProps {
  videoUrl: string;
  title: string;
}

const VideoItem: React.FC<VideoItemProps> = ({ videoUrl, title }) => {
  const player = useVideoPlayer(videoUrl, (player) => {
    player.loop = false;
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Reset state when video URL changes
    setLoading(true);
    setError(null);
  }, [videoUrl]);

  return (
    <View style={styles.contentItem}>
      <Text style={styles.contentTitle}>{title}</Text>

      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            Video cannot be loaded. Please check your network or server.
          </Text>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <>
          {loading && (
            <ActivityIndicator
              size="large"
              color="#324599"
              style={styles.loader}
            />
          )}
          <VideoView
            style={styles.video}
            player={player}
            allowsFullscreen={true}
            allowsPictureInPicture={true}
          />
        </>
      )}
    </View>
  );
};

const Course = () => {
  const db = useSQLiteContext();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showContent, setShowContent] = useState(false);
  const [content, setContent] = useState<ContentItem[]>([]);
  const [audioStates, setAudioStates] = useState<Map<number, { sound: Audio.Sound | null; isPlaying: boolean }>>(
    new Map()
  );

  // Fetch all courses from database
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Fetch only first 13 courses
        const result = await db.getAllAsync('SELECT * FROM courses LIMIT 13');
        setCourses(result as Course[]);
      } catch (err) {
        console.error('Failed to load courses:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [db]);

  // Fetch content for selected course
  useEffect(() => {
    if (selectedCourse) {
      const fetchContent = async () => {
        try {
          const result = await db.getAllAsync(
            'SELECT * FROM content WHERE course_id = ?',
            [selectedCourse.COURSES_ID]
          );
          setContent(result as ContentItem[]);
        } catch (err) {
          console.error('Failed to load content:', err);
        }
      };

      fetchContent();
    }
  }, [db, selectedCourse]);

  // Set audio mode
  useEffect(() => {
    Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
    });
  }, []);

  const handleCoursePress = (course: Course) => {
    setSelectedCourse(course);
    setShowContent(true);
  };

  const closeContent = () => {
    // Stop all playing audio
    audioStates.forEach(async (state) => {
      if (state.sound) {
        await state.sound.stopAsync();
        await state.sound.unloadAsync();
      }
    });
    setAudioStates(new Map());
    setShowContent(false);
    setSelectedCourse(null);
    setContent([]);
  };

  const playPauseAudio = async (contentId: number, audioUrl: string) => {
    const currentState = audioStates.get(contentId);
    if (currentState?.sound) {
      if (currentState.isPlaying) {
        await currentState.sound.pauseAsync();
        setAudioStates((prev) =>
          new Map(prev.set(contentId, { ...currentState, isPlaying: false }))
        );
      } else {
        await currentState.sound.playAsync();
        setAudioStates((prev) =>
          new Map(prev.set(contentId, { ...currentState, isPlaying: true }))
        );
      }
    } else {
      const { sound } = await Audio.Sound.createAsync({ uri: audioUrl });
      await sound.playAsync();
      setAudioStates((prev) =>
        new Map(prev.set(contentId, { sound, isPlaying: true }))
      );
    }
  };

  const renderCourseItem = ({ item }: { item: Course }) => {
    // Map course images based on the database filename
    // The database stores: course-01.png, course-02.png, etc.
    // We only have 2 actual images, so we'll map them appropriately
    const getImageSource = (imageName: string) => {
      // Use the actual filename from the database to select the appropriate image
      if (imageName.includes('01')) {
        return require('../../../assets/course_images/course-01.png');
      } else if (imageName.includes('02')) {
        return require('../../../assets/course_images/course-02.png');
      } else if (imageName.includes('03')) {
        return require('../../../assets/course_images/course-03.png');
      } else if (imageName.includes('04')) {
        return require('../../../assets/course_images/course-04.png');
      } else if (imageName.includes('05')) {
        return require('../../../assets/course_images/course-05.png');
      } else if (imageName.includes('06')) {
        return require('../../../assets/course_images/course-06.png');
      } else if (imageName.includes('07')) {
        return require('../../../assets/course_images/course-07.png');
      } else if (imageName.includes('08')) {
        return require('../../../assets/course_images/course-08.png');
      } else if (imageName.includes('09')) {
        return require('../../../assets/course_images/course-09.png');
      } else if (imageName.includes('10')) {
        return require('../../../assets/course_images/course-10.png');
      } else if (imageName.includes('11')) {
        return require('../../../assets/course_images/course-11.png');
      } else if (imageName.includes('12')) {
        return require('../../../assets/course_images/course-12.png');
      } else if (imageName.includes('13')) {
        return require('../../../assets/course_images/course-13.png');
      }
      // Default fallback
      return require('../../../assets/course_images/course-01.png');
    };

    return (
      <Pressable
        style={styles.courseItem}
        onPress={() => handleCoursePress(item)}
      >
        <Image
          source={getImageSource(item.course_image)}
          style={styles.courseImage}
        />
        <Text style={styles.courseTitle} numberOfLines={2}>{item.course_name}</Text>
      </Pressable>
    );
  };

  const renderVideoItem = ({ item }: { item: ContentItem }) => {
    return <VideoItem videoUrl={item.video_url} title={item.video_title} />;
  };

  const renderAudioItem = ({ item }: { item: ContentItem }) => {
    const state = audioStates.get(item.CONTENT_ID);
    return (
      <View style={styles.contentItem}>
        <Text style={styles.contentTitle}>{item.audio_title}</Text>
        <TouchableOpacity
          style={styles.playButton}
          onPress={() => playPauseAudio(item.CONTENT_ID, item.audio_url)}
        >
          <Text style={styles.playButtonText}>
            {state?.isPlaying ? 'Pause' : 'Play'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Loading courses...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Courses</Text>
      <FlatList
        data={courses}
        keyExtractor={(item) => item.COURSES_ID.toString()}
        renderItem={renderCourseItem}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<Text>No courses available.</Text>}
      />

      {/* Modal for course details and content */}
      <Modal
        visible={showContent}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={closeContent}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {selectedCourse?.course_name}
            </Text>
            <TouchableOpacity onPress={closeContent} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            {/* Course Description */}
            <Text style={styles.descriptionTitle}>Description</Text>
            <Text style={styles.description}>
              {selectedCourse?.description}
            </Text>

            {/* Video Section */}
            <Text style={styles.sectionHeader}>Videos</Text>
            <FlatList
              data={content}
              keyExtractor={(item) => item.CONTENT_ID.toString()}
              renderItem={renderVideoItem}
              ListEmptyComponent={<Text>No videos available.</Text>}
              scrollEnabled={false}
            />

            {/* Audio Section */}
            <Text style={styles.sectionHeader}>Audios</Text>
            <FlatList
              data={content}
              keyExtractor={(item) => item.CONTENT_ID.toString()}
              renderItem={renderAudioItem}
              ListEmptyComponent={<Text>No audios available.</Text>}
              scrollEnabled={false}
            />
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    paddingTop: 20,
    color: '#324599',
  },
  listContent: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  courseItem: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
  },
  courseImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 10,
  },
  courseTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    marginTop: 50,
    marginBottom: 20,
    marginHorizontal: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 15,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#324599',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
  },
  closeButton: {
    padding: 8,
    backgroundColor: '#FF6B6B',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContent: {
    flex: 1,
    padding: 15,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#324599',
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: '#333',
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#324599',
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
  contentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  video: {
    width: '100%',
    height: 220,
    marginBottom: 10,
    borderRadius: 8,
  },
  playButton: {
    backgroundColor: '#324599',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  playButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loader: {
    position: 'absolute',
    top: '40%',
    left: '45%',
    zIndex: 10,
  },
  errorContainer: {
    padding: 20,
    backgroundColor: '#ffe6e6',
    borderRadius: 8,
  },
  errorText: {
    color: '#ff0000',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default Course;
