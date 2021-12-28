import React, {Component} from 'react';
import {View, Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,} from 'react-native'
// import AddEntry from './components/AddEntry';

class App extends Component {
  handlePress =()=> {
    // alert('Hello!');
  }
  render() {
    return (
      <View style={styles.container} >
        {/* <AddEntry /> */}
        <TouchableNativeFeedback 
          background={TouchableNativeFeedback.SelectableBackground()}
          onPress={this.handlePress}  >
          <View style={styles.btn}><Text style={styles.btnText}>Touchable HIghlight</Text></View>
        </TouchableNativeFeedback>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    backgroundColor: '#E53224',
    padding: 10,
    paddingLeft: 50,
    paddingRight: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  btnText: {
    color: '#fff',
  }
})


export default App

