import { db } from "../database";
import { verifyUserTokenForAction } from "../verifyUser";

export const deleteListingRoute = {
    method: 'DELETE',
    path: '/api/listings/{id}',
    handler: async (req, h) =>{
        const { id } = req.params;
        const user_id = await verifyUserTokenForAction(req)
        // const { name, description, price } = req.payload;
        // const userId = '12345';
        await db.query(
            `DELETE FROM listings
            WHERE id=? AND user_id=?`,
            [id, user_id]
        );
        console.log(`removed item: ${id} for user: ${user_id}`)
        return {message: 'success'}
    }
}