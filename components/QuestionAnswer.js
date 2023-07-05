// REACT COMPONENT
import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'

const QuestionAnswer = ({ caption, placeholder, value, onChangeText }) => {
  return (
    <View>
      <Text style={styles.caption}> {caption} </Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  )
}

export default QuestionAnswer

const styles = StyleSheet.create({
  caption: {
    fontFamily: "montserrat-regular",
    fontSize: 20,
    textAlign: "left",
    width: 300,
    marginBottom: 5,
    marginTop: 20,
  },
  input: {
    fontFamily: "montserrat-regular",
    height: 50,
    borderRadius: 10,
    paddingLeft: 10,
    backgroundColor: "white",
    borderWidth: 3,
    borderColor: 'rgba(100, 214, 255, 0.7)',
  },
})