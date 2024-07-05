import React from 'react';
import {Text, View} from 'react-native';
import moment from 'moment';

const EventsOverlay = ({days, events, viewType, getCellWidth}) => {
  const groupOverlappingEvents = currentEvents => {
    const sortedEvents = currentEvents.sort(
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
                const durationMinutes = event.end.diff(event.start, 'minutes');
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

export default EventsOverlay;
