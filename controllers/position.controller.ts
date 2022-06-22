// position controller
import { Position } from '../models/position.model'
import { Router } from 'express'

const router = Router()

router.route('/new').post((req, res) => {
    const newPosition = new Position(req.body)

    newPosition.save()
        .then(position => res.json(position))
        .catch(err => res.status(400).json("Error! " + err))
})

router.route('/').get((req, res) => {
    // using .find() without a paramter will match on all position instances
    Position.find()
        .then(allPositions => res.json(allPositions))
        .catch(err => res.status(400).json('Error! ' + err))
})

router.route('/delete/:id').delete((req, res) => {
    Position.deleteOne({ _id: req.params.id })
        .then(success => res.json('Success! Position deleted.'))
        .catch(err => res.status(400).json('Error! ' + err))
})

router.route('/update/:id').put((req, res) => {
    Position.findByIdAndUpdate(req.params.id, req.body)
        .then(position => res.json('Success! Position updated.'))
        .catch(err => res.status(400).json('Error! ' + err))
})

module.exports = router