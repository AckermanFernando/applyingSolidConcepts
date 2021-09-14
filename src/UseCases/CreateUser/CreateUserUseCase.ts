import { IUsersRepository } from "../../repositories/IUserRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";
import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvider";

export class CreateUserUseCase{
    constructor(private usersRepository: IUsersRepository, private mailProvider: IMailProvider){}

    async execute(data: ICreateUserRequestDTO){
        const userAlredyExist = await this.usersRepository.findByEmail(data.email)

        if(userAlredyExist){
            throw new Error('User Alredy exists!!!')
        }

        const user = new User(data)

        await this.usersRepository.save(user)

        await this.mailProvider.sendMail({
            to:{
                name: data.name,
                email: data.email
            },
            from: {
                name: 'Equipe do meu App',
                email: 'equipe@meuapp.com'
            },
            subject: 'Seja bem vindo',
            body: '<p>Você já pode fazer login na plataforma.</p>'
        })
    }
}