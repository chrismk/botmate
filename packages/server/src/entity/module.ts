import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Module extends BaseEntity {
	@PrimaryGeneratedColumn('increment')
	id: number

	@Column()
	modId: number

	@Column()
	botId: number

	@Column({ type: 'json' })
	config: any

	@Column({ default: false })
	active: boolean
}
