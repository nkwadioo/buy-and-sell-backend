import {v4 as uuid} from 'uuid';
import { db } from '../database';
import { verifyUserTokenForAction } from '../verifyUser';

export const createNewListingRoute = {
    method: 'POST',
    path: '/api/listings',
    handler: async (req, h) => {
        const token = req.headers.authtoken;
        const user_id = await verifyUserTokenForAction(token)
        const id = uuid();
        const {name = '', description = '', price = 0} = req.payload;
        const views = 0;

        await db.query(
            `INSERT INTO listings (id, name, description, price, user_id, views)
                VALUES(?,?,?,?,?,?)
            `,
            [id, name, description, price, user_id, views]
        );
        console.log(`User: ${user_id} => listing inserted`)
        return {id, name, description, price, user_id, views};
    }
}