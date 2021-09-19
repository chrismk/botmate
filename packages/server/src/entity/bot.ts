import { Entity, Column, PrimaryColumn, BaseEntity, OneToMany } from 'typeorm'
import { Module } from './module'

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

	@OneToMany((type) => Module, (module) => module.id)
	modules: Module[]
}
