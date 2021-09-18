import { Entity, Column, PrimaryColumn, BaseEntity } from 'typeorm'

@Entity()
export class Bot extends BaseEntity {
	@Column({ primary: true, unique: true })
	id: number

	@Column()
	token: string

	@Column()
	name: string

	@Column({ default: 0 })
	status: number
}
