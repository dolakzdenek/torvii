import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';
import { MMKV } from 'react-native-mmkv'
import LNPay from 'lnpay'
import btoa from 'btoa'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyWallet from './src/wallet/MyWallet';
import NewInvoice from './src/wallet/NewInvoice';
import PayInvoice from './src/wallet/PayInvoice';
import Transactions from './src/wallet/Transactions';
import { Button } from "@repo/ui";
import { alpha, beta, gamma } from '@repo/ui';

const logo = null //TODO: Add logo
const icon = null //TODO: Add icon

const AppStack = createNativeStackNavigator()
const MyWalletStack = createNativeStackNavigator()

export const storage = new MMKV({
  id: "user-storage",
  //encryptionKey: 'hunter2'
})



function HomeScreen() {
  const navigation = useNavigation()
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: gamma }}>
      <Button text='MyWallet' onClick={() => navigation.navigate('MyWallet')} />
      <Button text='Settings' onClick={() => navigation.navigate('Settings')} />
    </View>
  );
}

function Settings() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Settings</Text>
    </View>
  );
}



export default function App() {



  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <AppStack.Navigator>
          <AppStack.Screen name="Home" component={HomeScreen} options={{ headerShown: true }} />
          {/*<AppStack.Screen name="MyWallet" component={MyWalletNavigator} options={{ headerShown: true }} />
          <AppStack.Screen name="Settings" component={Settings} options={{ headerShown: true }} />*/}
        </AppStack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

{/*function MyWalletNavigator(): JSX.Element {
  return (
    <MyWalletStack.Navigator>
      <MyWalletStack.Screen name="Wallet" component={MyWallet} options={{ headerShown: true }} />
      <MyWalletStack.Screen name="NewInvoice" component={NewInvoice} options={{ headerShown: true }} />
      <MyWalletStack.Screen name="PayInvoice" component={PayInvoice} options={{ headerShown: true }} />
      <MyWalletStack.Screen name="Transactions" component={Transactions} options={{ headerShown: true }} />
    </MyWalletStack.Navigator>
  );
}*/}
