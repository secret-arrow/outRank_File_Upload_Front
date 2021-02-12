"use client"
import { useState , useEffect} from "react";
import axios from 'axios';
import FileList from "./FileList";
import ContentView from "./ContentView";

const serverURL = "http://188.34.206.205:5005";
// const serverURL = "http://127.0.0.1:7000";

const Container = () => {

    const [file, setFile] = useState(null);
    const [fileList, setFileList] = useState([]);
    const [url, setUrl] = useState("");
    const [walletID, setWalletID] = useState("");
    const [balance, setBalance] = useState("");
    const [state, setState] = useState("");

    useEffect(()=>{
        axios.get(`${serverURL}/get-info`)
            .then(res => {
                setWalletID(res.data.wallet_id);
                setBalance(res.data.balance);
                axios.get(`${serverURL}/all-files`)
                .then(res => {
                    let strList = res.data.split("\n");
                    let temp = strList.filter((item, index) => index < strList.length-1);
                    setFileList(temp);
                })
                .catch(err=> console.log(err));
            })
            .catch(err=> console.log(err));
    }, [url]);

    const handleFileChange = (event) => {
        if(fileList.filter(item => item.name == event.target.files[0].name).length){
            setState("Error : File with same name is already exist. Rename before deploy!");
            return;
        }
        setFile(event.target.files[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if(file == null){
            setState("Error : Select file to upload!");
            return;
        } 
        setState("uploading ...");
        const formData = new FormData();
        formData.append('file', file);
        axios.post(`${serverURL}/upload`, formData)
            .then((response) => {
                setUrl(response.data);
                setState("Uploaded successfully!");
                setFile(null);
            })
            .catch((error) => {
                console.error('Error uploading file:', error);
            });
        setState("");
    };

    return (
        <div className="bg-white text-black">
            <div className="px-5 w-[100%] xl:w-[80%] lg:w-[90%] lg:mx-auto mx-auto">
                <div className="w-[70%] mx-auto py-2">
                    <p className="text-2xl pt-4 text-center">Upload Files on ICP</p>
                    <div className="flex justify-around">
                        <form onSubmit={handleSubmit}>
                            <input type="file" className="w-full py-2" onChange={handleFileChange} />
                            <div className="flex py-2">
                                <button type="submit" className="border-gray-900 border-[1px] px-3 hover:bg-gray-200 click:bg-gray-100">Upload</button>
                            </div>
                        </form>
                        <div className="text-black">
                            <div className="flex py-2">
                                <p className="pr-2">wallet_ID</p>
                                <input className="border-gray-900 border-[1px]" value={walletID} readOnly></input>
                            </div>
                            <div className="flex py-2">
                                <p className="pr-2">Balance</p>
                                <input className="border-gray-900 border-[1px]" value={balance} readOnly></input>
                            </div>
                        </div>
                    </div>
                    <p className="text-md py-3 px-5">{state}</p>
                </div>
                <div className="flex h-[100vh] pb-5">
                    <div className="w-[25%] h-[100%] border-[2px] border-gray-900 overflow-y-auto">
                        <FileList selected={url} fileList={fileList} setSelected={setUrl}/>
                    </div>
                    <div className="w-[75%] h-[100%] border-[2px] border-gray-900">
                        <ContentView url={url}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Container;