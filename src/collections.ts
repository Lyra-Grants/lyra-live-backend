import { User, blankUser } from './models/user';
import { IUser } from './interfaces'
import { connectDB } from './index'
import Logging from './library/Logging';

const dropCollection = async () => {

    await connectDB().then(async (mongoose) => {
    try {
            const dropUser = await User.collection.drop();
            Logging.info('Dropping User collection:');
            Logging.info(dropUser)

            // const collections = await mongoose.connection.collection('User')
            // Logging.info('Database collections:');
            // Logging.info(collections)

        } catch (err) {
            console.log('viewCollections error' + err);
        } finally {
            mongoose.connection.close();
            Logging.info('Disconnected from mongoDB.');
        }
    })

}

dropCollection();
