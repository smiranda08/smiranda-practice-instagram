import {
    collection,
    getDocs,
    query,
    where,
    limit,
    updateDoc,
    arrayUnion,
    arrayRemove,
} from 'firebase/firestore'
import { firebase, db } from '../Lib/firebase'
import { doc, getDoc } from 'firebase/firestore'

export async function doesUsernameExist(username) {
    const q = query(collection(db, 'users'), where('username', '==', username))
    const querySnapshot = await getDocs(q)
    return querySnapshot.size > 0
}

export async function getUserByUsername(username) {
    const q = query(collection(db, 'users'), where('username', '==', username))
    const querySnapshot = await getDocs(q)
    if (querySnapshot.size > 0) {
        const userDoc = querySnapshot.docs[0]
        return {
            ...userDoc.data(),
            docID: userDoc.id,
        }
    } else {
        return null
    }
}

export async function getUserProfileInfo(uid) {
    const q = query(collection(db, 'users'), where('userId', '==', uid))
    const querySnapshot = await getDocs(q)
    let userDoc = null
    if (querySnapshot.empty) {
        console.log('user does not exist...')
        return null
    } else {
        console.log('found user!')
        userDoc = querySnapshot.docs.map((doc) => {
            return doc.data()
        })
        return userDoc[0]
    }
}

export async function getSuggestedProfiles(userId, following) {
    const usersRef = collection(db, 'users')
    const q = query(
        usersRef,
        where('userId', 'not-in', [...following, userId]),
        limit(10)
    )
    const result = await getDocs(q)
    const docsArray = result.docs.map((doc) => ({
        ...doc.data(),
        docID: doc.id,
    }))
    // console.log(docsArray)
    return docsArray
}

// TODO
/** TURN BOTH THE FOLLOWING FUNCTIONS INTO TOGGLE FUNCTIONS SO THAT THEY CAN BE CALLED IN THE PROFILE PAGES
 * AS WELL TO FOLLOW/UNFOLLOW PEOPLE
 */

/**
 * @description Updates the following array of the current user to include the target userID
 * @param {string} targetID
 * @param {string} sourceDocID
 */
export const followUserForwards = async (targetID, sourceDocID) => {
    // console.log(targetID, sourceDocID, sourceData)
    await updateDoc(doc(db, 'users', sourceDocID), {
        following: arrayUnion(targetID),
    })
}

/**
 * @description Updates the followers array of the user to be followed, to include the userID of the
 * currentUser
 * @param {string} sourceID
 * @param {string} targetDocID
 */
export const followUserBackwards = async (sourceID, targetDocID) => {
    await updateDoc(doc(db, 'users', targetDocID), {
        followers: arrayUnion(sourceID),
    })
}

export const unfollowForwards = async (targetID, sourceDocID) => {
    await updateDoc(doc(db, 'users', sourceDocID), {
        following: arrayRemove(targetID),
    })
}

export const unfollowBackwards = async (sourceID, targetDocID) => {
    await updateDoc(doc(db, 'users', targetDocID), {
        followers: arrayRemove(sourceID),
    })
}

// for each photo in the photos collection, need to check whether the userID of photo is in following
// if so, then this photo is included

export const getPhotos = async (following, currentUserID) => {
    const querySnapshot = await getDocs(
        query(collection(db, 'photos'), where('userId', 'in', following))
    )
    const photos = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        docID: doc.id,
    }))
    /** THE FORMAT THAT THE PHOTOS WERE RETURNED IN ISN'T THAT GREAT
     *  IDEALLY WE NEED TO KNOW THE USERNAME OF THE UPLOADER, WHETHER THE CURRENTUSER LIKED THE PHOTO,
     *  AND THE REST OF THE DETAILS OF THE PHOTO, TO CONSTRUCT OUR TIMELINE PHOTO COMPONENT
     *  THE FOLLOWING FUNCTION RETURNS A PHOTO OBJECT WITH THESE DETAILS NICELY INCORPORATED
     */

    const nicePhotos = await Promise.all(
        photos.map(async (photo) => {
            // check whether the current user has liked this pphoto
            let liked = false
            if (photo.likes.includes(currentUserID)) {
                liked = true
            }
            // get the username of the uploader
            const uploaderProfile = await getUserProfileInfo(photo.userId)
            const uploader = uploaderProfile.username

            // return the structured object
            return { uploader, liked, ...photo }
        })
    )
    // console.log(nicePhotos)
    return nicePhotos
}

export const getProfilePhotos = async (userId) => {
    console.log('firebae function userID', userId)
    const querySnapshot = await getDocs(
        query(collection(db, 'photos'), where('userId', '==', userId))
    )
    const photos = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        docID: doc.id,
    }))

    const nicePhotos = await Promise.all(
        photos.map(async (photo) => {
            const uploaderProfile = await getUserProfileInfo(photo.userId)
            const uploader = uploaderProfile.username
            return { uploader, ...photo }
        })
    )
    console.log(nicePhotos)

    return nicePhotos
}

const toggleLike = async (docID, currentUID, isLiked) => {
    await updateDoc(doc(db, 'photos', docID), {
        likes: isLiked ? arrayRemove(currentUID) : arrayUnion(currentUID),
        liked: !isLiked,
    })
}

export const addCommentFirebase = async (docID, newComment, username) => {
    console.log('adding comment to firebase')
    console.log({ comment: newComment, displayName: username }, docID)
    await updateDoc(doc(db, 'photos', docID), {
        comments: arrayUnion({ comment: newComment, displayName: username }),
    })
}
