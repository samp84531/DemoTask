import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native'


const MainAppNavigation = ({ state, descriptors, navigation, position }) => {
  console.log('state',state, 'descriptors',descriptors, 'navigation',navigation, 'position',position);
  return (
    <View style={{ flexDirection: 'row', paddingHorizontal: 20 }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const inputRange = state.routes.map((_, i) => i);
        const opacity = position.interpolate({
          inputRange,
          outputRange: inputRange.map(i => (i === index ? 1 : 0.5)),
        });

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ marginRight: 40}}
            key={index}
          >
            <Animated.Text style={{ opacity,  fontSize: 22 }}>
              {label}
            </Animated.Text>
          </TouchableOpacity>
        );
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 25
  },
  item: {
    marginHorizontal: 10
  },
  itemText: {
    fontSize: 24
  }
})

export default MainAppNavigation