import { api } from "@/services/api";
import { PageResponse, Post } from "@/types/post";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const router = useRouter(); // 👈 Colocado dentro do componente
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchPosts() {
    try {
      setLoading(true);
      const response = await api.get<PageResponse<Post>>("/api/v1/posts");
      setPosts(response.data.content);
    } catch (error) {
      console.error("Erro ao buscar posts:", error);
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
        <Text style={styles.loadingText}>Carregando artigos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* 👈 Barra de Botões de Ação (Alinhados Lado a Lado) */}
      <View style={styles.actionRow}>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => router.push("/login")}
          activeOpacity={0.8}
        >
          <Text style={styles.loginBtnText}>🔑 Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.createBtn}
          onPress={() => router.push("/create-post")}
          activeOpacity={0.8}
        >
          <Text style={styles.createBtnText}>✍️ + Novo Post</Text>
        </TouchableOpacity>
      </View>

      {/* 👈 Feed de Posts */}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listPadding}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/posts/${item.slug}`)}
            activeOpacity={0.7}
          >
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardSummary}>
              {item.summary || "Sem resumo disponível."}
            </Text>
            <Text style={styles.cardDate}>
              Criado em: {new Date(item.createdAt).toLocaleDateString("pt-BR")}
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhum post publicado ainda.</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121214", // Fundo Escuro Moderno
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  center: {
    flex: 1,
    backgroundColor: "#121214",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#8D8D99",
    marginTop: 12,
  },
  actionRow: {
    flexDirection: "row", // 👈 Coloca os botões lado a lado na horizontal
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    gap: 12, // Espaçamento de 12px entre os dois botões
  },
  loginBtn: {
    flex: 1,
    backgroundColor: "#202024",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#323238",
  },
  loginBtnText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
  },
  createBtn: {
    flex: 1,
    backgroundColor: "#007ACC", // Azul destacado para o botão de ação principal
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  createBtnText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
  },
  listPadding: {
    paddingBottom: 24,
  },
  card: {
    backgroundColor: "#202024",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#323238",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#E1E1E6",
    marginBottom: 6,
  },
  cardSummary: {
    fontSize: 14,
    color: "#C4C4CC",
    marginBottom: 8,
    lineHeight: 20,
  },
  cardDate: {
    fontSize: 12,
    color: "#7C7C8A",
  },
  emptyContainer: {
    paddingTop: 40,
    alignItems: "center",
  },
  emptyText: {
    color: "#8D8D99",
    fontSize: 16,
  },
});
