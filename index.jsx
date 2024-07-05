import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import useIsLandscape from '../../hooks/useIsLandscape';
import Header from './Header';
import DayHeaders from './DayHeaders';
import AllDayEvents from './AllDayEvents';
import TimeSlots from './TimeSlots';
import EventsOverlay from './EventsOverlay';
import MonthView from './MonthView';

const TimelineCalendar = () => {
  const [currentDate, setCurrentDate] = useState(moment());
  const isLandscape = useIsLandscape();
  const [viewType, setViewType] = useState(isLandscape ? 'month' : 'week');

  useEffect(() => {
    setViewType(isLandscape ? 'month' : 'week');
  }, [isLandscape]);

  const handleViewChange = type => {
    if (type === 'month' && !isLandscape) {
      return;
    }
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

  return (
    <View className="bg-onPrimaryContainer h-[85%] w-full rounded-lg">
      <Header
        viewType={viewType}
        currentDate={currentDate}
        handleViewChange={handleViewChange}
        isLandscape={isLandscape}
      />
      {isLandscape && viewType === 'month' ? (
        <ScrollView>
          <MonthView currentDate={currentDate} events={events} />
        </ScrollView>
      ) : (
        <ScrollView horizontal={viewType === 'week'}>
          <View style={{width: viewType === 'day' ? '100%' : 'auto'}}>
            <DayHeaders
              days={days}
              viewType={viewType}
              getCellWidth={getCellWidth}
            />
            <ScrollView>
              <AllDayEvents
                days={days}
                events={events}
                getCellWidth={getCellWidth}
                viewType={viewType}
              />
              <View style={{position: 'relative'}}>
                <TimeSlots
                  days={days}
                  getCellWidth={getCellWidth}
                  viewType={viewType}
                />
                <EventsOverlay
                  days={days}
                  events={events}
                  viewType={viewType}
                  getCellWidth={getCellWidth}
                />
              </View>
            </ScrollView>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default TimelineCalendar;
