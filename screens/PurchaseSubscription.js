import { useEffect, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import {
  getSubscriptionGroups,
  getSubscriptions,
  previewSubscription,
} from "../api";

const PlanItem = ({ item, onPlanSelect }) => (
  <TouchableOpacity
    onPress={() => item.onPlanSelect(item)}
    style={[styles.planItem]}
  >
    <Text>{item.title}</Text>
  </TouchableOpacity>
);

const GroupItem = ({ item }) => (
  <View style={[styles.groupItem]}>
    <Text>{item.name}</Text>
    <FlatList
      data={item.subscription_plans.map((planItem) => {
        return { ...planItem, onPlanSelect: (plan) => item.onPlanSelect(plan) };
      })}
      renderItem={PlanItem}
      keyExtractor={(item) => item.id}
    />
  </View>
);

function makeSubscriptionParams(plan) {
  return {
    subscription_plan_id: plan.id,
    notes: "enter your notes",
    payment: {
      payment_type: plan.recurring ? "applepay_recurring" : "applepay",
      amount_cents: plan.price_cents,
      amount_currency: plan.price_currency,
    },
  };
}

export default function PurchaseSubscription({
  accesstypeEndpoint,
  accountKey,
  userJWT,
}) {
  const [standardGroups, setStandardGroups] = useState([]);
  const [campaignGroups, setCampaignGroups] = useState([]);
  const [groupAccessGroups, setGroupAccessGroups] = useState([]);

  const [selectedPlan, setSelectedPlan] = useState();

  useEffect(() => {
    getSubscriptionGroups(
      accesstypeEndpoint,
      accountKey,
      userJWT,
      "standard"
    ).then((data) => setStandardGroups(data.subscription_groups));
    // getSubscriptionGroups(
    //   accesstypeEndpoint,
    //   accountKey,
    //   userJWT,
    //   "campaign"
    // ).then((data) => setCampaignGroups(data.subscription_groups));
    // getSubscriptionGroups(
    //   accesstypeEndpoint,
    //   accountKey,
    //   userJWT,
    //   "group-access"
    // ).then((data) => setGroupAccessGroups(data.subscription_groups));
  }, [accesstypeEndpoint, accountKey, userJWT]);

  const onPlanSelect = (plan) => {
    console.log("Clicked", plan);
    setSelectedPlan(plan);
  };

  const subscriptionParams = selectedPlan
    ? makeSubscriptionParams(selectedPlan)
    : null;

  const handlePurchaseSubscriptionsClick = () => {
    console.log("TODO: handlePurchaseSubscriptionsClick");
    previewSubscription(
      accesstypeEndpoint,
      accountKey,
      userJWT,
      subscriptionParams
    ).then((response) => {
      console.log(response);
    });
  };

  return (
    <View style={styles.container}>
      {selectedPlan && (
        <View>
          <Text>
            SubscriptionParams fdscs:
            {JSON.stringify(subscriptionParams, null, 4)} 
          </Text>
          <Button
            style={styles.formButton}
            title="Purchase Subscriptions"
            onPress={handlePurchaseSubscriptionsClick}
            extraData={onPlanSelect}
          />
        </View>
      )}

      <FlatList
        data={standardGroups.map((item) => {
          return { ...item, onPlanSelect: (plan) => onPlanSelect(plan) };
        })}
        renderItem={GroupItem}
        keyExtractor={(item) => item.id}
        onPlanSelect={(plan) => setSelectedPlan(plan)}
      />
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
  groupItem: {
    padding: 10,
    marginTop: 10,
    borderColor: "red",
    borderWidth: 2,
    borderStyle: "solid",
  },
  planItem: {
    padding: 10,
    marginTop: 4,
    borderColor: "green",
    borderWidth: 2,
    borderStyle: "solid",
  },
});
