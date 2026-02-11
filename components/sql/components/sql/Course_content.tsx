import { Audio } from 'expo-av';
import { useSQLiteContext } from 'expo-sqlite';
import { VideoView, useVideoPlayer } from 'expo-video';
import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
  const [audioStates, setAudioStates] = useState<Map<number, { sound: Audio.Sound | null, isPlaying: boolean }>>(new Map());

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

  useEffect(() => {
    Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
    });
  }, []);

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

  const renderVideoItem = ({ item }: { item: ContentItem }) => {
    const player = useVideoPlayer(item.video_url, (player) => {
      player.loop = false;
    });

    return (
      <View style={styles.contentItem}>
        <Text style={styles.title}>{item.video_title}</Text>
        <VideoView
          style={styles.video}
          player={player}
          allowsFullscreen
          allowsPictureInPicture
        />
      </View>
    );
  };

  const playPauseAudio = async (contentId: number, audioUrl: string) => {
    const currentState = audioStates.get(contentId);
    if (currentState?.sound) {
      if (currentState.isPlaying) {
        await currentState.sound.pauseAsync();
        setAudioStates(prev => new Map(prev.set(contentId, { ...currentState, isPlaying: false })));
      } else {
        await currentState.sound.playAsync();
        setAudioStates(prev => new Map(prev.set(contentId, { ...currentState, isPlaying: true })));
      }
    } else {
      const { sound } = await Audio.Sound.createAsync({ uri: audioUrl });
      await sound.playAsync();
      setAudioStates(prev => new Map(prev.set(contentId, { sound, isPlaying: true })));
    }
  };

  const renderAudioItem = ({ item }: { item: ContentItem }) => {
    const state = audioStates.get(item.CONTENT_ID);
    return (
      <View style={styles.contentItem}>
        <Text style={styles.title}>{item.audio_title}</Text>
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

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Course Content</Text>

      <Text style={styles.sectionHeader}>Videos</Text>
      <FlatList
        data={content}
        keyExtractor={(item) => item.CONTENT_ID.toString()}
        renderItem={renderVideoItem}
        ListEmptyComponent={<Text>No videos available.</Text>}
        scrollEnabled={false}
      />

      <Text style={styles.sectionHeader}>Audios</Text>
      <FlatList
        data={content}
        keyExtractor={(item) => item.CONTENT_ID.toString()}
        renderItem={renderAudioItem}
        ListEmptyComponent={<Text>No audios available.</Text>}
        scrollEnabled={false}
      />
    </ScrollView>
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
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  playButton: {
    backgroundColor: '#324599',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  playButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CourseContent;
