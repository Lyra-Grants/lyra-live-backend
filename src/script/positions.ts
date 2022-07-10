import getLyraPositions from "../lyra/getLyraPositions/getLyraPositions";
import { Position, IPosition } from '../models/position'


interface AccountsI {
    accounts: string[];
}

const accounts: string[] = ['fff', 'ggg']

const addPositions = async () => {
    for (let i = 0; i < accounts.length; i++) {
        const userPositions = await getLyraPositions([accounts[i]])
    
    }
}

export default addPositions;