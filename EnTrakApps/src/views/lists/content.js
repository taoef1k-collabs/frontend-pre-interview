import _ from 'lodash';

import React, {Component} from 'react';
import {Text, View, ScrollView, StyleSheet, Alert} from 'react-native';
import {Icon, SearchBar} from 'react-native-elements';
import {fetchBookmarkFlight} from '../../helpers/StoreData';

export default class ListContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contents: [],
      loading: true,
    };
  }

  componentDidMount() {
    console.log('didmount');
    fetchBookmarkFlight().then((data) => {
      this.setState({
        loading: false,
        contents: data,
      });
    });
  }

  async componentDidUpdate() {
    console.log('didupdate');
    this.state.contents = await fetchBookmarkFlight();
  }

  renderValue(bookmarFlight) {
    const {date, time} = bookmarFlight;

    return (
      <View
        style={{
          // backgroundColor: 'rgba(244,230,224,1)',
          width: 120,
          height: 40,
          borderRadius: 5,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          marginLeft: 0,
          // backgroundColor: 'red',
        }}>
        <Text
          style={{
            color: '#3343CE',
            fontFamily: 'regular',
            fontSize: 13,
            marginLeft: 5,
          }}>
          {date} {time}
        </Text>
      </View>
    );
  }

  renderCard(bookmarFlight, index) {
    const {no, airline} = bookmarFlight;

    return (
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
            <Icon name="ios-bookmark-outline" type="ionicon" size={20} />
          </View>
          <Text
            style={{
              fontFamily: 'regular',
              fontSize: 15,
              marginLeft: 10,
              color: 'gray',
            }}>
            {no} ({airline})
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginRight: 40,
            // width: 100,
          }}>
          <View
            style={{
              // backgroundColor: 'rgba(222,222,222,1)',
              width: 35,
              height: 28,
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: 10,
            }}>
            {this.renderValue(bookmarFlight)}
            {/* <Icon
              name="person-add-outline"
              type="ionicon"
              color="gray"
              size={20}
            /> */}
          </View>
        </View>
        {/* <Text>Test</Text> */}
      </View>
    );
  }

  renderListCards() {
    const bookmarFlights = this.state.contents;
    return _.map(bookmarFlights, (bookmarFlight, index) =>
      this.renderCard(bookmarFlight, index),
    );
  }

  render() {
    return (
      <>
        <SearchBar
          placeholder="Flight No."
          onChangeText={(text) => Alert.alert('Still need to be improved....')}
          value={this.state.search}
          round
          containerStyle={styles.btnSearchContainerStyle}
          inputContainerStyle={styles.btnSearchInputContainerStyle}
        />
        <ScrollView
          style={{marginTop: 15, backgroundColor: 'rgba(241,240,241,1)'}}>
          {!this.state.loading && this.renderListCards()}
        </ScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  btnSearchContainerStyle: {
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    // flex: 1,
    marginBottom: -20,
  },
  btnSearchInputContainerStyle: {
    backgroundColor: 'white',
  },
});
