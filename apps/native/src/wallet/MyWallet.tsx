import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LNPay from 'lnpay'
import btoa from 'btoa'
import { getBalance, getTransactions, LN } from '../utils/LN';
import { storage } from '../../App';
import { getWallet } from '../helpers/functions';
import { alpha, beta } from '@repo/ui';
import { useNavigation } from '@react-navigation/native';
import { atom, useAtom } from 'jotai'
import { transactionsAtom } from './Transactions';


function MyWallet(): JSX.Element {
  const navigation = useNavigation()
  const [wallet, setWallet] = useState(null)
  const [transactions, setTransactions] = useAtom(transactionsAtom)


  const walletCallback = useCallback((key) => {
    setWallet(getWallet(key))
  }, [storage])

  useEffect(() => {
    const listener = storage.addOnValueChangedListener(walletCallback)
    return () => {
      listener.remove()
    }
  }, [])

  useMemo(() => {
    getTransactions().then((res) => {
      setTransactions(res.data)
    })
  }, [wallet])



  return (
    <>
      <LN />
      <View style={{ flex: 2, justifyContent: "center" }}>
        <Text style={{ textAlign: 'center', fontSize: 30, color: beta, fontWeight: 700 }}>{wallet.user_label}</Text>
        <Text style={{ textAlign: 'center', fontSize: 20, color: beta, fontWeight: 700, padding: 12 }}>{wallet.id}</Text>
        <Text style={{ textAlign: 'center', fontSize: 25, color: beta, fontWeight: 500, padding: 12 }}>{wallet.balance} sats</Text>
        <Button title='Update balance' onPress={getBalance} color={alpha} />
        <Button title='Transactions' onPress={() => navigation.navigate('Transactions')} color={alpha} />
        <Button title='New Invoice' onPress={() => navigation.navigate('NewInvoice')} color={alpha} />
        <Button title='Pay Invoice' onPress={() => navigation.navigate('PayInvoice')} color={alpha} />
      </View>
    </>

  );
}

export default MyWallet