import React from 'react';
import {Text, View} from 'react-native';

const AllDayEvents = ({days, events, getCellWidth, viewType}) => (
  <View className="flex-row">
    <View className="w-20 p-2 border-r border-b border-gray-600 justify-center">
      <Text className="text-white text-xs font-bold">All-day</Text>
    </View>
    {days.map((day, index) => (
      <View
        key={index}
        className="flex p-2 border-r border-b border-gray-600"
        style={{width: getCellWidth(), flex: viewType === 'day' ? 1 : 'none'}}>
        {events
          .filter(event => event.start.isSame(day, 'day'))
          .map(event => (
            <View key={event.id} className="bg-blue-500 p-1 rounded mb-1">
              <Text className="text-white text-xs">{event.title}</Text>
            </View>
          ))}
      </View>
    ))}
  </View>
);

export default AllDayEvents;
