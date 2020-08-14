import AsyncStorage from '@react-native-community/async-storage';

const bookmarkFlight = 'BOOKMARK_FLIGHT';

const fetchData = async (key) =>
  await AsyncStorage.getItem(key, (error, result) => result || undefined);

const storeData = async (key, value) => await AsyncStorage.setItem(key, value);

const storeBookmarkFlight = async (value) => {
  const existingBookmarkFlight = await AsyncStorage.getItem(bookmarkFlight);
  let newBookmarkFlight = JSON.parse(existingBookmarkFlight);
  if (!newBookmarkFlight) {
    newBookmarkFlight = [];
  }
  const existingNewBookmarkFlight = newBookmarkFlight.find(
    (item) => item.no === value.no && item.date === value.date,
  );
  // existingNewBookmarkFlight &&
  newBookmarkFlight.push(value);
  await AsyncStorage.setItem(bookmarkFlight, JSON.stringify(newBookmarkFlight));
};

const fetchBookmarkFlight = async (value) => {
  const bookmarkFlights = await fetchData(bookmarkFlight);
  return JSON.parse(bookmarkFlights);
};

export {fetchData, storeData, storeBookmarkFlight, fetchBookmarkFlight};
