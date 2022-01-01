import React, {Component} from 'react';
import { Text, View, TouchableOpacity, Platform, StyleSheet } from "react-native";
import { getMetricMetaInfo, timeToString, getDailyReminderValue } from '../utils/helpers';
import UdaciSlidder from './UdaciSlidder';
import UdaciStepper from './UdaciStepper';
import TextButton from './TextButton';
import DateHeader from './DateHeader';
import { Ionicons } from '@expo/vector-icons';
import {submitEntry, removeEntry } from '../utils/api';
import { purple } from '../utils/colors';
import { connect } from 'react-redux';
import { addEntry } from '../actions';
import { white } from '../utils/colors';


function SubmitBtn({onPress}){
  return(
    <TouchableOpacity
    style={Platform.OS === 'ios'? styles.iosSubmitBtn : styles.andriodSubmitBtn}
    onPress={onPress}>
      <Text 
      style={styles.submitBtnText}
      >Submit</Text>
    </TouchableOpacity>
  )
}


class AddEntry extends Component {
  state = {
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0,
    eat: 0,
  }

  increment =(metric)=> {
    const { max, steps } = getMetricMetaInfo(metric);
    this.setState((prevState)=>{
      const count = prevState[metric] + steps
      return {
        ...prevState,
        [metric]: count > max? max : count
      }
    })
  }

  decrement =(metric)=> {
    const { steps } = getMetricMetaInfo(metric);
    this.setState((prevState)=>{
      const count = prevState[metric] - steps
      return {
        ...prevState,
        [metric]: count < 0? 0 : count
      } 
    })
  }

  slide =(metric, value)=> {
    this.setState(()=>({
      [metric]: value,
    }))
  }
  submit=()=>{
    const key = timeToString();
    const entry = this.state;
    this.props.dispatch(addEntry({
      [key]: entry
    }))   

    this.setState(()=>({
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0,
    }))

    //Update Redux
    //Save To Db:
    // this.props.dispatch(addEntry({
    //   [key]: entry,
    // }))

    submitEntry({key, entry})

    // Navigate To Home
    // Clear Local Notification
  }

  reset=()=>{
    console.log('removing entry');
    const key = timeToString();
    // alert('Its reset')
    //Saveing to AsynStorage
    this.props.dispatch(addEntry({
      [key]: getDailyReminderValue()
    }))

    removeEntry(key)
  }

  render() {
    const metaInfo = getMetricMetaInfo();

    if(this.props.alreadyLogged) {
      return (
        <View style={styles.center}>
          <Ionicons name={Platform.OS== 'ios'? 'ios-happy-outline': 'md-happy-outline'} size={100} />
          <Text>You already logged your information for today</Text>
          <TextButton onPress={this.reset} style={{padding: 5}}>
            <Text>Reset</Text>
          </TextButton>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <DateHeader date={(new Date()).toLocaleDateString()}/>
        {/* <Text>{JSON.stringify(this.state)}</Text> */}
       {Object.keys(metaInfo).map((key)=>{
        const {getIcon, type, ...rest} = metaInfo[key];
        const value = this.state[key]; 
        return (
          <View key={key} style={styles.row}>
            {getIcon()}
            {
              type === 'slider'
              ?
              <UdaciSlidder
                value={value}
                onChange={(value) => this.slide(key, value)}
                {...rest}
            />
              :<UdaciStepper
                value={value}
                onIncrement={() => this.increment(key)}
                onDecrement={() => this.decrement(key)}
                {...rest}
            />
            }
          </View>
        )
      })}
      <SubmitBtn onPress={this.submit}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white,
  },
  row:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  andriodSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft:30,
    paddingRight:30,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  submitBtnText:{
    color: white,
    fontSize: 22,
    alignItems: 'center'
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }

})


function mapStateToProp(state){
  const key = timeToString();
  console.log('I am in mapStateToProps', state[key]);
  return {
    alreadyLogged: state[key] && typeof state[key].today === 'undefined'
  }
}

export default connect(mapStateToProp)(AddEntry);
