import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Avatar, Checkbox, IconButton } from 'react-native-paper';
import Logo from '../Logo';
import CONFIG from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Header({ goToScreen, toggleSidebar, show }) {
  const [tokken, setTokken] = useState(null);
  const [user, setUser] = useState(null);

  const chekSession = async () => {
    const _tokken = await AsyncStorage.getItem('tokken');
    if (_tokken != null) {
      const response = await fetch(CONFIG.server + '/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tokken: _tokken })
      });

      const json = await response.json();
      setUser(json[0]);
      setTokken(_tokken);
    }
  }

  const navigate = async () => {
    if (tokken == null) {
      goToScreen(1);
    } else {
      goToScreen(3);
    }
  }

  useEffect(() => {
    chekSession();
  }, [])

  return (
    <View style={{ height: 50, backgroundColor: CONFIG.colors.primary, borderBottomWidth: 1, borderBottomColor: '#ccc', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <IconButton icon={show ? 'close' : 'menu'} color='#ddd' size={20} onPress={() => toggleSidebar()} />
        <View style={{ justifyContent: 'center', padding: 10 }}>
          <Logo justify={'left'} textColor='#ddd' />
        </View>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity
          onPress={() => navigate()}
        >
          {user != null ?
            <Image source={{ uri: user.img.url == '' ? 'https://img.icons8.com/material-outlined/48/ffffff/user-male-circle.png' : user.img.url }} style={{ width: 25, height: 25, borderRadius: '100%', margin: 5 }} onPress={() => navigate()} /> :
            <Ionicons name={'log-in'} size={tokken == null ? 25 : 20} color='#fff'
              style={{ marginRight: 5 }}
            />
          }
        </TouchableOpacity>

        {/* <MaterialIcons name='more-vert' size={20} color='#ddd'
          style={{ marginRight: 5 }}
        /> */}
      </View>
    </View>
  );
}