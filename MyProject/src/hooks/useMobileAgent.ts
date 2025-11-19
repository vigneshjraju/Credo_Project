import { useState, useEffect } from "react";
import { mobileBobAgent } from "../services/mobileAgent";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ConnectionRecord } from "@credo-ts/core";


export interface AgentState {
    isInitialized : boolean;
    label?:string;
    walletId?:string;
    initializing:boolean
}

export interface ConnectionState {
    connections: ConnectionRecord[];
    loading:boolean;

}


export const useMobileAgent =()=>{

    const [agentState,setAgentState] = useState<AgentState>({
        isInitialized: false,
        initializing:false,
    })

    const [connectionState,setConnectionState]= useState<ConnectionState>({
        connections: [],
        loading: false
    })

    useEffect(()=>{
        loadAgentState()
    },[]);

    const loadAgentState = async () =>{

        try{
            const savedAgent = await AsyncStorage.getItem('mobile-bob-agent-state');
                if(savedAgent){
                    const parsedState = JSON.parse(savedAgent);
                    setAgentState(prev =>({ ...prev, ...parsedState}));

                    if(parsedState.isInitialized){

                        const currentInitialized = mobileBobAgent.getIsInitialized();
                        if(!currentInitialized){

                            await AsyncStorage.removeItem('mobile-bob-agent-state');
                            setAgentState({
                                isInitialized: false,
                                initializing:false,
                            });

                        }

                    }

                }

        }catch(error){
            console.error('Error loading agent state:', error);
        
        }

    };

    const savedAgentState = async (state: Partial<AgentState>)=>{

        try{
            const newState = {...agentState, ...state};
            await AsyncStorage.setItem('mobile-bob-agent-state',JSON.stringify(newState));

            setAgentState(newState);

        }catch (error){
            console.error('Error saving agent state:', error);
            
        }
    }

    const loadConnections = async () => {
        try{

            setConnectionState (prev =>({...prev, loading:true}));
            const connections= await mobileBobAgent.getConnections();
            setConnectionState({connections,loading:false});

        }catch(error){
            console.error('Error loading connections',error);
            setConnectionState (prev => ({ ...prev, loading:false}))
        }
    }

    const recieveInvitation = async (invitationUrl:string) => {
        try{

            setConnectionState(prev => ({...prev, loading:true}));

            const result = await mobileBobAgent.recieveInvitation(invitationUrl);

            Alert.alert('Success','Connection established successfully');

            await loadConnections();
            return result;

        } catch(error:any){
            console.error('Failed to receive invitation:',error);
            Alert.alert('Error', `Failed to establish connection: ${error.message}`);
            setConnectionState(prev => ({ ...prev, loading: false }));
            throw error;
        }


    }

    const initializeAgent = async () =>{

        try{
            console.log('Starting agent initialization..');
            setAgentState(prev =>({...prev, initializing:true}));

            const success = await mobileBobAgent.initializeAgent();

            if(success){
                const agentInfo = mobileBobAgent.getAgentInfo();
                await savedAgentState({
                    isInitialized:true,
                    label:agentInfo.label,
                    walletId:agentInfo.walletId,
                    initializing:false,
                });

                Alert.alert('Success', 'Bob Agent initialized successfully.');
                console.log('Agent state saved to storage');

            } else {
                throw new Error('Initialization returned false');
            }

        }catch (error:any){
            console.error('Failed to initialize agent:',error);
            setAgentState(prev=>({...prev, initializing:false}));
        
            Alert.alert(
                'Initialization Failed',
                `Failed to initialize Bob Agent: ${error.message}`
            )

        }


    }


    const resetAgent = async ()=>{

        await AsyncStorage.removeItem('mobile-bob-agent-state');

        setAgentState({
            isInitialized:false,
            initializing:false,
        });

        Alert.alert('Reset', 'Agent state has been reset.');
    }

    return{
        agentState,
        connectionState,
        initializeAgent,
        resetAgent,
        recieveInvitation,
        loadConnections
    };


}