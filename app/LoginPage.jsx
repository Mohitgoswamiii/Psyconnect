import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router"; // Use Expo Router

const { width } = Dimensions.get("window");

const LoginPage = () => {
  const router = useRouter(); // Use the Expo Router hook for navigation

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Let's Connect{"\n"}with PsyConnect</Text>

      <View style={styles.bottomCircle}>
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.buttonText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>

        {/* Log in button will navigate to ChatPage */}
        <TouchableOpacity
          style={styles.tertiaryButton}
          onPress={() => router.push("/ChatPage")} // Navigate to ChatPage
        >
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D6BD98",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    color: "#1A3636",
    fontWeight: "bold",
    marginBottom: 60,
    textAlign: "center",
  },
  bottomCircle: {
    position: "absolute",
    bottom: 0,
    width: width,
    height: 200,
    borderTopLeftRadius: 150,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 150,
    backgroundColor: "#40534C",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  primaryButton: {
    backgroundColor: "#EFBC9B",
    padding: 10,
    borderRadius: 30,
    width: "80%",
    alignItems: "center",
    marginBottom: 10,
  },
  secondaryButton: {
    backgroundColor: "#677D6A",
    padding: 10,
    borderRadius: 30,
    width: "80%",
    alignItems: "center",
    marginBottom: 10,
  },
  tertiaryButton: {
    backgroundColor: "#1A3636",
    padding: 10,
    borderRadius: 30,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
  },
});

export default LoginPage;
