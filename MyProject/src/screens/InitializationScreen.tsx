import React from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar,Alert } from 'react-native';
import { Button } from '../components/Button';
import { useMobileAgent } from '../hooks/useMobileAgent';

export const InitializationScreen: React.FC = () => {
  const { agentState, initializeAgent, resetAgent } = useMobileAgent();

  const handleInitialize = async () => {
    await initializeAgent();
  };

  const handleReset = () => {
    Alert.alert(
      'Reset Agent',
      'Are you sure you want to reset the agent? This will clear all stored data.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Reset', style: 'destructive', onPress: resetAgent },
      ]
    );
  };

  return (

      <View style={styles.container}>

          <StatusBar barStyle="dark-content"/>


          <View style={styles.header}>
            <Text style={styles.title}>Bob Agent</Text>
            <Text style={styles.subtitle}>Mobile Holder</Text>
          </View>

          <View style={styles.content}>

              <Text style={styles.cardTitle}>Agent Status</Text>

              <View style={styles.statusRow}>
                  <Text style={styles.statusLabel}>Status:</Text>

                  <Text style={[
                      styles.statusValue,
                      agentState.isInitialized? styles.statusSuccess:styles.statusError
                  ]}>
                    {agentState.isInitialized? 'Initialized':'Not Initialized'}
                  </Text>
              </View>

              {agentState.isInitialized ? (
                <View style={styles.initializedView}>
                    <Text style={styles.successText}>Agent is ready!</Text>
                    
                    <View style={styles.infoBox}>
                      <Text style={styles.infoText}>Label: {agentState.label}</Text>
                      <Text style={styles.infoText}>Wallet: {agentState.walletId}</Text>
                    </View>

                    <Button
                      title="Reset Agent"
                      onPress={handleReset}
                      variant="secondary"
                      style={styles.button}
                    />
                </View>
              ) : (
                   <View style={styles.initializationView}>
                          <Text style={styles.instructionText}>
                            Press the button below to initialize your Bob agent.
                          </Text>

                          <Button
                            title={
                              agentState.initializing 
                                ? "Initializing..." 
                                : "Initialize Bob Agent"
                            }
                            onPress={handleInitialize}
                            loading={agentState.initializing}
                            disabled={agentState.initializing}
                            style={styles.button}
                          />

                          <Text style={styles.noteText}>
                            This will create a secure wallet on your device.
                          </Text>


                    </View>
              )}

          </View>
          
            <View style={styles.infoCard}>
                <Text style={styles.infoTitle}>What is Bob Agent?</Text>
                <Text style={styles.infoText}>
                  Bob agent stores your digital credentials securely on your phone.
                </Text>
            </View>

      </View>
    
  );
};

const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: '#f5f5f5',
        },
        header: {
          backgroundColor: '#ffffff',
          padding: 20,
          paddingTop: 50,
          alignItems: 'center',
          borderBottomWidth: 1,
          borderBottomColor: '#e0e0e0',
        },
        title: {
          fontSize: 24,
          fontWeight: 'bold',
          color: '#333333',
        },
        subtitle: {
          fontSize: 16,
          color: '#666666',
          marginTop: 5,
        },
        content: {
          flex: 1,
          padding: 20,
        },
        card: {
          backgroundColor: '#ffffff',
          padding: 20,
          borderRadius: 10,
          marginBottom: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        },
        cardTitle: {
          fontSize: 18,
          fontWeight: 'bold',
          color: '#333333',
          marginBottom: 15,
        },
        statusRow: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 15,
        },
        statusLabel: {
          fontSize: 16,
          color: '#666666',
        },
        statusValue: {
          fontSize: 16,
          fontWeight: 'bold',
        },
        statusSuccess: {
          color: 'green',
        },
        statusError: {
          color: 'red',
        },
        initializedView: {
          marginTop: 10,
        },
        initializationView: {
          marginTop: 10,
        },
        successText: {
          fontSize: 16,
          color: 'green',
          marginBottom: 15,
          textAlign: 'center',
        },
        instructionText: {
          fontSize: 16,
          color: '#666666',
          marginBottom: 20,
          textAlign: 'center',
        },
        infoBox: {
          backgroundColor: '#f8f8f8',
          padding: 15,
          borderRadius: 8,
          marginBottom: 15,
        },
        infoText: {
          fontSize: 14,
          color: '#333333',
          marginBottom: 5,
        },
        button: {
          width: '100%',
          marginBottom: 10,
        },
        noteText: {
          fontSize: 12,
          color: '#999999',
          textAlign: 'center',
          marginTop: 10,
          fontStyle: 'italic',
        },
        infoCard: {
          backgroundColor: '#ffffff',
          padding: 15,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: '#e0e0e0',
        },
        infoTitle: {
          fontSize: 16,
          fontWeight: 'bold',
          color: '#333333',
          marginBottom: 10,
        },
});