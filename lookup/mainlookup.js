import React, { useEffect, useState } from 'react'

const host = 'https://wedei.herokuapp.com'
export function MainLookup(callback,props){
    // console.log(props)
    const {method,endpoint, data,token,csrf} = props
    // console.log(method,endpoint, data,token,csrf)
    let jsonData;
    if (data){
    jsonData = JSON.stringify(data)
    }
    const xhr = new XMLHttpRequest()
    const url = `${host}${endpoint}`
    xhr.responseType = "json"
    xhr.open(method, url)
    xhr.setRequestHeader("Content-Type", "application/json")
    if (token){
        xhr.setRequestHeader('Authorization', `Token ${token}`)
    }
    if (csrf){
    // console.log(csrf.csrf)
    xhr.setRequestHeader("X-CSRFToken", csrf)
    xhr.setRequestHeader("Referer", host)
    }
    xhr.onload = function() {
        var response = xhr.response
        var statusCode = xhr.status
        console.log(response , statusCode,29)
    if (xhr.status === 403){
        alert("You are not logged in. Please Login to Zebidar.")
    }else if (xhr.status === 404){
        alert("Page wasn't found.")
    }else if(xhr.status === 500){
        alert("There is an internal server error. Please try again later.")
    }
    callback(response, statusCode)
    }
    xhr.send(jsonData)
}