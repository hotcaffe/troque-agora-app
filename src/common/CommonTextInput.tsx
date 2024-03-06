import { TextInput, TextInputProps } from "react-native-paper"
import { TextInputMask, TextInputMaskTypeProp } from "react-native-masked-text"
import { IconSource } from "react-native-paper/lib/typescript/components/Icon"
import { ThemeProp } from "react-native-paper/lib/typescript/types";
import { StyleProp, TextStyle } from "react-native";
import { UseFormSetValue } from "react-hook-form";
import { Dispatch, SetStateAction, useState } from "react";

interface ICommonTextInput extends TextInputProps{
    leftIcon?: IconSource;
    rightIcon?: IconSource;
    theme?: ThemeProp;
    mode?: "flat" | "outlined";
    label: string;
    style: StyleProp<TextStyle>;
    name: string;
    setValue?: UseFormSetValue<any>;
    setState?: Dispatch<SetStateAction<any>>;
    type?: TextInputMaskTypeProp;
}

export function CommonTextInput({leftIcon, rightIcon, theme, mode, label, style, name, setValue, setState, type, ...rest}: ICommonTextInput) {
    const [content, setContent] = useState<string>();

    if (type) {
        return (
            <TextInput 
                style={style} label={label} mode={mode} theme={theme} 
                left={leftIcon && <TextInput.Icon icon={leftIcon}/>} 
                right={rightIcon && <TextInput.Icon icon={rightIcon}/>} 
                value={content}
                render={(props: any) => (
                    <TextInputMask {...props} type={type} includeRawValueInChangeText
                        onChangeText={(_, rawText) => {
                            if(!rawText) return
                            if (setValue) {
                                rawText && setValue(name, rawText)
                            } else if (setState) {
                                rawText && setState(rawText);
                            }
                            setContent(rawText)
                        }}
                    />
                )}
                {...rest}
            />   
        )
    }

    return (
        <TextInput 
            style={style} label={label} mode={mode} theme={theme} 
            left={leftIcon && <TextInput.Icon icon={leftIcon}/>} 
            right={rightIcon && <TextInput.Icon icon={rightIcon}/>} 
            onChangeText={(text) => {
                if (setValue) {
                    setValue(name, text)
                } else if (setState) {
                    setState(text);
                }    
            }}
            {...rest}
        />
    )
}