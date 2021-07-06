import { db } from "../database";
import { verifyUserToken } from "../verifyUser";

export const getUserListingsRoute = {
    method: 'GET',
    path: '/api/user/{userId}/listings',
    handler: async (req, h) => {
        const token = req.headers.authtoken;
        const user_id = req.params.userId;
        await verifyUserToken(token, user_id)
        const { results } = await db.query(
            'SELECT * FROM listings WHERE user_id=?',
            [user_id]
        )
        console.log('return user listings');
            

        // console.log(results)
        // console.log('DONE getting user listings');
        return results;
    }
}