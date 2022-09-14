import Router from 'next/router';
import { useEffect, useState, useRef } from 'react';
import { LIKE_POST, UNLIKE_POST } from '../../pages/api/mutations';
import { likedByUsers } from '../../ts/types';
import { userProfileAtom } from '../../lib/globalAtoms';
import { useAtomValue } from 'jotai';
import { useMutation } from '@apollo/client';

export const HandlePostLikeState = (
    { likedBy, _id }: { likedBy: likedByUsers[], _id: string }
) => {
    // handling optimistic updates through react state instead of apollo
    const [isLiked, setIsLiked] = useState(false)
    const isLikedRef = useRef(false)
    isLikedRef.current = isLiked;
    // mutations 
    const [likePost] = useMutation(LIKE_POST)
    const [unlikePost] = useMutation(UNLIKE_POST)
    const userProfile = useAtomValue(userProfileAtom)

    useEffect(() => {
        const isCurrentlyLiked = !!likedBy
            .find((user: likedByUsers) => user._id === userProfile?._id)

        if (isCurrentlyLiked) {
            setIsLiked(true)
        } else {
            setIsLiked(false)
        }

        const handleWindowUnload = () => {
            if (isLikedRef.current) {
                likePost({ variables: { postId: _id } })
            } else {
                unlikePost({ variables: { postId: _id } })
            }
        }
        window.addEventListener('beforeunload', handleWindowUnload)

    }, [_id, likePost, likedBy, unlikePost, userProfile])

    return { isLiked, setIsLiked }
}