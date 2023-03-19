class BoardRdo{
    _id : string;
    boardKind : number;
    content : string;
    registeredDate : string;
    title : string;
    userName : string;
    userId: string;
    image: null | File;

    constructor(_id: string, title: string, userName : string, content: string, boardKind: number, registeredDate: string, userId: string, image: null | File ) {
        this._id = _id;
        this.title = title;
        this.userName = userName;
        this.content = content;
        this.boardKind = boardKind;
        this.registeredDate = registeredDate;
        this.userId = userId;
        this.image = image;
    }
}

export default BoardRdo;

