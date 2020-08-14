import React, {Component} from 'react';
import {StyleSheet, View, ActivityIndicator, Alert} from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import Axios from 'axios';

import Contents from './contents';
import {SearchBar} from 'react-native-elements';

export default class Home extends Component {
  constructor(props) {
    super(props);

    let startDate = moment(); // today
    let customDatesStyles = [];
    let markedDates = [];

    customDatesStyles.push({
      startDate: startDate, // Single date since no endDate provided
      dateNameStyle: {color: 'blue'},
      dateNumberStyle: {color: 'purple'},
      dateContainerStyle: {
        backgroundColor: 'white',
      },
    });

    let dots = [];
    let lines = [];

    dots.push({
      color: 'red',
      selectedColor: 'yellow',
    });

    markedDates.push({
      startDate,
      dots,
      lines,
    });

    this.state = {
      selectedDate: moment().format('YYYY-MM-DD'),
      customDatesStyles,
      markedDates,
      startDate,
      contents: [],
      loading: true,
    };
  }

  componentDidMount() {
    Axios.get(
      `https://www.hongkongairport.com/flightinfo-rest/rest/flights/past?date=${this.state.startDate.format(
        'YYYY-MM-DD',
      )}&arrival=true&lang=en&cargo=false`,
    ).then((res) => {
      const response = res.data;
      const content = response.find(
        (item) => item.date === this.state.startDate.format('YYYY-MM-DD'),
      );
      this.setState({
        contents: content.list,
        loading: false,
        search: '',
      });
    });
  }

  datesBlacklistFunc = (date) => {
    return date.isoWeekday() === 6; // disable Saturdays
  };

  onDateSelected = async (date) => {
    console.log(date);

    await this.setState({
      contents: [],
      loading: true,
    });

    const selectedDate = date.format('YYYY-MM-DD');

    Axios.get(
      `https://www.hongkongairport.com/flightinfo-rest/rest/flights/past?date=${selectedDate}&arrival=true&lang=en&cargo=false`,
    ).then(async (res) => {
      const response = res.data;
      const content = response.find(
        (item) => item.date === date.format('YYYY-MM-DD'),
      );
      await this.setState({
        contents: content.list,
        loading: false,
        selectedDate: selectedDate,
      });
    });
  };

  findData = async (search) => {
    console.log('kesini 1');
    await this.setState({
      loading: true,
      search,
    });

    if (!search || search?.length < 2) {
      await this.setState({
        loading: false,
      });
      return;
    }

    const {contents} = await this.state;
    const regex = new RegExp(`${search.trim()}`, 'i');
    const result =
      (contents &&
        contents.length &&
        contents.find((row) => {
          return row.flight.some((rowFlight) => {
            return rowFlight.no.search(regex) >= 0;
          });
        })) ||
      [];

    console.log('kesini 2');
    console.log(result);

    await this.setState({
      contents: result,
      loading: false,
    });

    // return [];
  };

  render() {
    let {search} = this.state;
    // search && search?.length === 2 && this.findData(search);

    return (
      <View>
        <CalendarStrip
          scrollable
          calendarAnimation={{type: 'sequence', duration: 30}}
          daySelectionAnimation={{
            type: 'background',
            duration: 300,
            highlightColor: 'white', //'#9265DC',
          }}
          style={{height: 200, paddingTop: 20, paddingBottom: 10}}
          calendarHeaderStyle={{color: 'white'}}
          calendarColor={'#3343CE'}
          dateNumberStyle={{color: 'white'}}
          dateNameStyle={{color: 'white'}}
          iconContainer={{flex: 0.1}}
          customDatesStyles={this.state.customDatesStyles}
          markedDates={this.state.markedDates}
          // datesBlacklist={this.datesBlacklistFunc}
          onDateSelected={this.onDateSelected}
          useIsoWeekday={false}
        />
        <SearchBar
          placeholder="Flight No."
          onChangeText={(text) => Alert.alert('Still need to be improved....')}
          // onChangeText={async (text) => await this.findData(text)}
          value={search}
          round
          containerStyle={styles.btnSearchContainerStyle}
          inputContainerStyle={styles.btnSearchInputContainerStyle}
        />
        {this.state.loading && (
          <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
        {!this.state.loading &&
          this.state.contents &&
          this.state.contents.length && (
            <Contents
              contents={this.state.contents}
              selectedDate={this.state.selectedDate}
            />
          )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 50,
  },
  btnSearchContainerStyle: {
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    marginBottom: -20,
  },
  btnSearchInputContainerStyle: {
    backgroundColor: 'white',
  },
});
