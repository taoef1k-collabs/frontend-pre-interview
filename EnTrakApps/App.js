import React, {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';

import RootNavigator from './src/navigation/RootNavigator';
import {LocalNotification} from './src/components/LocalPushNotification';

import {storeData} from './src/helpers/StoreData';

export default () => {
  useEffect(() => {
    requestUserPermission();
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
      remoteMessage.notification &&
        LocalNotification(remoteMessage.notification);
    });

    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log(
        'Message handled in the background!',
        JSON.stringify(remoteMessage),
      );
      remoteMessage.notification &&
        LocalNotification(remoteMessage.notification);
    });

    return unsubscribe;
  }, []);

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      getFcmToken();
      console.log('Authorization status:', authStatus);
    }
  };

  const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log('Your Firebase Token is:', fcmToken);
      await storeData('token', fcmToken);
    } else {
      console.log('Failed', 'No token received');
    }
  };

  return <RootNavigator />;
};
