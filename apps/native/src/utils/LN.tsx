import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
import lnpay from 'lnpay'
import btoa from 'btoa'
import { storage } from '../../App';
import { getWallet } from '../helpers/functions';

export const LNPay = lnpay({
  secretKey: 'sak_qXwUQtXHzvcmnEPvcKvWdn2GKTEuX5f1',
  walletAccessKey: "wal_j7ft9sKw7ubb5" //getWallet().id, //wal_j7ft9sKw7ubb5
})

function generateInvoice(parameters): typeAnnotation {
  const wallet = getWallet()
  if (wallet)
    return LNPay.generateInvoice({
      num_satoshis: parameters.amount,
      passTru: {
        order_id: parameters.id,
      },
      description_hash: 'MTIzNDY1Nzg5N...',
      memo: 'Invoice memo.',
      expiry: 86400, // 1 day
    })
      .then((res) => res)
      .then((res) => {
        console.log('Created invoice', JSON.stringify(res, null, 2))
        return res
      })
      .catch(console.error)
  console.debug(LNPay)
}

function getBalance(): typeAnnotation {
  const wallet = getWallet()
  if (wallet)
    return LNPay.getBalance()
      .then(({ balance }) => balance)
      .then((balance) => {
        console.log(`Wallet ${wallet.id} balance is ${balance}`)
        handleNewWalletUpdate({ ...wallet, balance })
        return balance
      })
      .catch(console.error)
}

function getTransactions(): typeAnnotation {
  const wallet = getWallet()
  if (wallet)
    return LNPay.getTransactions({ page: 1 })
      .then((list) => list)
      .then((list) => {
        console.log(`Transactions list`, JSON.stringify(list, null, 2))
        return list
      })
      .catch(console.error)
}

function payInvoice(parameters): typeAnnotation {
  const wallet = getWallet()
  if (wallet)
    console.log(`Pay Invoice`, JSON.stringify(parameters, null, 2))
  return LNPay.payInvoice({
    payment_request: parameters.paymentRequest, passTru: {
      order_id: '100'
    }
  })
    .then((res) => {
      console.log(`Pay Invoice`, JSON.stringify(res, null, 2))
      return res
    })
    .catch(console.error)
}

function handleNewWalletUpdate(walletData) {
  //console.log(walletData)
  storage.set('wallet', JSON.stringify(walletData))
  return walletData
}

function LN(): JSX.Element {
  useEffect(() => {
    const wallet = getWallet()
    if (!wallet)
      LNPay.createWallet({
        user_label: 'My Test Wallet',
      })
        .then(handleNewWalletUpdate)
        .finally(() => console.log('New wallet created'))
        .catch(console.error)
  }, [])



  return null
}

export { LN, getBalance, getTransactions, generateInvoice, payInvoice } 