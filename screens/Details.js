import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, ActivityIndicator, ScrollView } from 'react-native';


const detailsURL = "https://data.cityofnewyork.us/resource/f9bf-2cp4.json";

const Details = (props) => {

  const { item } = props.route.params

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(detailsURL)
      .then((response) => response.json()) //get data from JSON
      .then((json) => {

        let filterd = json.filter(detail => detail.dbn == item.dbn || detail.school_name == item.school_name) //filter through data

        console.log("filterd", filterd)
        setData(filterd) //set filtered data
      })
      .catch((error) => alert(error)) //check for errors
      .then(setLoading(false)); //stop loading
  }, [])

  return (
    <ScrollView>
      <SafeAreaView>
        <View>
          <Text style={styles.name}>{item.school_name}</Text>
          <Text style={{ padding: 10, textAlign: 'justify' }}>{item.overview_paragraph}</Text>
          <Text style={{ padding: 10, color: 'gray' }}>{item.primary_address_line_1}</Text>

          <View style={{
            flexDirection: 'row'
          }}>
            <Text style={{ padding: 10, color: 'gray' }}>{item.city}</Text>
            <Text style={{ padding: 10, color: 'gray' }}>{item.state_code}</Text>
            <Text style={{ padding: 10, color: 'gray' }}>{item.zip}</Text>
          </View>
        </View>
        {isLoading ? (<ActivityIndicator />) : (

          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id} //unique IDs for list elements
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={styles.subCard}>
                  <Text>Number of Takers:</Text>
                  <Text>Critical Reading Score:</Text>
                  <Text>Math Avg Score:</Text>
                  <Text>Writing Avg Score:</Text>

                </View>
                <View style={styles.subCard}>
                  <Text>{item.num_of_sat_test_takers}</Text>
                  <Text>{item.sat_critical_reading_avg_score}</Text>
                  <Text>{item.sat_math_avg_score}</Text>
                  <Text>{item.sat_writing_avg_score}</Text>
                </View>
              </View>
            )}
          />
        )}
      </SafeAreaView>
    </ScrollView>
  );
}

export default Details;

const styles = StyleSheet.create({
//given more time, I would add much more styling to this page, including a generic image, 
//better formatting, and perhaps a map location using the provided coordinates
  card: {
    width: '97%',
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    borderRadius: 3,
    backgroundColor: '#fff',
    shadowRadius: 3.84,
    justifyContent: 'space-around',
    margin: 5,
    elevation: 5,
  },
  subCard: {
    // alignItems: 'center',
    // justifyContent: 'space-evenly'
  },
  name: {
    fontSize: 18,
    alignSelf: 'center',
    fontWeight: 'bold',
    width: '100%',
    padding: 10,
  }
})