import React from "react";
import { TouchableOpacity,Text,ActivityIndicator,StyleSheet,ViewStyle,TextStyle,View } from "react-native";

interface ButtonProps {
    title:string;
    onPress:()=> void;
    variant?: 'primary' | 'secondary';
    loading?: boolean;
    disabled?:boolean;
    style?: ViewStyle;
}

export const Button: React.FC<ButtonProps> =({
    title,
    onPress,
    variant = 'primary',
    loading = false,
    disabled = false,
    style,
}) =>{

    const getButtonStyle =(): ViewStyle =>{

        const baseStyle: ViewStyle = {
                padding: 15,
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',

        };

            if (variant === 'primary') {
                return {
                    ...baseStyle,
                    backgroundColor: disabled ? '#cccccc' : '#007AFF',
                };
            } else {
                return {
                        ...baseStyle,
                        backgroundColor: '#f0f0f0',
                        borderWidth: 1,
                        borderColor: '#cccccc',
                };
            }    

    }

    const getTextStyle = (): TextStyle => {
            if (variant === 'primary') {
                return {
                    color: '#ffffff',
                    fontSize: 16,
                    fontWeight: '600',
                };
            } else {
                return {
                    color: '#333333',
                    fontSize: 16,
                    fontWeight: '600',
                };
            }
    };

    return(

        <TouchableOpacity
            style={[getButtonStyle(),style]}
            onPress={onPress}
            disabled={disabled || loading}
        
        >
            {loading && (
                <ActivityIndicator 
                    size="small" 
                    color={variant === 'secondary' ? '#4f46e5' : '#ffffff'} 
                    style={styles.loader} 
                />
            )}

            <Text style={getTextStyle()}>
                {title}
            </Text>
        </TouchableOpacity>    
        
    );

};

const styles = StyleSheet.create({
  loader: {
    marginRight: 8,
  },
});