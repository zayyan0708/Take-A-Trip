class Group{
    constructor(id,gname,cid,cFName,cLName,cemail,isOwner,isMember,isInvited,members){
        this.id = id;
        this.gname = gname;
        this.cid = cid;
        this.cFName = cFName;
        this.cLName = cLName;
        this.cemail = cemail;
        this.isOwner = isOwner;
        this.isMember = isMember;
        this.isInvited = isInvited; 
        this.members = members;
    }
}

export default Group;