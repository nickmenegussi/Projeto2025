import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import useComments from '../../../../../hooks/useComments'; // ajuste esse caminho conforme sua estrutura

export default function Comments() {
  const { postId } = useLocalSearchParams();
  const { post, comments, loading } = useComments(postId);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#000" />
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Post: {post?.content}</Text>
      <FlatList
        data={comments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.comment}>
            <Text style={styles.author}>{item.userName}:</Text>
            <Text>{item.content}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>Nenhum comentário ainda.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff', flex: 1 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  comment: { marginBottom: 10, padding: 10, backgroundColor: '#f0f0f0', borderRadius: 8 },
  author: { fontWeight: 'bold' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
