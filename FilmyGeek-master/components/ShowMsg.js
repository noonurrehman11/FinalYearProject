import { Platform, ToastAndroid ,AlertIOS} from "react-native";

export const showmsg = msg => {
    if (Platform.OS === 'android') {
        ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
        AlertIOS.alert(msg);
    }
};