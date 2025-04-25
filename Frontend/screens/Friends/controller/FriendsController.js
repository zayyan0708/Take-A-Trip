import { list } from "@firebase/storage";
import { localHost } from "../../../components/constants";
import People from "../model/PeopleModel";
import axios from "axios";
import { useState } from "react";

const allPeople = [
    // id,fname,lname,email,pic,isFriend,isSent,isRecieved
    new People('1','Alex','Dan','alexdan@gmail.com','https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',false,false,false),
    new People('2','Sarah','Fox','sarahfox@gmail.com','https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',true,false,false),
    new People('3','Alexa','Damie','alexadamie@gmail.com','https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',false,false,true),
    new People('4','John','Doe','johndoe@gmail.com','https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',false,true,false),
    new People('5','Rose','Yang','rosey@gmail.com','https://images.unsplash.com/photo-1605993439219-9d09d2020fa5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',true,false,false),
    new People('6','Harry','White','harrywh@gmail.com','https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',false,false,false),
];


function sendSelectedPeople(option){
    let sp = [];
    if(option=="AP"){
        for(p in allPeople){
            if(allPeople[p].isFriend==false&&allPeople[p].isRecieved==false&&allPeople[p].isSent==false){
                sp.push(allPeople[p]);    
            }
        }
    }
    else if(option=="MF"){
        for(p in allPeople){
            if(allPeople[p].isFriend==true){
                sp.push(allPeople[p]);    
            }
        }
    }
    else if(option=="S"){
        for(p in allPeople){
            if(allPeople[p].isSent==true){
                sp.push(allPeople[p]);    
            }
        }
    }
    else if(option=="R"){
        for(p in allPeople){
            if(allPeople[p].isRecieved==true){
                sp.push(allPeople[p]);    
            }
        }
    }
    return sp;
}

const getPeople = async () =>
{
const [listpeople,setlistpeople] = useState([]);
   const localHost="192.168.0.112:3300";
    userid=12;
    startdate="2023-01-03";
    enddate="2023-01-05";
    city="karachi";
    policy="privacy";
    console.log("check");
    const resp= await axios.get(`http://${localHost}/allpeople/${userid}/${startdate}/${enddate}/${policy}/${city}`).then(function (response){
        setlistpeople(response.data);

    });

    console.log(listpeople);
    return listpeople;
}

export {sendSelectedPeople,getPeople};