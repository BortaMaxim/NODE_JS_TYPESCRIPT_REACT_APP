import {BelongsToMany, Column, DataType, Model, PrimaryKey, Table} from "sequelize-typescript";
import {Optional} from "sequelize";
import {UserRole} from "./userRole.model";
import {User} from "./user.model";

interface RoleAttributes {
    role_name: any
}

type RoleCreationAttributes = Optional<RoleAttributes, 'role_name'>

@Table({
    timestamps: true,
    paranoid: true,
    tableName: "roles",
})
export class Role extends Model<RoleAttributes, RoleCreationAttributes> {
    @Column({
        type: DataType.ENUM('user', 'admin'),
        allowNull: false,
    })
    role_name: any
    @BelongsToMany(() => User, () => UserRole)
    users: User[]
}