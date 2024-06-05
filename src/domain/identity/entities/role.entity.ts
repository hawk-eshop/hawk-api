import { Entity, Column, ManyToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm'

import { BaseEntity } from '@domain/shared/entities/base.entity'
import { ICreationAudit, IDeletionAudit, IModificationAudit } from '@domain/shared/interfaces/audit.interface'
import { User } from './user.entity'

@Entity('roles')
export class Role extends BaseEntity implements ICreationAudit, IModificationAudit, IDeletionAudit {
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
