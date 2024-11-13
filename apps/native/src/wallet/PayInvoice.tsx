import React, { useMemo, useState } from 'react';
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
import { generateInvoice, getBalance, getTransactions, LN, payInvoice } from '../utils/LN';
import { storage } from '../../App';
import { getWallet } from '../helpers/functions';
import { alpha, beta, gamma } from '@repo/ui';
import QRCode from 'react-native-qrcode-svg';



function PayInvoice(): JSX.Element {
  const wallet = getWallet()

  function onPayInvoice() {
    const pr = 'lnbc1u1pjd0304pp5lg33z3qnmg5mpx68ud5jn24e2lekhzgcg0lntvs2f68x9cus6gtqdqlw3jhxapq9pmxjcfqf389qs2e9e3k72gcqzzsxqyz5vqsp5tjacpu5s370lleqythrplhdg90swultaksyl06my8jaqh30lac2s9qyyssqf6vdtvnc99gk5w6969nn9ac7z7mr6a7qgx70am800ar8q8mk7ncyahk963e8kcaumgqgj2ju874nfkmjr8kfmvn47w86aa7l5h480csqhfn343'
    payInvoice({ paymentRequest: pr })
  }

  return (
    <>
      <View style={{ flex: 2, justifyContent: "center", backgroundColor: gamma }}>
        <Button title='Pay Invoice' onPress={onPayInvoice} color={alpha} />
      </View>
    </>

  );
}

export default PayInvoice 