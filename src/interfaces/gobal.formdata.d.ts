

declare global {
    interface FormDataValue  {
        uri: string;
        name: string;
        type: string
    }

    interface FormDataNative extends FormData {
        append: 
    }
}