import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons, Feather } from "@expo/vector-icons";
import useComments from "../../../../../hooks/useComments";
import { createComment } from "../../../../../services/ServiceComments";

export default function Comments() {
  const { postId } = useLocalSearchParams();
  const { post, comments, loading, addLocalComment, refetch } = useComments(postId);
  const [newComment, setNewComment] = useState("");
  

  const handleSendComment = async () => {
    try {
      const createdComment = await createComment(postId, newComment);
      addLocalComment(createdComment.data);
      setNewComment("");
    } catch (error) {
      console.error("Erro ao enviar comentário:", error);
    }
  };

  // conexão do frontend com backend
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1DA1F2" />
        <Text style={styles.loadingText}>Carregando comentários...</Text>
      </View>
    );
  }



  return (
  <SafeAreaView style={styles.safeArea}>
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : -80}
    >
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.push('/community')}>
          <Ionicons name="arrow-back" size={24} color="#1DA1F2" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Comentários</Text>
      </View>

      {/* Original Post */}
      <View style={styles.originalPost}>
        <View style={styles.postHeader}>
          <View style={styles.avatar} />
          <View>
            <Text style={styles.postAuthor}>{post?.nameUser}</Text>
            <Text style={styles.postUsername}>@{post?.nameUser}</Text>
          </View>
        </View>
        <Text style={styles.postContent}>{post?.content}</Text>
        <Text style={styles.postTime}>2h atrás</Text>
      </View>

      {/* Conteúdo principal: FlatList + input */}
      <View style={{ flex: 1 }}>
        <FlatList
          data={comments}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.idComments.toString()}
          renderItem={({ item }) => (
            <View style={styles.commentContainer}>
              <View style={styles.commentAvatar} />
              <View style={styles.commentContent}>
                <Text style={styles.commentAuthor}>{item.nameUser}</Text>
                <Text style={styles.commentText}>{item.content}</Text>
                <View style={styles.commentActions}>
                  <TouchableOpacity style={styles.commentAction}>
                    <Feather name="heart" size={16} color="white" />
                  </TouchableOpacity>
                  <Text style={styles.commentActionText}>12</Text>
                </View>
              </View>
            </View>
          )}
          ListEmptyComponent={
            <View style={styles.emptyComments}>
              <Text style={styles.emptyText}>Nenhum comentário ainda</Text>
              <Text style={styles.emptySubtext}>Seja o primeiro a comentar!</Text>
            </View>
          }
          contentContainerStyle={styles.commentsList}
        />

        {/* Comment Input */}
        <View style={styles.commentInputContainer}>
          <View style={styles.inputAvatar} />
          <TextInput
            style={styles.commentInput}
            placeholder="Tweet sua resposta"
            placeholderTextColor="black"
            value={newComment}
            onChangeText={setNewComment}
            multiline
          />
          <TouchableOpacity
            style={[styles.sendButton, !newComment && styles.sendButtonDisabled]}
            onPress={handleSendComment}
          >
            <Feather
              name="send"
              size={20}
              color={newComment ? "#1DA1F2" : "#AAB8C2"}
            />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  </SafeAreaView>
);
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#003B73",
  },
   header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginTop: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#E1E8ED",
  },
  backButton: {
    marginRight: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  loadingText: {
    marginTop: 10,
    color: "white",
  },
  originalPost: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E1E8ED",
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E1E8ED",
    marginRight: 10,
  },
  postAuthor: {
    fontWeight: "bold",
    fontSize: 15,
    color: "white"
  },
  postUsername: {
    color: "white",
    fontSize: 14,
  },
  postContent: {
    fontSize: 16,
    color: "white",
    lineHeight: 22,
    marginBottom: 8,
  },
  postTime: {
    color: "white",
    fontSize: 14,
  },
  commentsList: {
    paddingBottom: 60,
  },
  commentContainer: {
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E1E8ED",
  },
  commentAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#E1E8ED",
    marginRight: 12,
  },
  commentContent: {
    flex: 1,
  },
  commentAuthor: {
    fontWeight: "bold",
    marginBottom: 4,
    color: "white"
  },
  commentText: {
    fontSize: 15,
    lineHeight: 20,
    color: "white",
    marginBottom: 8,
  },
  commentActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  commentAction: {
    marginRight: 6,
  },
  commentActionText: {
    color: "white",
    fontSize: 13,
  },
  emptyComments: {
    padding: 30,
    alignItems: "start",
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    color: "white",
  },
  emptySubtext: {
    fontSize: 14,
    color: "white",
  },
  commentInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: "#E1E8ED",
    backgroundColor: "#003B73",
    paddingBottom: 130,
  },
  inputAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#E1E8ED",
    marginRight: 10,
  },
  commentInput: {
    flex: 1,
    minHeight: 60,
    maxHeight: 120,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: "#F7F9FA",
    borderRadius: 20,
    fontSize: 15,
    color: "#0F1419",
  },
  sendButton: {
    marginLeft: 10,
    padding: 8,
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
});
