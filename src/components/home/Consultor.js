import React from 'react';
import { Alert, Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Button, IconButton } from 'react-native-paper';
import CONFIG from '../../config';

import * as Clipboard from 'expo-clipboard';

export default function Consultor({ fullName, course, zone, institution, contact, disciplinas, img }) {
  const openWhatsApp = async () => {
    const url = 'https://wa.me/+258' + contact;
    Linking.openURL(url);
  }

  const showUserDetails = async => {
    // alert('Em desenvolvimento!');
  }

  const copyNumber = async () => {
    try {
      Clipboard.setString(contact);
      console.log(contact);
      Alert.alert('', 'Número copiado para área de colagem!', [
        {
          text: '',
          onPress: () => { },
          style: 'cancel',
        },
        { text: 'OK', onPress: () => { } },
      ]);
    } catch (error) {
      Alert.alert('Número:', contact, [
        {
          text: '',
          onPress: () => { },
          style: 'cancel',
        },
        { text: 'OK', onPress: () => { } },
      ]);
    }
  }

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, margin: 10, borderRadius: 5, borderWidth: 1, borderColor: '#fff' }}>
      <View style={{ flexDirection: 'row', width: 50, height: 50, justifyContent: 'center', alignItems: 'center' }}>
        {img.url == '' ?
          <Ionicons name='person-circle' size={40} color='#ddd' /> :
          <Image source={{ uri: img.url }} style={{ width: 40, height: 40, borderRadius: '100%' }} />
        }
      </View>
      <View style={{ backgroundColor: '#fff', flex: 1, padding: 5, borderRadius: 5 }}>
        <Text>{fullName}</Text>
        <Text style={{ fontSize: 11 }}>{CONFIG.courses.filter(c => c.id == course)[0].label} <Text style={{ fontSize: 9 }}>{CONFIG.institutions.filter(i => i.id == institution)[0].label}</Text></Text>
        <Text style={{ fontSize: 11 }}>{CONFIG.zones.filter(z => z.id == zone)[0].label}</Text>
        <View style={{ flexDirection: 'row' }}>
          <IconButton icon='whatsapp' color='#666' size={15} onPress={() => openWhatsApp()} />
          <IconButton icon='message' color='#666' size={15} />
          <IconButton icon='phone' color='#666' size={15} />
          <IconButton icon='content-copy' color='#666' size={15} onPress={() => copyNumber()} />
        </View>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {disciplinas.map(d => (
            <Text
              key={d.disciplina}
              style={{ borderRadius: 2, fontSize: 8, margin: 5, padding: 5, backgroundColor: '#ddd' }}>
              {CONFIG.disciplinas.filter(ds => ds.id == d.disciplina)[0].label}
            </Text>
          ))}
        </View>
      </View>
      <View style={{ justifyContent: 'center' }}>
        <TouchableOpacity
          style={{ width: 30, height: 30, backgroundColor: '#eee', borderRadius: '100%', justifyContent: 'center', alignItems: 'center' }}
          onPress={() => showUserDetails()}
        >
          <MaterialIcons name='chevron-right' color={true ? CONFIG.colors.primary : '#666'} size={20} />
        </TouchableOpacity>

      </View>
    </View>
  );
}