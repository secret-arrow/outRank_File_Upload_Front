"use client"
import {useState} from "react";

const FileList = ({selected, fileList, setSelected}) => {
    return (
        <div>
            {fileList.map((item, index) => {
                return (
                    <div className={`p-2 ${selected == item.url && "bg-gray-300 border-b-[5px]"} border-gray-600 border-b-[2px] hover:bg-gray-400 cursor-pointer`} key={index} onClick={()=>setSelected(item)}>
                        <p className="text-xl pb-2 font-normal">{item}</p>
                    </div>
                );
            })}
        </div>
    )
}

export default FileList;