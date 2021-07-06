import * as admin from 'firebase-admin'
import  Boom from "@hapi/boom";

export const verifyUserToken = async (token, user_id) => {
    const user = await admin.auth().verifyIdToken(token);
    if(user.user_id !== user_id) throw Boom.unauthorized('Users can not perform action!')
    console.log('user verified');
    return user.user_id;
}
export const verifyUserTokenForAction = async (reqToken) => {
    const token = reqToken.headers.authtoken;
    const user = await admin.auth().verifyIdToken(token);
    if(!user.user_id) throw Boom.unauthorized('Users does not exist!')
    console.log('user verified');
    return user.user_id;
}