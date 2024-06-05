import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

import { BaseModel } from '@domain/shared/models/base.model'

@Schema()
export class RoleModel extends BaseModel {
  @Prop({ required: true })
  name: string

  @Prop({ type: [String] })
  permissions: string[]
}

export const RoleSchema = SchemaFactory.createForClass(RoleModel)
