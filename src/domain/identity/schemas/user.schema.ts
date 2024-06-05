import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types } from 'mongoose'

import { BaseModel } from '@domain/shared/models/base.model'

import { RoleModel } from './role.schema'

@Schema()
export class UserModel extends BaseModel {
  @Prop({ required: true })
  name: string

  @Prop({ unique: true, required: true })
  email: string

  @Prop({ required: true })
  password: string

  @Prop({ nullable: true })
  securityStamp: string

  @Prop({ type: [{ type: Types.ObjectId, ref: RoleModel.name }] })
  roles: RoleModel[]
}

export const UserSchema = SchemaFactory.createForClass(UserModel)
