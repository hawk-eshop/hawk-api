import { Entity, Column, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn } from 'typeorm'

import { BaseEntity, ICreationAudit, IDeletionAudit, IModificationAudit } from '@shared/utils/entity'
import { RoleEntity } from '@modules/roles/domain/entities/role.entity'

@Entity('users')
export class UserEntity extends BaseEntity implements ICreationAudit, IModificationAudit, IDeletionAudit {
  @Column()
  name: string

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @Column({ nullable: true })
  securityStamp: string

  @ManyToMany(() => RoleEntity, { nullable: true })
  @JoinTable({
    name: 'user_roles',
    joinColumn: { name: 'userId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'roleId', referencedColumnName: 'id' }
  })
  roles: RoleEntity[]

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
