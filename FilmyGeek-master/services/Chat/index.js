import firestore from '@react-native-firebase/firestore';


export const getAdminChat = async (id) => {
    return firestore().collection('chats')
        .doc(id).collection('messages')
        .orderBy('timestamp', 'asc')
}

export const sendAdminMessage = (id, message) => {
    firestore().collection('chats')
        .doc(id).get()
        .then(doc =>{
            if(!doc.exists){
                firestore().collection('chats').doc(id).set({name:message.displayName})
                .then(doc=>{
                    return firestore().collection('chats').doc(id).collection('messages').add({
                        timestamp: firestore.FieldValue.serverTimestamp(),
                        ...message
                    })
                })
                .catch(err=>{
                    return err
                })
            } else{
                return firestore().collection('chats').doc(id).collection('messages').add({
                    timestamp: firestore.FieldValue.serverTimestamp(),
                    ...message
                })
            }
        })
        .catch(err=>{
            return err
        })
    
}
