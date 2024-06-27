import { collection, addDoc } from 'firebase/firestore/lite';
import { User } from '../models/User';
import { Role } from '../models/Role';
import { db } from './DatabaseConnection'; 

async function addUsersToDatabase() {
const users: User[] = [
    {
        id: '1',
        firstName: 'Robert',
        lastName: 'Prawandowski',
        role: Role.Admin,
        login: 'admin',
        password: 'admin'
    },
    {
        id: '2',
        firstName: 'grzegorz',
        lastName: 'Developer',
        role: Role.Developer,
        login: 'soroko',
        password: 'elo'
    },
    {
        id: '3',
        firstName: 'czikita',
        lastName: 'DevOps',
        role: Role.DevOps,
        login: 'baobao',
        password: '1234'
    }
];



    const usersCollection = collection(db, 'users');

    for (const user of users) {
        try {
            await addDoc(usersCollection, user);
            console.log(`Added user: ${user.firstName} ${user.lastName}`);
        } catch (error) {
            console.error(`Error adding user ${user.firstName} ${user.lastName}:`, error);
        }
    }
}


export { addUsersToDatabase }