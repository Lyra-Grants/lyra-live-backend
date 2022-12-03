// position controller
import { Position, addPosition } from '../models/livePosition'
import { Request, Response, NextFunction, Router } from 'express'
import { apiErrorHandler } from '../handlers/errorHandler';

import getLyraPositions from "../lyra/getLyraPositions/getLyraPositions";

const positionRouter = Router()

/**
  * Add Position Function
  */
 positionRouter.route('/new').post(async (req: Request, res: Response, next: NextFunction) => {
    const {
        _id,
        dataSource,
        positionId,
        owner,
        size,
        isOpen,
        isCall,
        isLong,
        isSettled,
        isBaseCollateral,
        numTrades,
        avgCostPerOption,
        pricePerOption,
        realizedPnl,
        realizedPnlPercent,
        unrealizedPnl,
        unrealizedPnlPercent,
    } = req.body

    try {
        const newPosition = await addPosition(  
            _id,
            dataSource,
            positionId,
            owner,
            size,
            isOpen,
            isCall,
            isLong,
            isSettled,
            isBaseCollateral,
            numTrades,
            avgCostPerOption,
            pricePerOption,
            realizedPnl,
            realizedPnlPercent,
            unrealizedPnl,
            unrealizedPnlPercent
        )

        res.json({"success": true, "message": null, "data": newPosition});
    } catch (error) {
        apiErrorHandler(error, req, res, 'Add Position failed.');
    }
})

 positionRouter.route('/').get((req: Request, res: Response, next: NextFunction) => {
    // using .find() without a paramter will match on all position instances
    Position.find()
        .then(allPositions => res.json(allPositions))
        .catch(err => res.status(400).json('Error! ' + err))
})

 positionRouter.route('/delete/:id').delete((req: Request, res: Response, next: NextFunction) => {
    Position.deleteOne({ _id: req.params.id })
        .then(success => res.json('Success! Position deleted.'))
        .catch(err => res.status(400).json('Error! ' + err))
})

 positionRouter.route('/update/:id').put((req: Request, res: Response, next: NextFunction) => {
    Position.findByIdAndUpdate(req.params.id, req.body)
        .then(position => res.json('Success! Position updated.'))
        .catch(err => res.status(400).json('Error! ' + err))
})

export default positionRouter;