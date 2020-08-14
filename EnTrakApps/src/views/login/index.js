import React, {Component} from 'react';
import {StyleSheet, View, ScrollView, Text} from 'react-native';

import {Header} from '../header';
// import LoginScreen2 from './screen2';
import LoginScreen3 from './screen3';
import {fetchData} from '../../helpers/StoreData';
import {Avatar, Icon} from 'react-native-elements';
import database from '@react-native-firebase/database';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      loading: true,
      token: '',
      email: '',
    };
  }

  componentDidMount() {
    fetchData('loggedIn').then((value) => this.setState({loggedIn: value}));
    fetchData('token').then((value) => this.setState({token: value}));
  }

  // renderAccount() {
  //   const email = this.state.email;

  //   return (
  //     <View
  //       style={{
  //         height: 60,
  //         marginHorizontal: 10,
  //         marginTop: 10,
  //         backgroundColor: 'white',
  //         borderRadius: 5,
  //         alignItems: 'center',
  //         flexDirection: 'row',
  //       }}>
  //       <View style={{flex: 2, flexDirection: 'row', alignItems: 'center'}}>
  //         <View style={{marginLeft: 15}}>
  //           <Avatar
  //             small
  //             rounded
  //             source={{
  //               uri:
  //                 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
  //             }}
  //             activeOpacity={0.7}
  //           />
  //         </View>
  //         <Text
  //           style={{
  //             fontFamily: 'regular',
  //             fontSize: 15,
  //             marginLeft: 10,
  //             color: 'gray',
  //           }}>
  //           {email}
  //         </Text>
  //       </View>
  //       <View
  //         style={{
  //           flexDirection: 'row',
  //           justifyContent: 'center',
  //           marginRight: 10,
  //         }}>
  //         <View
  //           style={{
  //             backgroundColor: 'rgba(222,222,222,1)',
  //             width: 35,
  //             height: 28,
  //             borderRadius: 5,
  //             justifyContent: 'center',
  //             alignItems: 'center',
  //             marginHorizontal: 10,
  //           }}>
  //           <Icon
  //             name="person-add-outline"
  //             type="ionicon"
  //             color="gray"
  //             size={20}
  //           />
  //         </View>
  //       </View>
  //     </View>
  //   );
  // }

  render() {
    database()
      .ref('/users/123')
      .set({
        name: 'Ada Lovelace',
        age: 31,
      })
      .then(() => console.log('Data set.'));

    console.log(this.state.token);
    return (
      <>
        <Header title="Login" />
        <View style={styles.container}>
          {/* <ScrollView horizontal pagingEnabled decelerationRate={0.993}> */}
          <ScrollView>
            {/* <LoginScreen2 /> */}
            {/* {!loggedIn && <LoginScreen3 />} */}
            {/* {loggedIn && this.renderAccount} */}
            <LoginScreen3 />
          </ScrollView>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
