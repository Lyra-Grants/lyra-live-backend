import getLyraPositions from "../lyra/getLyraPositions/getLyraPositions";
// import { Position, IPosition } from '../models/position'
import userRouter from '../controllers/userController';
import positionRouter from '../controllers/positionController';
import { response } from "express";
// import { addUser } from "../models/user";

const accountsArray: string[] = ['fff', 'ggg']

const getFetchUser = (address: string) => {
    const getObj = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: {
                account: address
            }
        })
    }
    let answer: any
    fetch('/', getObj)
    .then(res => res.json())
    .then(result => answer = result)
    return answer
}

const postFetchUser = (address: string) => {
     const postObj = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: {
                account: address
                // ,
                // ens,
                // avatar,
                // trades_count,
                // duration,
                // favorite_asset,
                // pnl,
                // positions,
            }
        })
    }
    let answer: any
    fetch('/new', postObj)
    .then(res => res.json())
    .then(result => answer = result)
    return answer
}

const putFetchUser = (address: string) => {
    const putObj = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: {
                account: address
                // ,
                // ens,
                // avatar,
                // trades_count,
                // duration,
                // favorite_asset,
                // pnl,
                // positions,
            }
        })
    }
    let answer: any
    fetch(`/update/${address}`, putObj)
    .then(res => res.json())
    .then(result => answer = result)
    return answer
}

const addUpdateUser = async (accounts: string[]) => {
    for (let i = 0; i < accounts.length; i++) {
        const userPositions = await getLyraPositions([accounts[i]])

        // const pnl = userPositions.map(position => )

        // First, need to post user positions to the DB and store in positions (array)
        // Second, need to calculate pnl of all positions

        const userExists = await getFetchUser(accounts[i])
        if(!userExists.success) {
            // Need to replace the status 400 below to match the error message from not finding the user in the DB
            if(userExists.message === `status 400`) await postFetchUser(accounts[i])
            else console.log(userExists.message)
        }
        else if (userExists.success) await putFetchUser(accounts[i])

        
    }
}

export default addUpdateUser;



