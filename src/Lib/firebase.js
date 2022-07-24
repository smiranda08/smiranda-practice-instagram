/* eslint-disable no-plusplus */
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import {
    getFirestore,
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    updateDoc,
} from 'firebase/firestore'

/**
 * Initialize firebase
 */

console.log('Say Hello from firebase')

const firebaseConfig = {
    apiKey: 'AIzaSyD4pYFqgzIQyiN6mTrlx2f7ZMVuB-r8dV8',
    authDomain: 'my-instagram-a8f12.firebaseapp.com',
    projectId: 'my-instagram-a8f12',
    storageBucket: 'my-instagram-a8f12.appspot.com',
    messagingSenderId: '289159555885',
    appId: '1:289159555885:web:c394dd9704336fdb4bc1a4',
    measurementId: 'G-1D866DQQLR',
}
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const usersRef = collection(db, 'users')
const photosRef = collection(db, 'photos')
const auth = getAuth(app)

// Create user
const addUser = async (user) => {
    console.log('Adding user')
    await addDoc(usersRef, user)
}

// Delete user
const deleteUser = async (userId) => {
    const userDoc = doc(db, 'users', userId)
    await deleteDoc(userDoc)
}

// Add photo
const addPhoto = async (photo) => {
    console.log('Adding photo')
    await addDoc(photosRef, photo)
}

// Delete photo
const deletePhoto = async (photo) => {
    const photoDoc = doc(db, 'photos', photo.photoId)
    await deleteDoc(photoDoc)
}

// Get user

// Update user

/**
 * Seed initial users:
 */

const users = [
    {
        userId: 'cE7BOCnCsyPDHTyVH67OKteRF0Q2',
        username: 'jdoe',
        fullName: 'John Doe',
        emailAddress: 'johndoe@gmail.com',
        following: ['2'],
        followers: ['2', '3', '4'],
        dateCreated: Date.now(),
    },
    {
        userId: '2',
        username: 'raphael',
        fullName: 'Raffaello Sanzio da Urbino',
        emailAddress: 'raphael@sanzio.com',
        following: [],
        followers: ['cE7BOCnCsyPDHTyVH67OKteRF0Q2'],
        dateCreated: Date.now(),
    },
    {
        userId: '3',
        username: 'dali',
        fullName: 'Salvador Dalí',
        emailAddress: 'salvador@dali.com',
        following: [],
        followers: ['cE7BOCnCsyPDHTyVH67OKteRF0Q2'],
        dateCreated: Date.now(),
    },
    {
        userId: '4',
        username: 'orwell',
        fullName: 'George Orwell',
        emailAddress: 'george@orwell.com',
        following: [],
        followers: ['cE7BOCnCsyPDHTyVH67OKteRF0Q2'],
        dateCreated: Date.now(),
    },
]
// users.forEach((user) => addUser(user))

/**
 * Seed initial photos:
 */

const seedPhotos = () => {
    for (let i = 1; i <= 5; ++i) {
        addPhoto({
            photoId: i,
            userId: 'bXS1lGPSCKRIqBhl8ua0dnMJw1a2',
            imageSrc: `/images/users/dean96/${i}.jpg`,
            caption: 'insert caption',
            likes: [],
            comments: [],
            userLatitude: '40.7128°',
            userLongitude: '74.0060°',
            dateCreated: Date.now(),
        })
    }
}

//seedPhotos()

export { app as firebase, db, addUser, auth }
