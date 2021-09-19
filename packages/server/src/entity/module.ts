import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Module extends BaseEntity {
	@PrimaryGeneratedColumn('increment')
	id: number

	@Column()
	moduleId: string

	@Column()
	botId: number

	@Column({ type: 'json', default: {} })
	config: any

	@Column({ default: false })
	active: boolean
}
