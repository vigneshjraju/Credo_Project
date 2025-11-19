import React, { useEffect,useState  } from 'react';
import { View, StatusBar, ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { InitializationScreen } from './src/screens/InitializationScreen';
import { ConnectionScreen } from './src/screens/ConnectionScreen';


type TabType= 'agent' | 'connections';


export default function App() {

  const [activeTab, setActiveTab] = useState<TabType>('agent');

  return (

        <View style={{ flex: 1 }}>

              <StatusBar barStyle="dark-content" />

              <View style={styles.tabContainer}>

                    <TouchableOpacity
                      style={[styles.tab, activeTab === 'agent' && styles.activeTab]}
                      onPress={() => setActiveTab('agent')}
                    >
                      <Text style={[styles.tabText, activeTab === 'agent' && styles.activeTabText]}>
                        Agent
                      </Text>

                    </TouchableOpacity>


                    <TouchableOpacity
                      style={[styles.tab, activeTab === 'connections' && styles.activeTab]}
                      onPress={() => setActiveTab('connections')}
                    >
                        <Text style={[styles.tabText, activeTab === 'connections' && styles.activeTabText]}>
                          Connections
                        </Text>

                    </TouchableOpacity>

              </View>

              <ScrollView style={styles.content}>

                    {activeTab === 'agent' && <InitializationScreen />}
                    {activeTab === 'connections' && <ConnectionScreen />}


              </ScrollView>

        </View>


  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#dee2e6',
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  activeTab: {
    backgroundColor: '#007AFF',
    borderBottomWidth: 3,
    borderBottomColor: '#0056b3',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6c757d',
  },
  activeTabText: {
    color: '#ffffff',
  },
  content: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});