export class User {

    /////////////////////// Property ////////////////////////

    public username: string;
    public email: string;
    public password: string;
    public confirmPassword: string;
    public firstname: string;
    public lastname: string;

    ////////////////////// Constructor //////////////////////

    constructor
    (
        username: string = "",
        email: string = "",
        password: string = "",
        confirmPassword: string = "",
        firstname: string = "",
        lastname: string = "",
    )
    {
        this.username = username;
        this.email = email;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.firstname = firstname;
        this.lastname = lastname;
    }

    //////////////////////// Methods ////////////////////////

}