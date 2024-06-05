import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, UpdateDateColumn } from 'typeorm'

import { BaseEntity } from '@domain/shared/entities/base.entity'
import { ICreationAudit, IDeletionAudit, IModificationAudit } from '@domain/shared/interfaces/audit.interface'
import { Role } from './role.entity'

@Entity('users')
export class User extends BaseEntity implements ICreationAudit, IModificationAudit, IDeletionAudit {
  @Column()
  name: string

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @Column({ nullable: true })
  securityStamp: string

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'user_roles',
    joinColumn: { name: 'userId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'roleId', referencedColumnName: 'id' }
  })
  roles: Role[]

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
