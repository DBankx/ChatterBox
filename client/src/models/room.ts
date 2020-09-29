
export interface IMessage{
    id: string;
    body: string;
    createdAt: string;
    username: string;
}

export interface IRoom{
    id: string;
    about: string;
    title: string;
    createdAt: string;
    username: string;
    messages: IMessage[]
}

