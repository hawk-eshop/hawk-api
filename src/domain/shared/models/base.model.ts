import { Prop, Schema } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

@Schema({ timestamps: true })
export class BaseModel extends Document {
  @Prop({ type: Types.ObjectId, auto: true })
  _id: Types.ObjectId

  @Prop({ default: true })
  isActive: boolean

  @Prop({ default: false })
  isDeleted: boolean
}
