import React from 'react';
import {Text, View} from 'react-native';
import moment from 'moment';

const TimeSlots = ({days, getCellWidth, viewType}) => {
  const render30MinuteDivider = () => (
    <View
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: '50%',
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        zIndex: 1,
      }}
    />
  );

  const hourSlots = Array.from({length: 24}, (_, i) => i);

  return hourSlots.map((hour, index) => (
    <View key={index} className="flex-row relative">
      <View className="w-20 border-r border-b border-gray-600">
        <Text className="text-white text-xs p-1">
          {moment({hour}).format('h A')}
        </Text>
        {render30MinuteDivider()}
      </View>
      {days.map((day, dayIndex) => (
        <View
          key={dayIndex}
          className="h-16 border-r border-b border-gray-600 relative"
          style={{
            width: getCellWidth(),
            flex: viewType === 'day' ? 1 : 'none',
          }}>
          {render30MinuteDivider()}
        </View>
      ))}
    </View>
  ));
};

export default TimeSlots;
