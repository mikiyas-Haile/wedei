import React, {useState, useEffect} from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {faShareAlt, faThumbsUp,faHeart, faThumbsDown} from '@fortawesome/free-regular-svg-icons';

export function EmptyLike(props) {
    return <FontAwesomeIcon icon={faHeart} size={props.size}/>
}