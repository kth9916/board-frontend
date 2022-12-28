class BoardRdo{
    _id : string;
    title : string;
    userName : string;
    content : string;
    boardKind : number;
    registeredDate : string;

    constructor(_id: string, title: string, userName : string, content: string, boardKind: number, registeredDate: string ) {
        this._id = _id;
        this.title = title;
        this.userName = userName;
        this.content = content;
        this.boardKind = boardKind;
        this.registeredDate = registeredDate;
    }
}

export default BoardRdo;
