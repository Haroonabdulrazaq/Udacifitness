import React, {Component} from 'react';
import { Text, View, TouchableOpacity } from "react-native";
import { getMetricMetaInfo, timeToString, getDailyReminderValue } from '../utils/helpers';
import UdaciSlidder from './UdaciSlidder';
import UdaciStepper from './UdaciStepper';
import TextButton from './TextButton';
import DateHeader from './DateHeader';
import { Ionicons } from '@expo/vector-icons';
import {submitEntry, removeEntry } from '../utils/api';
import { connect } from 'react-redux';
import { addEntry } from '../actions';


function SubmitBtn({onPress}){
  return(
    <TouchableOpacity onPress={onPress}>
      <Text>Submit</Text>
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
    console.log('I am a Key',key);
    console.log('I am a an Entry',entry);

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
    const key = timeToString();
    // alert('Its reset')
    //Saveing to AsynStorage
    this.props.dispatch(removeEntry({
      [key]: getDailyReminderValue()
    }))
  }

  render() {
    const metaInfo = getMetricMetaInfo();

    if(this.props.alreadyLogged) {
      return (
        <View>
          <Ionicons name='ios-happy-outline' size={100} />
          <Text>You already logged your information for today</Text>
          <TextButton onPress={this.reset}>
            <Text>Reset</Text>
          </TextButton>
        </View>
      )
    }
    return (
      <View>
        <DateHeader date={(new Date()).toLocaleDateString()}/>
        <Text>{JSON.stringify(this.state)}</Text>
       {Object.keys(metaInfo).map((key)=>{
        const {getIcon, type, ...rest} = metaInfo[key];
        const value = this.state[key]; 
        return (
          <View key={key}>
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

function mapStateToProp(state){
  const key = timeToString();
  console.log('I am in mapStateToProps', state[key]);
  return {
    alreadyLogged: state[key] && typeof state[key].today === 'undefined'
  }
}

export default connect(mapStateToProp)(AddEntry);
