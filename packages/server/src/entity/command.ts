import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Command extends BaseEntity {
	@PrimaryGeneratedColumn('increment')
	id: number

	@Column()
	name: string

	@Column({ type: 'json' })
	actions: JSON

	@Column({ type: 'json' })
	condition: JSON

	@Column({ default: true })
	active: boolean

	@Column()
	bot: number
}
