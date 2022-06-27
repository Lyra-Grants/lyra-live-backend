import getLyraPositions from "../lyra/getLyraPositions/getLyraPositions";
import { Position, IPosition } from '../models/position'
import { Router } from 'express'
// import from '../controllers/positionController.ts'


const router = Router()

interface AccountsI {
    accounts: string[];
}

const accounts: string[] = ['fff', 'ggg']

const addPositions = async (req: Request, res: Response) => {
    for (let i = 0; i < accounts.length; i++) {
        const userPositions = await getLyraPositions([accounts[i]])
    
    }
}

export default addPositions;