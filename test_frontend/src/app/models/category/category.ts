export class Category {

    /////////////////////// Property ////////////////////////

    public id: string;
    public title: string;
    public description: string;
    public createdAt: Date;
    public updatedAt: Date;

    ////////////////////// Constructor //////////////////////

    constructor
    (
        id: string = "",
        title: string = "",
        description: string = "",
        createdAt: Date,
        updatedAt: Date,
    )
    {
        this.id = id;
        this.title = title;
        this.description = description;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    //////////////////////// Methods ////////////////////////

}