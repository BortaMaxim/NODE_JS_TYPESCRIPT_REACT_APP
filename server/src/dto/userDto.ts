import {IsDefined, IsEmail, IsEmpty, IsNotEmpty, Matches, MinLength} from "class-validator";
import {Expose} from "class-transformer";

export class UserDto {
    @IsDefined()
    @Expose()
    @IsNotEmpty({
        message: 'name is required'
    })
    name: String;
    @IsDefined()
    @Expose()
    @IsEmail()
    email: String;
    @IsDefined()
    @Expose()
    @MinLength(8)
    @Matches(RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/), {
        message: 'password must contains 0-9, a-z, A-Z !'
    })
    password: String;
}