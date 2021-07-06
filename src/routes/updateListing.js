import { db } from "../database";
import { verifyUserTokenForAction } from "../verifyUser";

import  Boom from "@hapi/boom";

export const updateListingRoute = {
    method: 'POST',
    path: '/api/listings/{id}',
    handler: async (req, h) =>{
        const user_id = await verifyUserTokenForAction(req);
        const { id } = req.params;
        const { name, description, price } = req.payload;

        const { results } = await db.query(
            'SELECT * FROM listings WHERE id=? AND user_id=?',
            [id, user_id]
        );

        
        if(!results) throw Boom.illegal('Users can only update their record!')
        
        await db.query(
            `UPDATE listings
            SET name=?, description=?, price=? 
            WHERE id=? AND user_id=?
            `,
            [name, description, price, id, user_id]
        );
        

        return { id, name, description, price, views: results[0].views };
    }
}