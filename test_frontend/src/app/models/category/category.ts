export class Category {

    /////////////////////// Property ////////////////////////

    public title: string;
    public description: string;
    public createdAt: Date;
    public updatedAt: Date;

    ////////////////////// Constructor //////////////////////

    constructor
    (
        title: string = "",
        description: string = "",
        createdAt: Date,
        updatedAt: Date,
    )
    {
        this.title = title;
        this.description = description;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    //////////////////////// Methods ////////////////////////

}