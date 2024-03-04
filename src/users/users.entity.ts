import { UUID } from "crypto";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id?: UUID;

    @Column({unique: true})
    email: string;

    @Column({nullable: false})
    password: string;

    
    @Column({nullable: false})
    firstName: string;

    @Column({nullable: true})
    lastName: string;

}