interface Address{
    name: string,
    email: string
}

export interface IMessage{
    to: Address,
    from: Address,
    subject: string,
    body: string
}

export interface IMailProvider{
    sendMail(message: IMessage): Promise<void>
}