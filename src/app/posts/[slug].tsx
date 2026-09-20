import { api } from "@/services/api";
import { Post } from "@/types/post";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

import Markdown from "react-native-markdown-display";

export default function PostDetailsScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPostDetails() {
      try {
        setLoading(true);
        const response = await api.get<Post>(`/api/v1/posts/${slug}`);
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchPostDetails();
    }
  }, [slug]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007ACC" />
      </View>
    );
  }
  if (!post) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Post não encontrado.</Text>
      </View>
    );
  }
  return (
    <>
      {}
      <Stack.Screen
        options={{
          title: post ? post.title : "Carregando artigo...",
          headerBackTitle: "Voltar",
        }}
      />
      <ScrollView style={styles.container}>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.date}>
          Publicado em: {new Date(post.createdAt).toLocaleDateString("pt-BR")}
        </Text>

        <View style={styles.divider} />
        <Markdown style={markdownStyles}>{post.content}</Markdown>
      </ScrollView>
    </>
  );
}

const markdownStyles = StyleSheet.create({
  body: {
    color: "#C4C4CC",
    fontSize: 16,
    lineHeight: 26,
  },
  heading1: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  heading2: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 12,
    marginBottom: 6,
  },
  paragraph: {
    marginBottom: 12,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121214",
    padding: 20,
  },
  center: {
    flex: 1,
    backgroundColor: "#121214",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 10,
    lineHeight: 34,
  },
  date: {
    fontSize: 14,
    color: "#7C7C8A",
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: "#323238",
    marginBottom: 20,
  },
  content: {
    fontSize: 16,
    color: "#C4C4CC",
    lineHeight: 26,
  },
  errorText: {
    color: "#F75A68",
    fontSize: 16,
  },
});
