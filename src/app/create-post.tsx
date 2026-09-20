import { api } from "@/services/api";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function CreatePostScreen() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCreatePost() {
    if (!title.trim() || !content.trim()) {
      alert("Título e Conteúdo são obrigatórios!");
      return;
    }

    try {
      setLoading(true);
      await api.post("/api/v1/posts", {
        title: title.trim(),
        summary: summary.trim(),
        content: content.trim(),
        published: true,
      });

      alert("Post publicado com sucesso!");
      router.replace("/");
    } catch (error: any) {
      console.error("Erro ao criar post:", error);
      alert("Erro ao publicar. Certifique-se de estar autenticado.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView
      style={styles.backgroundContainer}
      contentContainerStyle={styles.centerWrapper}
    >
      <View style={styles.cardContainer}>
        <Text style={styles.headerTitle}>Novo Artigo</Text>

        <Text style={styles.label}>Título *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Guia Completo de React Native"
          placeholderTextColor="#7C7C8A"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Resumo (Breve introdução)</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Aprenda os conceitos essenciais do Expo..."
          placeholderTextColor="#7C7C8A"
          value={summary}
          onChangeText={setSummary}
        />

        <Text style={styles.label}>Conteúdo * (Suporta Markdown)</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="# Seu Título aqui&#10;&#10;Escreva o artigo completo..."
          placeholderTextColor="#7C7C8A"
          value={content}
          onChangeText={setContent}
          multiline
          numberOfLines={8}
          textAlignVertical="top"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleCreatePost}
          disabled={loading}
          activeOpacity={0.8}
        >
          {loading ? (
            <ActivityIndicator color="#000" />
          ) : (
            <Text style={styles.buttonText}>Publicar Artigo</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    backgroundColor: "#121214",
  },
  centerWrapper: {
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
  },
  cardContainer: {
    width: "100%",
    maxWidth: 500, // 👈 Limita a 500px no computador
    backgroundColor: "#202024",
    borderRadius: 12,
    padding: 24,
    borderWidth: 1,
    borderColor: "#323238",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 20,
  },
  label: {
    color: "#E1E1E6",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#121214",
    color: "#FFFFFF",
    borderRadius: 8,
    padding: 14,
    fontSize: 15,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#323238",
  },
  textArea: {
    height: 150,
  },
  button: {
    backgroundColor: "#04D361",
    borderRadius: 8,
    padding: 14,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
  },
});
