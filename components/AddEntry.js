import React, {Component} from 'react';
import { Text, View } from "react-native";
import { getMetricMetaInfo } from '../utils/helpers';
// import { getMetricMetaInfo } from "../utils/helpers";

class AddEntry extends Component {
  state = {
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0,
    eat: 0,
  }
  increment =()=> {
    const { max, step } = getMetricMetaInfo(metrics);
    this.setState((prevState)=>{
      const count = prevState[metric] + step
      return {
        ...prevState,
        [metric]: count > max? max : count
      }
    })
  }

  decrement =()=> {
    const { step } = getMetricMetaInfo(metrics);
    this.setState((prevState)=>{
      const count = prevState[metric] - step
      return {
        ...prevState,
        [metric]: count < 0? 0 : count
      } 
    })
  }
  slide =(metric, value)=> {
    this.setState((prevState)=>({
      [metric]: value,
    }))
  }
  render() {
    return (
      <View>
       {getMetricMetaInfo('bike').getIcon()}
      </View>
    )
  }
}

export default AddEntry;


