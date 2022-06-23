import getPositions from "../lyra/getPositions/getPositions";
import { Position, IPosition } from '../models/position.model'
import { Router } from 'express'

const router = Router()

interface AccountsI {
    accounts: string[];
}

const accounts: string[] = ['fff', 'ggg']

const UpdatePositions = async () => {
    for (let i = 0; i < accounts.length; i++) {
        const userPositions = getPositions([accounts[i]])
        
    //   tokenIndex++
    }
}

export default UpdatePositions;
