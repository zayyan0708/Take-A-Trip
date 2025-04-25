import GMembers from "../model/GroupMember";
import Group from "../model/GroupModel";


const allGroups = [
    // constructor(id,gname,cFName,cLName,cemail,isOwner,isMember,isInvited,members)
    // constructor(id,fname,lname,email,pic)
    new Group('1',"Let's Go",'2',"Sarah","Fox","sarahfox@gmail.com",false,false,true,[
        new GMembers('1','Alex','Dan','alexdan@gmail.com','https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'),
        new GMembers('4','John','Doe','johndoe@gmail.com','https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'),
    ]
    ),
    new Group('1',"Travellerz",'5',"Rose","Yang","rosey@gmail.com",false,true,false,[
        new GMembers('6','Harry','White','harrywh@gmail.com','https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'),
        new GMembers('3','Alexa','Damie','alexadamie@gmail.com','https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80')
    ]
    ),
];

function sendSelectedGroup(option){
    if(option=='I'){
        let sg = [];
        for(i in allGroups){
            if(allGroups[i].isInvited==true){
                sg.push(allGroups[i]);
            }
        }
        return sg;
    }
    else{
        for(g in allGroups){
            if(allGroups[g].isOwner==true&&option=='O'){
                return allGroups[g];
            }
            else if(allGroups[g].isMember==true&&option=='M'){
                return allGroups[g];
            }
        }
        let f = [];
        return f;
    }
}
export default sendSelectedGroup;