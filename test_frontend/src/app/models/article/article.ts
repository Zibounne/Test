export class Article {

    /////////////////////// Property ////////////////////////

    public id: string;
    public title: string;
    public description: string;
    public createdAt: Date;
    public updatedAt: Date;
    public categoryIds: number[];

    ////////////////////// Constructor //////////////////////

    constructor
    (
        id: string = "",
        title: string = "",
        description: string = "",
        createdAt: Date,
        updatedAt: Date,
        categoryIds: number[]
    )
    {
        this.id = id;
        this.title = title;
        this.description = description;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.categoryIds = categoryIds;
    }

    //////////////////////// Methods ////////////////////////

}