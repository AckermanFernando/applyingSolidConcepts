import { IUsersRepository } from "../../repositories/IUserRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";
import { User } from "../../entities/User";

export class CreateUserUseCase{
    constructor(private usersRepository: IUsersRepository){}

    async execute(data: ICreateUserRequestDTO){
        const userAlredyExist = await this.usersRepository.findByEmail(data.email)

        if(userAlredyExist){
            throw new Error('User Alredy exists!!!')
        }

        const user = new User(data)

        await this.usersRepository.save(user)
    }
}