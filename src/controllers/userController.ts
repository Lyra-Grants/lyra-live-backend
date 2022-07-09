// user controller
import { User, addUser } from '../models/user'
import { Request, Response, Router } from 'express'
import { apiErrorHandler } from '../handlers/errorHandler';

const userRouter = Router()

userRouter.route('/new').post(async (req: Request, res: Response) => {
    const {
        _id,
        account,
        ens,
        avatar,
        trades_count,
        duration,
        favorite_asset,
        pnl,
        positions,
    } = req.body

    try {
        const newUser = await addUser(  
            _id,
            account,
            ens,
            avatar,
            trades_count,
            duration,
            favorite_asset,
            pnl,
            positions,
        )

        res.json({"success": true, "message": null, "data": newUser});
    } catch (error) {
        apiErrorHandler(error, req, res, 'Add User failed.');
    }
})

userRouter.route('/').get((req, res) => {
    // using .find() without a paramter will match on all user instances
    User.find()
        .then(allUsers => res.json(allUsers))
        .catch(err => res.status(400).json('Error! ' + err))
})

userRouter.route('/delete/:id').delete((req, res) => {
    User.deleteOne({ _id: req.params.id })
        .then(success => res.json('Success! User deleted.'))
        .catch(err => res.status(400).json('Error! ' + err))
})

userRouter.route('/update/:id').put((req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body)
        .then(user => res.json('Success! User updated.'))
        .catch(err => res.status(400).json('Error! ' + err))
})

export default userRouter;