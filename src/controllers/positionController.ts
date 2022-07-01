// position controller
import { Position, IPosition } from '../models/position'
import { Request, Response, Router } from 'express'

import getLyraPositions from "../lyra/getLyraPositions/getLyraPositions";

const router = Router()

router.route('/new').post((req: Request, res: Response) => {
    const newPosition = new Position(req.body)

    newPosition.save()
        .then(position => res.json(position))
        .catch(err => res.status(400).json("Error! " + err))
})

// interface AccountsI {
//     accounts: string[];
// }

// const accounts: string[] = ['0xfff', '0xggg']

// const addPositions = async (req: Request, res: Response) => {
//     for (let i = 0; i < accounts.length; i++) {
//         const userPositions = await getLyraPositions([accounts[i]])
    
//     }
// }






router.route('/').get((req: Request, res: Response) => {
    // using .find() without a paramter will match on all position instances
    Position.find()
        .then(allPositions => res.json(allPositions))
        .catch(err => res.status(400).json('Error! ' + err))
})

router.route('/delete/:id').delete((req: Request, res: Response) => {
    Position.deleteOne({ _id: req.params.id })
        .then(success => res.json('Success! Position deleted.'))
        .catch(err => res.status(400).json('Error! ' + err))
})

router.route('/update/:id').put((req: Request, res: Response) => {
    Position.findByIdAndUpdate(req.params.id, req.body)
        .then(position => res.json('Success! Position updated.'))
        .catch(err => res.status(400).json('Error! ' + err))
})

module.exports = router