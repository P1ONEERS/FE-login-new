export class Login {
    id: number;
    name: string;
    username: string;
    email: string;
    password: string;
    accessToken: string; // Add this property

    constructor(id: number, name: string, username: string, email: string, password: string, accessToken: string) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.accessToken = accessToken;
    }
}
