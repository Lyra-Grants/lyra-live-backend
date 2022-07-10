// user controller
import { User, addUser } from '../models/user'
import { Request, Response, NextFunction, Router } from 'express'
import { apiErrorHandler } from '../handlers/errorHandler';

const userRouter = Router()

userRouter.route('/new').post(async (req: Request, res: Response, next: NextFunction) => {
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

        // // First Validate The Request
        // const { error } = validate(req.body);
        // if (error) {
        //     return res.status(400).send(error.details[0].message);
        // }
    
        // // Check if this user already exisits
        // let user = await User.findOne({ email: req.body.email });
        // if (user) {
        //     return res.status(400).send('That user already exisits!');
        // } else {
        //     // Insert the new user if they do not exist yet
        //     user = new User({
        //         name: req.body.name,
        //         email: req.body.email,
        //         password: req.body.password
        //     });
        //     await user.save();
        //     res.send(user);
        // }

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

userRouter.route('/').get((req: Request, res: Response, next: NextFunction) => {
    // using .find() without a paramter will match on all user instances
    User.find()
        .then(allUsers => res.json(allUsers))
        .catch(err => res.status(400).json('Error! ' + err))
})

userRouter.route('/delete/:id').delete((req: Request, res: Response, next: NextFunction) => {
    User.deleteOne({ _id: req.params.id })
        .then(success => res.json('Success! User deleted.'))
        .catch(err => res.status(400).json('Error! ' + err))
})

userRouter.route('/update/:id').put((req: Request, res: Response, next: NextFunction) => {
    User.findByIdAndUpdate(req.params.id, req.body)
        .then(user => res.json('Success! User updated.'))
        .catch(err => res.status(400).json('Error! ' + err))
})

export default userRouter;