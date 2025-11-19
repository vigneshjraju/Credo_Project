import React, { useState,useEffect } from "react";
import {View,Text,StyleSheet,ScrollView,TextInput,Alert} from 'react-native';
import { Button } from "../components/Button";
import { useMobileAgent } from "../hooks/useMobileAgent";
import { backendApi } from "../services/backendApi";


export const ConnectionScreen: React.FC = ()=>{

    const {connectionState,recieveInvitation,loadConnections} = useMobileAgent();
    const [invitationUrl, setInvitationUrl] = useState('');
    const [fetchingInvitation,setFetchingInvitation]=useState(false);
    const [backendConnected, setBackendConnected] = useState(false);

    useEffect(() => {
      testBackendConnection();
    }, []);

    const testBackendConnection = async () => {
        try {
          console.log('Testing backend connection...');
          await backendApi.testConnection();
          setBackendConnected(true);
          console.log('Backend connection successful');

        } catch (error) {
          console.error('Backend connection failed:', error);
          setBackendConnected(false);
        }
    };



    const fetchInvitationFromBackend = async ()=>{
        if (!backendConnected) {
            Alert.alert('Error', 'Backend not connected. Please check connection first.');
            return;
        }


        try{

          setFetchingInvitation(true);
          console.log('Fetching invitation from Backend..');
          
          const response = await backendApi.createInvitation();
          const invitationUrl = response.data.invitationUrl;


          console.log('Recieved invitation', invitationUrl);
          setInvitationUrl(invitationUrl);

          Alert.alert('Success', 'Invitation received from backend!') 

        } catch (error:any){
            Alert.alert('Error',`Failed to get invitation: ${error.message} \n\nMake sure:\n1. Backend is running\n2. Correct IP address\n3. Same WiFi network` );

        } finally {
           setFetchingInvitation(false);
        }

    }


    const handleRecieveInvitation =async ()=>{

            if(!invitationUrl.trim()){
                Alert.alert('Error','Please enter a invitation Url');
                return;
            }

            try{
                console.log('Accepting invitation...');
                
                await recieveInvitation(invitationUrl.trim());
                setInvitationUrl('');
                Alert.alert('Success', 'Connection established successfully!')


            }catch(error){
                console.error(' Failed to accept invitation:', error);
                Alert.alert('Error', `Failed to establish connection`);
            }

    }

    const formatConnectionState = (state:string) =>{

        switch(state) {

            case 'complete':
            case 'responded':
                return 'Connected';
            case 'invited':
            case 'requested':
                return 'Pending';
            default:
                return state; 


        }

    };

    return(
        <ScrollView style={styles.container}>

          <View style={[styles.card, backendConnected ? styles.connectedCard : styles.disconnectedCard]}>

              <Text style={styles.cardTitle}>
                  Backend Status: {backendConnected ? 'Connected' : ' Disconnected'}
              </Text>

              <Text style={styles.instruction}>
                Backend: http://192.168.1.4:3000
              </Text>

              <Button
                title="Test Connection"
                onPress={testBackendConnection}
                variant={backendConnected ? 'primary' : 'secondary'}
                style={styles.button}
              />

          </View>

            {backendConnected && (
              <View style={styles.card}>
                    <Text style={styles.cardTitle}>Step 1: Get Invitation from Backend</Text>

                    <Button
                      title="Get Invitation from Backend"
                      onPress={fetchInvitationFromBackend}
                      loading={fetchingInvitation}
                      style={styles.button}
                    />

                    <Text style={styles.note}>
                      Backend: http://192.168.1.4:3000
                    </Text>

              </View>
            )}

            {backendConnected && (
              <View style={styles.card}>
                      <Text style={styles.cardTitle}>Step 2: Accept Invitation</Text>
                      
                      <Text style={styles.instruction}>
                        Paste the invitation URL here:
                      </Text>

                      <TextInput
                          style={styles.textInput}
                          value={invitationUrl}
                          onChangeText={setInvitationUrl}
                          placeholder="Invitation URL will appear here after Step 1"
                          multiline
                          numberOfLines={4}
                          textAlignVertical="top"
                      />

                      <Button
                          title="Accept Invitation"
                          onPress={handleRecieveInvitation}
                          loading={connectionState.loading}
                          disabled={!invitationUrl.trim() || connectionState.loading}
                          style={styles.button}
                      />
              </View>
            )}


            <View style={styles.card}>
                   <Text style={styles.cardTitle}>
                        Connections ({connectionState.connections.length})
                    </Text> 

                    {connectionState.connections.length === 0 ? (
                        <Text style={styles.noConnections}>
                            No connections yet. Accept an invitation to get started.
                        </Text>
                    ):(
                        connectionState.connections.map((connection) => (
                            <View key={connection.id} style={styles.connectionItem}>

                                <Text style={styles.connectionId}>
                                    ID: {connection.id.substring(0, 20)}...
                                </Text>

                                <Text style={styles.connectionState}>
                                    {formatConnectionState(connection.state)}
                                </Text>

                                <Text style={styles.connectionDate}>
                                    Created: {new Date(connection.createdAt).toLocaleDateString()}
                                </Text>

                            </View>
                        ))

                    )}

                    <Button
                        title="Refresh Connections"
                        onPress={loadConnections}
                        variant="secondary"
                        loading={connectionState.loading}
                        style={styles.refreshButton}
                    />


            </View>

        </ScrollView>

    );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
  connectedCard: {
    borderLeftWidth: 4,
    borderLeftColor: 'green',
  },
  disconnectedCard: {
    borderLeftWidth: 4,
    borderLeftColor: 'red',
  },

  instruction: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 15,
    lineHeight: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    marginBottom: 15,
    minHeight: 100,
    backgroundColor: '#fafafa',
  },
  button: {
    width: '100%',
  },
  refreshButton: {
    width: '100%',
    marginTop: 10,
  },
  noConnections: {
    textAlign: 'center',
    color: '#999999',
    fontStyle: 'italic',
    marginVertical: 20,
  },
  connectionItem: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  connectionId: {
    fontSize: 12,
    color: '#666666',
    fontFamily: 'monospace',
    marginBottom: 5,
  },
  connectionState: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  connectionDate: {
    fontSize: 12,
    color: '#999999',
  },
  note: {
    fontSize: 12,
    color: '#999999',
    textAlign: 'center',
    marginTop: 10,
    fontStyle: 'italic',
  },
});