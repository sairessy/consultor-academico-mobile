import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, Button } from 'react-native-paper';
import CONFIG from '../config';

export default function Prefetch({ screenId, goToScreen }) {
  const [connected, setConnected] = useState(false);
  const [showErrorMsg, setShowErrorMsg] = useState(false);

  const isConnected = async () => {
    try {
      const response = await fetch(CONFIG.server + '/appinfo');
      const json = await response.json();
      setConnected(true);
    } catch (error) {
      setShowErrorMsg(true);
    }
  }

  useEffect(() => {
    isConnected();
  }, []);

  if (connected) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10, backgroundColor: '#ffffff' }}>
        <Button mode='contained' labelStyle={{ textTransform: 'capitalize' }}
          style={{ width: '100%', backgroundColor: CONFIG.colors.primary }}
          onPress={() => goToScreen(0)}
        >
          Bem Vindo!
        </Button>
      </View>
    );
  } else {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10, backgroundColor: '#ffffff' }}>
        {!showErrorMsg ?
          <ActivityIndicator /> :
          <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            <Ionicons color='#ccc' size={50} name='wifi' />
            <Text style={{ textAlign: 'center', color: '#666' }}>
              Certifique-se de estar conectado à internet!
            </Text>
            <Button mode='contained' labelStyle={{ textTransform: 'capitalize' }}
              style={{ width: '100%', backgroundColor: CONFIG.colors.primary, margin: 10 }}
              onPress={() => {
                setShowErrorMsg(false);
                isConnected();
              }}
            >
              Tentar novamente
            </Button>
          </View>
        }
      </View>
    );

  }
}