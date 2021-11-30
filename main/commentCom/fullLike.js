import React, {useState, useEffect} from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {faShareAlt, faThumbsUp,faHeart, faThumbsDown} from '@fortawesome/free-solid-svg-icons';

export function FullLike(props) {
    return <FontAwesomeIcon color={'#fe2c55'} icon={faHeart} size={props.size}/>
}