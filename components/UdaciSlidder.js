import React from 'react';
import {View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import {gray, purple} from '../utils/colors';

const UdaciSlidder = ({ max, unit, steps, onChange, value}) => {
  return (
    <View style={[styles.row, {justifyContent: 'space-between'}]}>
      <Slider
        value={value}
        minimumValue={0}
        maximumValue={max}
        step={steps}
        onValueChange={onChange}
      />
      <View style={styles.metricCounter}>
        <Text  style={{fontSize: 24, textAlign: 'center'}}>{value}</Text> 
        <Text  style={{fontSize: 18, color: gray}}>{unit}</Text>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  metricCounter: {
    width: 85,
    justifyContent: 'center',
    alignItems: 'center'
  }
})



export default UdaciSlidder;
