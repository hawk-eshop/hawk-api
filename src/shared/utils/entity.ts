import { PrimaryGeneratedColumn, BaseEntity as BaseORM } from 'typeorm'

export abstract class BaseEntity extends BaseORM {
  @PrimaryGeneratedColumn('uuid')
  id: string
}

export interface ICreationAudit {
  isActive: boolean
  createdAt: Date
  creatorId: string
}
export interface IModificationAudit {
  modifyAt: Date
  modifier: string
}
export interface IDeletionAudit {
  isDeleted: boolean
  deletedAt: Date
  deletorId: string
}
