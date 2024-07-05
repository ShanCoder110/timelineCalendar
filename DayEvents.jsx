import React from 'react';
import {Text, View} from 'react-native';

const DayEvents = ({day, events}) => {
  const dayEvents = events.filter(event => event.start.isSame(day, 'day'));
  return dayEvents.slice(0, 2).map(event => (
    <View key={event.id} className="bg-blue-500 rounded mt-1 px-1">
      <Text className="text-white text-xs" numberOfLines={1}>
        {event.title}
      </Text>
    </View>
  ));
};

export default DayEvents;
