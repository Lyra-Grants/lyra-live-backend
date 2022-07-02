// user controller
import { User } from '../models/user'
import { Router } from 'express'

const userRouter = Router()

userRouter.route('/new').post((req, res) => {
    const newUser = new User(req.body)

    newUser.save()
        .then(user => res.json(user))
        .catch(err => res.status(400).json("Error! " + err))
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