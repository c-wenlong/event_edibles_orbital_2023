// REACT NATIVE COMPONENTS
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
// CUSTOM COMPONENTS
import QASection from '../components/QASection'

const Q_APage = () => {
  // Array of commonly asked qns and answers
  const QAList = [
    { Q: "", A: "" },
    { Q: "", A: "" },
    { Q: "", A: "" },
    { Q: "", A: "" },
    { Q: "", A: "" },
    { Q: "", A: "" },
  ]
  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text>Frequently Asked Questions</Text>
      </View>
      {/* Q&A SECTIONS */}
      <ScrollView style={styles.body}>
        {QAList.map((Q,A) => {
          <QASection Q={Q} A={A} />
        })}
      </ScrollView>
    </View>
  )
}

export default Q_APage

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1
  },
  headerText: {
    fontFamily: 'montserrat-bold',
    fontSize: 18,
    textAlign: 'left',
    padding: 16,
  },
  body: {
    flex: 7
  },
  section: {
    flexDirection: 'row',
  }
})