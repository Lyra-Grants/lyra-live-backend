import getLyraPositions from "../lyra/getLyraPositions/getLyraPositions";
import { Position, IPosition } from '../models/position'
import userRouter from '../controllers/userController';
import positionRouter from '../controllers/positionController';
import { Response } from "express";
// import { addUser } from "../models/user";

const accountsArray: string[] = ['0x90C6577Fb57edF1921ae3F7F45dF7A31e46b9155', '0x23c5c19d2ad460b7cd1ea5d6a2274a3c53733238']
const DB_URL = 'http://localhost:4000'

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
    fetch(`${DB_URL}/`, getObj)
    .then((result: any) => answer = result)
    return answer
}

const res = await fetch('https://nodejs.org/api/documentation.json');
if (res.ok) {
  const data = await res.json();
  console.log(data);
}

const postFetchUser = (address: string, currentPnl: number) => {
     const postObj = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: {
                account: address,
                // ens,
                // avatar,
                // trades_count,
                // duration,
                // favorite_asset,
                pnl: currentPnl,
                // positions,
            }
        })
    }
    let answer: any
    fetch(`${DB_URL}/new`, postObj)
    .then((result: any) => answer = result)
    return answer
}

const putFetchUser = (address: string, currentPnl: number) => {
    const putObj = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: {
                account: address,
                // ens,
                // avatar,
                // trades_count,
                // duration,
                // favorite_asset,
                pnl: currentPnl,
                // positions,
            }
        })
    }
    let answer: any
    fetch(`${DB_URL}/update/${address}`, putObj)
    .then((result: any) => answer = result)
    return answer
}

const addUpdateUser = async (accounts: string[]) => {
    for (let i = 0; i < accounts.length; i++) {
        const userPositions = await getLyraPositions(accounts[i]);

        let pnl: number = 0;

        userPositions.map((position: IPosition) => {
            if(position.realizedPnl) pnl = pnl + position.realizedPnl
        });
        console.log("pnl =", pnl)
        // First, need to post user positions to the DB and store in positions (array)
        // Second, need to calculate pnl of all positions

        const userExists = await getFetchUser(accounts[i]);
        console.log("userExists =", userExists)
        if(!userExists.success) {
            // Need to replace the status 400 below to match the error message from not finding the user in the DB
            if(userExists.message === `status 400`) await postFetchUser(accounts[i], pnl)
            else console.log(userExists.message)
        }
        else if (userExists.success) await putFetchUser(accounts[i], pnl);
    }
}

export default addUpdateUser;



