import React, {Component} from 'react';
import {View, Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,} from 'react-native';
  import { createStore } from 'redux';
  import { Provider } from 'react-redux';
  import reducer from './reducers';
import AddEntry from './components/AddEntry';

class App extends Component {
  render() {
    const store = createStore(reducer);
    return (
      <Provider store={store}>
        <View style={{flex: 1}} >
          <AddEntry />
        </View>
      </Provider>
    );
  }
}


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginLeft: 10,
//     marginRight: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   btn: {
//     backgroundColor: '#E53224',
//     padding: 10,
//     paddingLeft: 50,
//     paddingRight: 50,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 5,
//   },
//   btnText: {
//     color: '#fff',
//   }
// })


export default App;

