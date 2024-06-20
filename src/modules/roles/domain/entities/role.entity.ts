import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  PrimaryGeneratedColumn
} from 'typeorm'
import {
  IBaseEntity,
  ICreationAudit,
  IDeletionAudit,
  IModificationAudit
} from '@shared/utils/entity'

@Entity('roles')
export class RoleEntity
  extends BaseEntity
  implements IBaseEntity, ICreationAudit, IModificationAudit, IDeletionAudit
{
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  name: string

  @Column('simple-array', { nullable: true })
  permissions: string[]

  @Column({ default: true })
  isActive: boolean

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @Column({ nullable: true })
  creatorId: string

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  modifyAt: Date

  @Column({ nullable: true })
  modifier: string

  @Column({ default: false })
  isDeleted: boolean

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  deletedAt: Date

  @Column({ nullable: true })
  deletorId: string
}
