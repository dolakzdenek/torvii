import React, { useMemo, useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
  Alert,
  Button,
  FlatList,
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
import { generateInvoice, getBalance, getTransactions, LN } from '../utils/LN';
import { storage } from '../../App';
import { getTransactionsLocal, getWallet } from '../helpers/functions';
import { alpha, beta, gamma } from '../styles/theme';
import { atom, useAtom } from 'jotai';

export const transactionsAtom = atom([])

function Transactions(): JSX.Element {
  const wallet = getWallet()
  const [transactions] = useAtom(transactionsAtom)

  return (
    <View style={{ flex: 2, justifyContent: "center", backgroundColor: gamma }}>
      <FlatList data={transactions} renderItem={({ item }) => {
        return (
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', padding: 12 }}>
            <Text style={{ color: beta, fontSize: 20 }}>{item.num_satoshis} sats</Text>
            <Text style={{ color: beta, fontSize: 20 }}>{item.user_label}</Text>
          </View>
        )
      }} />
    </View>

  );
}

export default Transactions 