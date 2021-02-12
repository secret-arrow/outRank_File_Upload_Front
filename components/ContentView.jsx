"use client"
import {useState} from "react";

const ContentView = ({url}) => {
    
    return (
        <div className="w-full h-[100%]">
            <iframe src={url} className="w-full h-full" />
        </div>
    )
}

export default ContentView;