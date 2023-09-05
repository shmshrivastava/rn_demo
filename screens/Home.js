import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { getSubscriptions } from "../api";

export default function Home({
  accesstypeEndpoint,
  accountKey,
  userJWT,
}) {
  const [subscriptions, setSubscriptions] = useState([]);

  const handleGetSubscriptionsClick = () => {
    getSubscriptions(accesstypeEndpoint, accountKey, userJWT).then(subs => {
      setSubscriptions(subs)
    })
  }

  return (
    <View style={styles.container}>
      <Button style={styles.formButton} title="Get Subscriptions" onPress={handleGetSubscriptionsClick} />
      <Text>{JSON.stringify(subscriptions, null, 4)}</Text>
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
  formButton: {
    padding: 10,
    marginTop: 10,
  },
});
