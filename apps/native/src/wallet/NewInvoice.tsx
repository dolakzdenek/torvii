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
import { generateInvoice, getBalance, getTransactions, LN } from '../utils/LN';
import { storage } from '../../App';
import { getWallet } from '../helpers/functions';
import { alpha, beta, gamma } from '@repo/ui';
import QRCode from 'react-native-qrcode-svg';

const QRCODE = ({ value, getRef }) => {
  return (
    <QRCode
      value={value}
      size={250}
      color="black"
      backgroundColor="white"
      getRef={getRef}
    />
  )
}



function NewInvoice(): JSX.Element {
  const [invoice, setInvoice] = useState(null)
  const wallet = getWallet()

  function onGenerateInvoice() {
    generateInvoice({ amount: 2000 }).then(setInvoice)
  }

  return (
    <>
      <View style={{ flex: 2, justifyContent: "center", backgroundColor: gamma }}>
        <Button title='Generate Invoice' onPress={onGenerateInvoice} color={alpha} />
        <View style={{ backgroundColor: "white", alignItems: 'center', padding: 25 }}>
          {invoice && <QRCODE value={invoice?.payment_request ?? null} />}

        </View>
        <ScrollView>
          <Text style={{ textAlign: 'center', fontSize: 10, color: beta, fontWeight: 500, padding: 12 }}>Invoice: {JSON.stringify(wallet, null, 2)}</Text>
          <Text style={{ textAlign: 'center', fontSize: 10, color: beta, fontWeight: 500, padding: 12 }}>Invoice: {JSON.stringify(invoice, null, 2)}</Text>
        </ScrollView>
      </View>
    </>

  );
}

export default NewInvoice 