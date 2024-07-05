import React from 'react';
import {Text, View} from 'react-native';

const DayHeaders = ({days, getCellWidth}) => (
  <View className="flex-row  bg-gray-800 ">
    <View className="w-20 p-2 border-r border-b border-gray-600">
      <Text className="text-orange font-bold"> </Text>
    </View>
    {days.map((day, index) => (
      <View
        key={index}
        className="flex p-2 border-r border-b border-gray-600"
        style={{width: getCellWidth()}}>
        <Text className="text-white font-bold">{day.format('ddd M/D')}</Text>
      </View>
    ))}
  </View>
);

export default DayHeaders;
