import { api, setAuthToken } from "@/services/api";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!username.trim() || !password.trim()) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      setLoading(true);
      const response = await api.post("/users/auth/login", {
        email: username.trim(),
        password: password.trim(),
      });

      const token = response.data.accessToken || response.data.token;

      if (token) {
        setAuthToken(token);
        alert("Login realizado com sucesso!");
        router.replace("/");
      } else {
        alert("Token não retornado pela API.");
      }
    } catch (error: any) {
      console.error("Erro no login:", error);
      alert("Falha ao autenticar. Verifique e-mail/usuário e senha.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.backgroundContainer}>
      <View style={styles.cardContainer}>
        <Text style={styles.title}>Entrar no Nerdlab</Text>
        <Text style={styles.subtitle}>
          Faça login para publicar novos artigos
        </Text>

        <Text style={styles.label}>Usuário ou E-mail</Text>
        <TextInput
          style={styles.input}
          placeholder="ex: andre.souza@nerdlab.dev"
          placeholderTextColor="#7C7C8A"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          placeholderTextColor="#7C7C8A"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={loading}
          activeOpacity={0.8}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>Entrar</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    backgroundColor: "#121214",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  cardContainer: {
    width: "100%",
    maxWidth: 500, // 👈 Limite de 500px
    backgroundColor: "#202024",
    borderRadius: 12,
    padding: 28,
    borderWidth: 1,
    borderColor: "#323238",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: "#8D8D99",
    marginBottom: 24,
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
  button: {
    backgroundColor: "#007ACC",
    borderRadius: 8,
    padding: 14,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
