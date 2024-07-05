import React from 'react';
import {Text, View} from 'react-native';

const MonthView = ({currentDate, events}) => {
  const startOfMonth = currentDate.clone().startOf('month');
  const endOfMonth = currentDate.clone().endOf('month');
  const startDate = startOfMonth.clone().startOf('week');
  const endDate = endOfMonth.clone().endOf('week');

  const weeks = [];
  let week = [];
  let day = startDate.clone();

  while (day.isBefore(endDate)) {
    for (let i = 0; i < 7; i++) {
      week.push(day.clone());
      day.add(1, 'day');
    }
    weeks.push(week);
    week = [];
  }

  return (
    <View>
      <View className="flex-row bg-gray-800">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(
          (dayName, index) => (
            <View
              key={index}
              className="flex-1 p-2 border-r border-b border-gray-600">
              <Text className="text-white font-bold text-center">
                {dayName}
              </Text>
            </View>
          ),
        )}
      </View>
      {weeks.map((week, weekIndex) => (
        <View key={weekIndex} className="flex-row">
          {week.map((day, dayIndex) => (
            <View
              key={dayIndex}
              className="flex-1 h-20 border-r border-b border-gray-600 p-1">
              <Text
                className={`text-xs ${
                  day.month() === currentDate.month()
                    ? 'text-white'
                    : 'text-gray-500'
                }`}>
                {day.date()}
              </Text>
              {renderDayEvents(day)}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

export default MonthView;
