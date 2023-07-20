// REACT NATIVE COMPONENTS
import { ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
// CUSTOM COMPONENTS
import QASection from '../components/QASection'

const Q_APage = () => {
  // Array of commonly asked qns and answers
  const QAList = [
    { Q: "How do I upload buffet events?", A: "Create a account under Staff to access the upload function!" },
    //{ Q: "", A: "" },
    //{ Q: "", A: "" },
    //{ Q: "", A: "" },
    //{ Q: "", A: "" },
    //{ Q: "", A: "" },
  ];
  // App interface
  return (
    <ImageBackground source={require('../assets/images/posterwithoutlogo.png')} style={styles.imageBackground}>
      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Frequently Asked Questions</Text>
        </View>
        {/* Q&A SECTIONS */}
        <ScrollView style={styles.body} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          {QAList.map((item, index) => {
            return (<QASection key={index} Q={item.Q} A={item.A} index={index} />)
          })}
        </ScrollView>
      </View>
    </ImageBackground>
  )
}

export default Q_APage

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingVertical: 20,
  },
  header: {
    flex: 0.1,
    alignItems: 'center'
  },
  headerText: {
    fontFamily: 'montserrat-bold',
    fontSize: 18,
    textAlign: 'left',
    padding: 16,
    borderRadius: 25,
    borderWidth: 2,
    backgroundColor: 'white',
  },
  body: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  content: {
  }
})