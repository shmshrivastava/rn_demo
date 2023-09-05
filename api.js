export async function getSubscriptions (endpoint, accountKey, jwt) {
  console.log("calling getSubscriptions with - endpoint, accountKey, jwt", endpoint, accountKey, jwt)
  const url = `${endpoint}/api/access/v1/members/me/subscriptions?key=${accountKey}&accesstype_jwt=${jwt}`
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Origin: 'https://emulator-staging.accesstype.com'
    }
  });
  const body = await res.json();
  console.log("getSubscriptions response", body)
  return body;
}

export async function getSubscriptionGroups (endpoint, accountKey, jwt, subscriptionType = "standard") {
  console.log("calling getSubscriptions with - endpoint, accountKey, jwt", endpoint, accountKey, jwt)
  const groupPath = {
    "standard": "subscription_groups",
    "campaign": "campaigns",
    "group-access": "group-access"
  }
  const url = `${endpoint}/api/v1/${groupPath[subscriptionType] || subscriptionType}?key=${accountKey}&accesstype_jwt=${jwt}`
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Origin: 'https://emulator-staging.accesstype.com'
    }
  });
  const body = await res.json();
  console.log("getSubscriptions response", body)
  return body;
}

export async function previewSubscription (endpoint, accountKey, jwt, subscriptionParams) {
  console.log("calling previewSubscription with - endpoint, accountKey, jwt, params", endpoint, accountKey, jwt, subscriptionParams)
  const url = `${endpoint}/api/access/v1/members/me/subscriptions/preview?key=${accountKey}&accesstype_jwt=${jwt}`
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(subscriptionParams),
    headers: {
      Origin: 'http://localhost:19006',
      "Content-Type": "application/json",
    }
  });
  console.log("previewSubscription raw response", res)
  let body;
  if (res.status === 200 || res.status === 201) {
    body = await res.json();
    console.log("previewSubscription response", body)
  } else {
    res.text().then(text => {
      console.log("previewSubscription response text", text)
      throw new Error(text)
    })
  }
  return body;
}

