export const sendPushNotification = async (token) => {
  const FIREBASE_API_KEY =
    'AAAAbp6i4Vc:APA91bEtz7HG2eltclD6dATEl2ooOMz89_FKnO3eIDacJeCF4kaAiIKl4PJGUrYgKtsWCW0hqN8QRFBUVCRjbAzZTWZAwgg2qQWpAd_mY-Y3Ng3rDXMi59qJz0_F2934RQO3lC2ByaXO';
  const message = {
    registration_ids: [token],
    notification: {
      title: 'india vs south africa test',
      body: 'IND chose to bat',
      vibrate: 1,
      sound: 1,
      show_in_foreground: true,
      priority: 'high',
      content_available: true,
    },
    data: {
      title: 'india vs south africa test',
      body: 'IND chose to bat',
      score: 50,
      wicket: 1,
    },
  };

  let headers = new Headers({
    'Content-Type': 'application/json',
    Authorization: 'key=' + FIREBASE_API_KEY,
  });

  let response = await fetch('https://fcm.googleapis.com/fcm/send', {
    method: 'POST',
    headers,
    body: JSON.stringify(message),
  });
  response = await response.json();
  console.log(response);
};
