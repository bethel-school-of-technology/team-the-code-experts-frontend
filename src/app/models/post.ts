export class Post {
    messageId: number;
    appUser: {
        id: number
        firstName: string;
        lastName: string;
        email: string;
        username: string;
    }
    dateStamp: string;
    messageTitle: string;
    messageBody: string;
    responses: [];
    votes: [];
    flags: [];
}
