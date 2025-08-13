import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';

const GifEditorPro = () => {
  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
      <View>
        <Text>Gif Editor Pro Screen</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    padding: 16,
  },
});

export default GifEditorPro;
