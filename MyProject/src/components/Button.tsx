import React from "react";
import { TouchableOpacity,Text,ActivityIndicator,StyleSheet,ViewStyle,TextStyle,View } from "react-native";

interface ButtonProps {
    title:string;
    onPress:()=> void;
    variant?: 'primary' | 'secondary'| 'danger';
    loading?: boolean;
    disabled?:boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
    size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> =({
    title,
    onPress,
    variant = 'primary',
    loading = false,
    disabled = false,
    style,
    textStyle,
    size = 'md',
}) =>{

    const getButtonStyle =(): ViewStyle =>{

        const baseStyle: ViewStyle = {
            paddingVertical: size === 'sm' ? 8: size === 'lg' ? 16:12,
            paddingHorizontal: size === 'sm' ? 16 : size === 'lg' ? 32 : 24,
            borderRadius: 8,
            alignItems: 'center',

        };

        switch (variant) {
            case 'primary':
                return {
                ...baseStyle,
                backgroundColor: '#4f46e5',
                };
            case 'secondary':
                return {
                ...baseStyle,
                backgroundColor: '#f3f4f6',
                borderWidth: 1,
                borderColor: '#d1d5db',
                };
            case 'danger':
                return {
                ...baseStyle,
                backgroundColor: '#dc2626',
                };
            default:
                return baseStyle;
        }    

    }

    const getTextStyle = (): TextStyle => {
        const baseStyle: TextStyle = {
        fontSize: size === 'sm' ? 14 : size === 'lg' ? 18 : 16,
        fontWeight: '600',
        };

        if (variant === 'primary' || variant === 'danger') {
        return {
            ...baseStyle,
            color: '#ffffff',
        };
        } else {
        return {
            ...baseStyle,
            color: '#374151',
        };
        }
    };

    return(

        <TouchableOpacity
            style={[getButtonStyle(),style]}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.8}
        
        >
            {loading && (
                <ActivityIndicator 
                size="small" 
                color={variant === 'secondary' ? '#4f46e5' : '#ffffff'} 
                style={styles.loader} 
                />
            )}

         <Text style={[getTextStyle(), textStyle]}>{title}</Text>
        </TouchableOpacity>    
        
    );

};

const styles = StyleSheet.create({
  loader: {
    marginRight: 8,
  },
});