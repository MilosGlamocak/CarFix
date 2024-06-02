import {Account, Avatars, Databases, ID, Client, Query} from 'appwrite';
import { useAuth, useItems } from '../src/store';



export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    projectId: '6629362549dce7726aa3',
    platform: 'com.libertylockbox.milos',
    databaseId: '663a5010002b1c184dc9',
    userCollectionId: '663a50210024aacb9fa3',
    itemCollectionId: '663a503a000b1ce8e73d',
    carFixItemCollectionId: '664c4990001d8eb8cfd9'
}

const {endpoint, platform, projectId, databaseId, userCollectionId, itemCollectionId, storageId, carFixItemCollectionId} = config;

// Init your Web SDK
const client = new Client();

client
    .setEndpoint(endpoint) // Your Appwrite Endpoint
    .setProject(projectId) // Your project ID
;

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(ID.unique(), email, password, username) // try to create new acc

        if (!newAccount) throw Error; // if can't create

        const avatarUrl = avatars.getInitials(username) // if created new account, create an avatar

        await signIn(email, password)

        const newUser = await databases.createDocument(
            databaseId,
            userCollectionId, 
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl
            }
        )

        return newUser;

    } catch (error) {
        console.log(error);
        throw new Error(error)
    }
}

export const signIn = async (email, password) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);

        useAuth.setState({
            sessionId: session.$id,
        });
        checkForUser()
        
        return session
    } catch (error) {
        throw new Error(error)
    }
}

export const signOut = async () => {
    try {
        const signOut = await account.deleteSessions()

        // Clear sessionId and username using useAuth
        useAuth.setState({
            sessionId: null,
            username: null,
        });

        return signOut
    } catch (error) {
        throw new Error(error)
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();

        if (!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            databaseId,
            userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )
        if (!currentUser) throw Error;
        return currentUser.documents[0]
    } catch (error) {
        console.error(error);
    }
}

export const checkForUser = async () => {
    const user = await getCurrentUser();
    const accountGet = await account.get()
        // Set username using useAuth
        useAuth.setState({
            username: user.username,
            avatar: user.avatar,
            email: user.email,
            label: accountGet.labels[0],
            userId: user.$id
        });
        return accountGet
}


export const getAllItems = async () => {
    try {
        const currentItems = await databases.listDocuments(
            databaseId,
            itemCollectionId,
            []
        )
        if (!currentItems) throw Error;
        
        useItems.setState({
            items: [...currentItems.documents.reverse()]
        })
        return currentItems;
    } catch (error) {
        console.log(error)
    }
}

export const deleteItem = async (itemId) => {
    try {
        const item = await databases.deleteDocument(
            databaseId,
            itemCollectionId,
            itemId
        )
        return item

    } catch (error) {
        console.log(error)
    }
}

export const deleteCarItem = async (itemId) => {
    try {
        const item = await databases.deleteDocument(
            databaseId,
            carFixItemCollectionId,
            itemId
        )
        return item

    } catch (error) {
        console.log(error)
    }
}

export const createNewItem = async (name, image, price, chamber, quantity, userId, category) => {
    const newItem = await databases.createDocument(
        databaseId,
        itemCollectionId, 
        ID.unique(),
        {
            name,
            image,
            price,
            chamber,
            quantity,
            users: userId, 
            category
        }
    )

    return newItem;
}

export const createNewCarItem = async (name, imageUrl, price, quantity, userId, category, productCode) => {
    const newItem = await databases.createDocument(
        databaseId,
        carFixItemCollectionId, 
        ID.unique(),
        {
            name,
            imageUrl,
            price,
            quantity,
            users: userId, 
            category,
            productCode
        }
    )

    return newItem;
}

export const getAllCarItems = async () => {
    try {
        const currentItems = await databases.listDocuments(
            databaseId,
            carFixItemCollectionId,
            []
        )
        if (!currentItems) throw Error;
        
        useItems.setState({
            items: [...currentItems.documents.reverse()]
        })
        return currentItems;
    } catch (error) {
        console.log(error)
    }
}

export const getCarItemsCategory = async (category) => {
    try {
        const currentItems = await databases.listDocuments(
            databaseId,
            carFixItemCollectionId,
            [
                Query.equal('category', category)
            ]
        )
        if (!currentItems) throw Error;
        
        useItems.setState({
            items: [...currentItems.documents.reverse()]
        })
        return currentItems;
    } catch (error) {
        console.log(error)
    }
}


export const getCarItemsSearch = async (string) => {
    try {
        const currentItems = await databases.listDocuments(
            databaseId,
            carFixItemCollectionId,
            [
                Query.or([
                    Query.contains('productCode', string),
                    Query.contains('name', string)
                ])
            ]
        )
        if (!currentItems) throw Error;
        
        useItems.setState({
            items: [...currentItems.documents.reverse()]
        })
        return currentItems;
    } catch (error) {
        console.log(error)
    }
}

export const updateCarItem = async (itemId, productCode, price, quantity) => {
    try {
        const item = await databases.updateDocument(
            databaseId,
            carFixItemCollectionId,
            itemId,
            {productCode, price: parseFloat(price), quantity}
        )
        return item

    } catch (error) {
        console.log(error)
    }
}