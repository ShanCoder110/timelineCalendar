import moment from 'moment';
import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

const TimelineCalendar = () => {
  const [currentDate, setCurrentDate] = useState(moment());
  const [viewType, setViewType] = useState('week');

  const handlePrev = () => {
    setCurrentDate(prevDate =>
      viewType === 'week'
        ? prevDate.clone().subtract(1, 'weeks')
        : prevDate.clone().subtract(1, 'days'),
    );
  };

  const handleNext = () => {
    setCurrentDate(prevDate =>
      viewType === 'week'
        ? prevDate.clone().add(1, 'weeks')
        : prevDate.clone().add(1, 'days'),
    );
  };

  const handleViewChange = type => {
    setViewType(type);
  };

  const events = [
    {
      id: 1,
      title: 'Conference',
      start: moment('2024-07-01 00:00'),
      end: moment('2024-07-01 23:59'),
      allDay: true,
    },
    {
      id: 2,
      title: 'Meeting',
      start: moment('2024-07-01 10:30'),
      end: moment('2024-07-01 13:30'),
      // allDay: true,
    },
    {
      id: 3,
      title: 'Lunch',
      start: moment('2024-07-01 12:30'),
      end: moment('2024-07-01 13:30'),
    },
    {
      id: 4,
      title: 'Birthday Party',
      start: moment('2024-07-02 07:00'),
      end: moment('2024-07-02 10:40'),
    },
  ];

  const days =
    viewType === 'week'
      ? Array.from({length: 7}, (_, i) =>
          currentDate.clone().startOf('week').add(i, 'days'),
        )
      : [currentDate];

  const getCellWidth = () => {
    return viewType === 'day' ? '100%' : 128;
  };

  const renderHeader = () => (
    <View className="flex-row justify-between items-center p-4 bg-gray-900 rounded-lg">
      <View className="flex-row">
        <TouchableOpacity
          className="bg-blue-500 px-4 py-2 border rounded-l-md"
          onPress={handlePrev}>
          <Text className="text-[#fff]">{'<'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-blue-500 px-4 py-2 border rounded-r-md"
          onPress={handleNext}>
          <Text className="text-[#fff]">{'>'}</Text>
        </TouchableOpacity>
      </View>
      <Text className="text-[#fff] text-xl">
        {currentDate.format('DD/M/YY')}
      </Text>
      <View className="flex-row">
        <TouchableOpacity
          className="bg-blue-500 px-4 py-2 border rounded-l-md"
          onPress={() => handleViewChange('week')}>
          <Text className="text-[#fff]">week</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-blue-500 px-4 py-2 border rounded-r-md"
          onPress={() => handleViewChange('day')}>
          <Text className="text-[#fff]">day</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderDayHeaders = () => (
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

  const renderAllDayEvents = () => (
    <View className="flex-row  ">
      <View className="w-20 p-2 border-r border-b border-gray-600 justify-center">
        <Text className="text-white text-xs font-bold">All-day</Text>
      </View>

      {days.map((day, index) => (
        <View
          key={index}
          className="flex p-2 border-r border-b border-gray-600 "
          style={{
            width: getCellWidth(),
            flex: viewType === 'day' ? 1 : 'none',
          }}>
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

  const renderTimeSlots = () => {
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

  const renderEventsOverlay = () => {
    const groupOverlappingEvents = events => {
      const sortedEvents = events.sort(
        (a, b) => a.start.valueOf() - b.start.valueOf(),
      );
      const groups = [];
      for (const event of sortedEvents) {
        if (
          groups.length === 0 ||
          event.start >=
            groups[groups.length - 1][groups[groups.length - 1].length - 1].end
        ) {
          groups.push([event]);
        } else {
          groups[groups.length - 1].push(event);
        }
      }
      return groups;
    };

    return (
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 80,
          right: 0,
          bottom: 0,
        }}>
        {days.map((day, dayIndex) => {
          const dayEvents = events.filter(
            event => !event.allDay && event.start.isSame(day, 'day'),
          );
          const eventGroups = groupOverlappingEvents(dayEvents);

          return (
            <View
              key={dayIndex}
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: viewType === 'week' ? dayIndex * getCellWidth() : 0,
                width: getCellWidth(),
              }}>
              {eventGroups.map((group, groupIndex) =>
                group.map((event, eventIndex) => {
                  const dayStart = moment(day).startOf('day');
                  const startMinutes = event.start.diff(dayStart, 'minutes');
                  const durationMinutes = event.end.diff(
                    event.start,
                    'minutes',
                  );
                  const width = 100 - eventIndex * 20; // Decrease width for each overlapping event
                  return (
                    <View
                      key={event.id}
                      className="bg-blue-500 p-1 rounded border border-red-200 absolute"
                      style={{
                        top: `${(startMinutes / (24 * 60)) * 100}%`,
                        height: `${(durationMinutes / (24 * 60)) * 100}%`,
                        right: 0,
                        width: `${width}%`,
                        zIndex: eventIndex + 1, // Increase z-index for each overlapping event
                      }}>
                      <Text className="text-white text-xs">{event.title}</Text>
                      <Text className="text-white text-xs">{`${event.start.format(
                        'HH:mm',
                      )} - ${event.end.format('HH:mm')}`}</Text>
                    </View>
                  );
                }),
              )}
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <View className="bg-onPrimaryContainer h-[85%] w-full rounded-lg">
      {renderHeader()}
      <ScrollView horizontal={viewType === 'week'}>
        <View style={{width: viewType === 'day' ? '100%' : 'auto'}}>
          {renderDayHeaders()}
          <ScrollView>
            {renderAllDayEvents()}
            <View style={{position: 'relative'}}>
              {renderTimeSlots()}
              {renderEventsOverlay()}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

export default TimelineCalendar;
