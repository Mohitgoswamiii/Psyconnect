import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // For icons
import { LinearGradient } from "expo-linear-gradient"; // Import LinearGradient

const ChatPage = () => {
  // Declare state for input text and messages
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSend = () => {
    if (inputText.trim() !== "") {
      // Add user message
      setMessages([...messages, { text: inputText, sender: "user" }]);
      setInputText(""); // Clear input field

      // Fetch response from Flask
      fetch("http://IPv4adress/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: inputText }),
      })
        .then((response) => response.json())
        .then((data) => {
          // Add bot's response
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: data.answer, sender: "bot" },
          ]);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      {/* Background gradient */}
      <LinearGradient
        colors={["#D6BD98", "#4D869C"]}
        style={styles.gradientBackground}
      >
        {/* Header */}
        <View style={styles.header}>
          <Ionicons name="menu-outline" size={28} color="black" />
          <Text style={styles.headerTitle}>PsyConnect</Text>
          <Ionicons name="ellipsis-vertical-outline" size={28} color="black" />
        </View>

        {/* Chat Area */}
        <ScrollView style={styles.chatContainer}>
          {messages.map((message, index) => (
            <View
              key={index}
              style={[
                styles.messageBubble,
                message.sender === "user"
                  ? styles.userMessage
                  : styles.botMessage,
              ]}
            >
              <Text style={styles.messageText}>{message.text}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Input Area */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Message"
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Ionicons name="arrow-up-circle-outline" size={32} color="white" />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientBackground: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "transparent",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginTop: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  chatContainer: {
    flex: 1,
    padding: 10,
  },
  messageBubble: {
    borderRadius: 20,
    padding: 10,
    marginTop: 10,
    maxWidth: "80%",
  },
  userMessage: {
    backgroundColor: "#DCF8C6",
    alignSelf: "flex-end",
  },
  botMessage: {
    backgroundColor: "#ECECEC",
    alignSelf: "flex-start",
  },
  messageText: {
    fontSize: 16,
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    backgroundColor: "#fff",
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 25,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: "#4D869C",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginLeft: 10,
  },
});

export default ChatPage;
