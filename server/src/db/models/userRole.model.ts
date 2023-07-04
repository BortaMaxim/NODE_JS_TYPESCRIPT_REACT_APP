import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "./user.model";
import {Role} from "./role.model";

@Table({
    tableName: 'user_role',
    paranoid: true,
})
export class UserRole extends Model {
    @ForeignKey(() => User)
    @Column({
        type: DataType.SMALLINT.UNSIGNED,
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    user_id: number
    @ForeignKey(() => Role)
    @Column({
        type: DataType.SMALLINT.UNSIGNED,
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    role_id: number
}