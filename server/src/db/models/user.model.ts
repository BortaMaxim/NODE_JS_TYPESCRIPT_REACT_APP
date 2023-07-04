import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {Optional} from "sequelize";
import {Role} from "./role.model";
import {UserRole} from "./userRole.model";
import {IUser} from "../../interfaces/models/User/IUser";


type UserCreationAttributes = Optional<IUser, 'name'>;


@Table({
    timestamps: true,
    paranoid: true,
    tableName: "users",
})
export class User extends Model<IUser, UserCreationAttributes> {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    email
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password
    @Column({
        type: DataType.ENUM('pending', 'active'),
        comment: 'pending',
        allowNull: true
    })
    status
    @Column({
        type: DataType.STRING,
        allowNull: true,
        comment: 'default.jpg'
    })
    avatar
    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    confirmedCode
    @BelongsToMany(() => Role, () => UserRole)
    roles: Role[]
}