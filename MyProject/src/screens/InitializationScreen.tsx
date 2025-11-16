import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  StatusBar,
  Alert 
} from 'react-native';
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
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
      
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>🤖</Text>
        </View>
        <Text style={styles.title}>Bob Agent</Text>
        <Text style={styles.subtitle}>Mobile Identity Holder</Text>
      </View>

      {/* Main Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Agent Status</Text>
          <View style={[
            styles.statusBadge,
            agentState.isInitialized ? styles.statusActive : styles.statusInactive
          ]}>
            <Text style={styles.statusText}>
              {agentState.isInitialized ? 'Initialized' : 'Not Initialized'}
            </Text>
          </View>
        </View>

        {agentState.isInitialized ? (
          <View style={styles.initializedContent}>
            <View style={styles.successIcon}>
              <Text style={styles.successIconText}>✅</Text>
            </View>
            
            <Text style={styles.successTitle}>Agent Ready!</Text>
            <Text style={styles.successMessage}>
              Your Bob agent is initialized and ready to receive credentials.
            </Text>

            <View style={styles.agentInfo}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Label:</Text>
                <Text style={styles.infoValue}>{agentState.label}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Wallet ID:</Text>
                <Text style={styles.infoValue}>{agentState.walletId}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Status:</Text>
                <Text style={[styles.infoValue, styles.statusReady]}>Ready</Text>
              </View>
            </View>

            <Button
              title="Reset Agent"
              onPress={handleReset}
              variant="secondary"
              style={styles.resetButton}
            />
          </View>
        ) : (
          <View style={styles.initializationContent}>
            <View style={styles.instructionIcon}>
              <Text style={styles.instructionIconText}>🚀</Text>
            </View>
            
            <Text style={styles.instructionTitle}>Initialize Your Agent</Text>
            <Text style={styles.instructionText}>
              Initialize the Bob agent to create a secure wallet and start receiving verifiable credentials.
            </Text>

            <View style={styles.featureList}>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>🔐</Text>
                <Text style={styles.featureText}>Secure local wallet</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>📨</Text>
                <Text style={styles.featureText}>Receive credentials</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>🛡️</Text>
                <Text style={styles.featureText}>Present proofs</Text>
              </View>
            </View>

            <Button
              title={
                agentState.initializing 
                  ? "Initializing..." 
                  : "Initialize Bob Agent"
              }
              onPress={handleInitialize}
              loading={agentState.initializing}
              disabled={agentState.initializing}
              style={styles.initializeButton}
              size="lg"
            />

            <Text style={styles.noteText}>
              This process may take a few seconds. Please don't close the app.
            </Text>
          </View>
        )}
      </View>

      {/* Info Section */}
      <View style={styles.infoCard}>
        <Text style={styles.infoCardTitle}>About Bob Agent</Text>
        <Text style={styles.infoCardText}>
          Bob is a mobile identity holder that stores your verifiable credentials securely on your device. 
          You can receive credentials from issuers and present proofs to verifiers.
        </Text>
        
        <View style={styles.nextSteps}>
          <Text style={styles.nextStepsTitle}>Next Steps:</Text>
          <Text style={styles.nextStep}>1. Wait for connection invitations</Text>
          <Text style={styles.nextStep}>2. Accept credential offers</Text>
          <Text style={styles.nextStep}>3. Respond to proof requests</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  contentContainer: {
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4f46e5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  logo: {
    fontSize: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#6b7280',
    marginTop: 8,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    margin: 20,
    padding: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1f2937',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusActive: {
    backgroundColor: '#dcfce7',
  },
  statusInactive: {
    backgroundColor: '#f3f4f6',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  initializedContent: {
    alignItems: 'center',
  },
  successIcon: {
    marginBottom: 16,
  },
  successIconText: {
    fontSize: 48,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#16a34a',
    marginBottom: 8,
    textAlign: 'center',
  },
  successMessage: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  agentInfo: {
    width: '100%',
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  infoRowLast: {
    borderBottomWidth: 0,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  statusReady: {
    color: '#16a34a',
  },
  resetButton: {
    width: '100%',
  },
  initializationContent: {
    alignItems: 'center',
  },
  instructionIcon: {
    marginBottom: 16,
  },
  instructionIconText: {
    fontSize: 48,
  },
  instructionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
    textAlign: 'center',
  },
  instructionText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  featureList: {
    width: '100%',
    marginBottom: 32,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  featureIcon: {
    fontSize: 20,
    marginRight: 12,
    width: 24,
  },
  featureText: {
    fontSize: 16,
    color: '#374151',
  },
  initializeButton: {
    width: '100%',
    marginBottom: 16,
  },
  noteText: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  infoCard: {
    backgroundColor: '#ffffff',
    margin: 20,
    marginTop: 0,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  infoCardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  infoCardText: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 16,
  },
  nextSteps: {
    backgroundColor: '#f0f9ff',
    padding: 16,
    borderRadius: 8,
  },
  nextStepsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0369a1',
    marginBottom: 8,
  },
  nextStep: {
    fontSize: 13,
    color: '#0c4a6e',
    marginBottom: 4,
  },
});