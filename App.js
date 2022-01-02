import React, {Component} from 'react';
import {Platform, View, StatusBar} from 'react-native';
  import { createStore } from 'redux';
  import { Provider } from 'react-redux';
  import reducer from './reducers';
import AddEntry from './components/AddEntry';
import History from './components/History';
import {  createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { FontAwesome } from '@expo/vector-icons';
import { purple, white } from './utils/colors';
// import { Constants } from 'expo';

function UdaciStatusBar({backgroundColor, ...props}){
  return (
    <View style={{backgroundColor, height: 20 }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}


const Tabs = createAppContainer(createBottomTabNavigator({
  AddEntry: {
    screen: AddEntry,
    navigationOptions: {
      tabBarLabel: 'Add Entry',
      tabBarIcon: ({tintColor})=> <FontAwesome name='plus-square' size={30} color={tintColor}/>
    }
  },
  'History': {
    screen: History,
    navigationOptions: {
      tabBarLabel: 'History',
      tabBarIcon: ({tintColor})=> <FontAwesome name='history' size={30} color={tintColor}/>
    }
  }
}, {
  navigationOptions: {
    header: null,
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
          width: 0,
          height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
}))

class App extends Component {
  render() {
    const store = createStore(reducer);
    
    return (
      <Provider store={store}>
        <View style={{flex: 1}} >
          <UdaciStatusBar backgroundColor={purple} barStyle='light-content' />
          <Tabs />
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

