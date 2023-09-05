import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Button, Text, TextInput } from "react-native";
import Home from "./screens/Home";
import { useState } from "react";
import { STAGING_ACCESSTYPE_ENDPOINT } from "./constants";
import PurchaseSubscription from "./screens/PurchaseSubscription";

export default function App() {
  const [accesstypeEndpoint, setAccesstypeEndpoint] = useState(
    STAGING_ACCESSTYPE_ENDPOINT
  );
  const [accountKey, setAccountKey] = useState("JJFYNzeAuoGKM4NvLcGJmqi1");
  const [userJWT, setUserJWT] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN0cmlwZWF1Z3JlY3VyQHVzZXIuY29tIiwiaWQiOiIxNTE2MjM5MDIyMTIzNTYxMjAwIn0.Fi-69eq8-m5W1d4Y3Mg3gP2MteODKUzPb2QPkh0dqI8");

  return (
    <View style={styles.container}>
      <Text>Accesstype Endpoint:</Text>
      <TextInput
        style={styles.formInput}
        value={accesstypeEndpoint}
        onChangeText={setAccesstypeEndpoint}
      />
      <Text>Accesstype Account Key:</Text>
      <TextInput
        style={styles.formInput}
        value={accountKey}
        onChangeText={setAccountKey}
      />
      <Text>User JWT:</Text>
      <TextInput
        style={styles.formInput}
        value={userJWT}
        onChangeText={setUserJWT}
      />
      <PurchaseSubscription
        accesstypeEndpoint={accesstypeEndpoint}
        accountKey={accountKey}
        userJWT={userJWT}
      />
      <Home
        accesstypeEndpoint={accesstypeEndpoint}
        accountKey={accountKey}
        userJWT={userJWT}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    width: "100%",
    padding: 10,
  },
  formInput: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
    marginBottom: 16,
    width: 400,
  },
});
