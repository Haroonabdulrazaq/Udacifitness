import React from 'react';
import {View, Text } from 'react-native';
import Slider from '@react-native-community/slider'

const UdaciSlidder = ({ max, unit, steps, onChange, value}) => {
  return (
    <View>
      <Slider
        value={value}
        minimumValue={0}
        maximumValue={max}
        step={steps}
        onValueChange={onChange}
      />
      <Text>{value} {unit}</Text>
      <Text></Text>
    </View>
  )
}

export default UdaciSlidder;
