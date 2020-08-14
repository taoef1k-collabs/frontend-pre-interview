import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  SectionList,
  TouchableHighlight,
  Alert,
} from 'react-native';
import {Icon} from 'react-native-elements';
import moment from 'moment';
import NotifService from '../../../NotifService';
import {ActivityIndicator} from 'react-native';
import {
  storeBookmarkFlight,
  fetchBookmarkFlight,
} from '../../helpers/StoreData';

export default class Contents extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contents: this.props.contents,
      selectedDate: this.props.selectedDate,
      pushLoading: false,
      pushRow: '',
      contentLoading: false,
      newContents: [],
    };

    this.notif = new NotifService(
      this.onRegister.bind(this),
      this.onNotif.bind(this),
    );
  }

  // componentDidMount() {
  //   console.log('componentDidMount');
  //   // this.state.contentLoading = true;
  //   // console.log(this.props.contents);
  //   // this.getContent();
  // }

  // componentDidUpdate(prevProps) {
  //   // console.log(prevProps);
  //   // this.setState({contentLoading: false, contents: this.props.contents});
  // }

  onRegister(token) {
    this.setState({registerToken: token.token, fcmRegistered: true});
  }

  onNotif(notif) {
    Alert.alert(notif.title, notif.message);
  }

  renderItem = ({item, index}) => (
    <View
      key={index}
      style={{
        height: 60,
        marginHorizontal: 10,
        marginTop: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      <View style={{flex: 2, flexDirection: 'row', alignItems: 'center'}}>
        <View style={{marginLeft: 15}}>
          <Icon name="ios-airplane-outline" type="ionicon" size={20} />
        </View>
        <Text
          style={{
            fontFamily: 'regular',
            fontSize: 15,
            marginLeft: 10,
            color: 'gray',
          }}>
          {item.no}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginRight: 10,
        }}>
        <Text>{item.airline}</Text>
        {this.state.pushLoading && this.state.pushRow === item.no && (
          <ActivityIndicator size="small" color="#0000ff" />
        )}
        {(this.state.pushLoading && this.state.pushRow !== item.no) ||
          (!this.state.pushLoading && (
            <TouchableHighlight
              onPress={async () => {
                this.setState({
                  pushRow: item.no,
                  pushLoading: true,
                });

                const selectedDate = moment(item.date + ' 07:17'); //item.time);
                const rememberTime = moment(selectedDate).subtract(
                  15,
                  'minutes',
                );

                this.notif.scheduleNotif(rememberTime);
                await storeBookmarkFlight(item).then(async () => {
                  const bookmarkFlights = await fetchBookmarkFlight();
                  console.log('bookmarkFlights');
                  console.log(bookmarkFlights);
                  this.setState({pushLoading: false});
                });
              }}>
              <View
                style={{
                  backgroundColor: '#3343CE',
                  width: 35,
                  height: 28,
                  borderRadius: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginHorizontal: 10,
                }}>
                <Icon
                  name="ios-bookmark-outline"
                  type="ionicon"
                  color="white"
                  size={20}
                />
              </View>
            </TouchableHighlight>
          ))}
      </View>
    </View>
  );

  renderSection({section, index}) {
    const {title} = section;

    return (
      <View
        key={index}
        style={{
          height: 30,
          marginHorizontal: 10,
          marginTop: 10,
          backgroundColor: '#3343CE',
          borderRadius: 5,
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Text
          style={{
            fontFamily: 'regular',
            fontSize: 16,
            marginLeft: 10,
            color: 'white',
            fontWeight: 'bold',
          }}>
          {title}
        </Text>
      </View>
    );
  }

  render() {
    // const renderNewContents = this.getContent();
    const selectedDate = this.state.selectedDate;
    const renderNewContents =
      (this.state.contents &&
        this.state.contents.length &&
        this.state.contents.map((item) => ({
          title: item.time,
          data: item.flight.map((row) => ({
            no: row.no,
            airline: row.airline,
            date: selectedDate, //.format('YYYY-MM-DD'),
            time: item.time,
          })),
        }))) ||
      [];

    return (
      <SafeAreaView
        style={{marginTop: 15, backgroundColor: 'rgba(241,240,241,1)'}}>
        <SectionList
          sections={renderNewContents}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => item + index}
          renderSectionHeader={this.renderSection}
        />
        {renderNewContents && renderNewContents.length && (
          <View
            style={{
              height: 30,
              marginHorizontal: 10,
              marginTop: 10,
              backgroundColor: '#3343CE',
              borderRadius: 5,
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Text
              style={{
                fontFamily: 'regular',
                fontSize: 16,
                marginLeft: 10,
                color: 'white',
                fontWeight: 'bold',
              }}>
              No Data
            </Text>
          </View>
        )}
      </SafeAreaView>
    );
  }
}
