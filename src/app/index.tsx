import { api } from "@/services/api";
import { PageResponse, Post } from "@/types/post";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function HomeScreen() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchPosts() {
    try {
      setLoading(true);
      const response = await api.get<PageResponse<Post>>("/api/v1/posts");
      setPosts(response.data.content);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007ACC" />
        <Text style={styles.title}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardSummary}>
              {item.summary || "No summary available."}
            </Text>
            <Text style={styles.cardDate}>
              Criado em: {new Date(item.createdAt).toLocaleDateString("pt-BR")}
            </Text>
          </View>
        )}
        ListEmptyComponent={() => (
          <View style={styles.center}>
            <Text style={styles.subtitle}>No posts available.</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#f0f0f0",
    margin: 10,
    padding: 10,
    borderRadius: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  cardSummary: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  cardDate: {
    fontSize: 12,
    color: "#333",
  },
});
