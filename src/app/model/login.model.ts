export class Login {
    id: number;
    name: string;
    username: string;
    email: string;
    password: string;
    accessToken: string; // Add this property
    balance: number; // Add this property
    accountType: string; // Add this property
    accountNumber: string; // Add this property
    transactionCode: string; // Add this property

    constructor(
        id: number, 
        name: string, 
        username: string, 
        email: string, 
        password: string, 
        accessToken: string, 
        balance: number, 
        accountType: string, 
        accountNumber: string,
        transactionCode: string) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.accessToken = accessToken;
        this.balance = balance;
        this.accountType = accountType;
        this.accountNumber = accountNumber;
        this.transactionCode = transactionCode;
    }
}
