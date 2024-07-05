import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

const Header = ({
  viewType,
  currentDate,
  handleViewChange,
  isLandscape,
  setCurrentDate,
}) => {
  const handlePrev = () => {
    setCurrentDate(prevDate =>
      viewType === 'month'
        ? prevDate.clone().subtract(1, 'months')
        : viewType === 'week'
        ? prevDate.clone().subtract(1, 'weeks')
        : prevDate.clone().subtract(1, 'days'),
    );
  };

  const handleNext = () => {
    setCurrentDate(prevDate =>
      viewType === 'month'
        ? prevDate.clone().add(1, 'months')
        : viewType === 'week'
        ? prevDate.clone().add(1, 'weeks')
        : prevDate.clone().add(1, 'days'),
    );
  };
  return (
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
        {viewType === 'month'
          ? currentDate.format('MMMM YYYY')
          : currentDate.format('DD/M/YY')}
      </Text>
      <View className="flex-row">
        {isLandscape && (
          <TouchableOpacity
            className="bg-blue-500 px-4 py-2 border rounded-l-md"
            onPress={() => handleViewChange('month')}>
            <Text className="text-[#fff]">month</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          className="bg-blue-500 px-4 py-2 border"
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
};

export default Header;
