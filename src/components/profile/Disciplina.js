import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { IconButton } from 'react-native-paper';
import CONFIG from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Disciplina({ goToScreen, id, percent, getUserInfo }) {

  const removeProduct = async (id) => {
    const data = {
      id, tokken: await AsyncStorage.getItem('tokken')
    }

    const response = await fetch(CONFIG.server + '/removeproduct', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const json = await response.json();

    if (json.success) {
      getUserInfo();
    }
  }

  return (
    <View style={{ padding: 5, backgroundColor: '#fcfcfc', borderWidth: 1, borderColor: '#ddd', borderBottomColor: '#ccc', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: 5, borderRadius: 5 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text>{
          CONFIG.percent.filter(p => p.id == percent)[0].label + '% ' +
          CONFIG.disciplinas.filter(d => d.id == id)[0].label
        }
        </Text>
      </View>
      <View>
        <IconButton icon='delete' color='#666' size={20}
          onPress={() => removeProduct(id)}
        />
      </View>
    </View>
  );
}