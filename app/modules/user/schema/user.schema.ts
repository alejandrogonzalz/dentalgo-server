import { getModelForClass, prop } from '@typegoose/typegoose';
import { IsEmail } from 'class-validator';
import { Field, ObjectType } from 'type-graphql';
import Context from '../types/context';

@ObjectType()
export class User {
	@Field(() => String)
	_id: string;

	@Field(() => String)
	@prop({ required: true })
	name: string;

	@Field(() => String)
	@prop({ required: true })
	email: string;

	@Field(() => String)
	@prop({ required: true })
	password: string;
}

export const UserModel = getModelForClass<typeof User>(User);
