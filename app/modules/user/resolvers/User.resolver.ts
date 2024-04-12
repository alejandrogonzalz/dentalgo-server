import {
	Arg,
	Args,
	Authorized,
	Ctx,
	Mutation,
	Query,
	Resolver,
} from 'type-graphql';

import { User } from '../schema/user.schema';
import UserService from '../service/user.service';
import { UsersPaginationArgs } from '../types/args';
import { CreateUserInput } from '../types/inputs';

@Resolver(User)
export default class UserResolver {
	constructor(private userService: UserService) {
		this.userService = new UserService();
	}

	@Mutation(() => User)
	createUser(@Arg('input') input: CreateUserInput) {
		return this.userService.createUser(input);
	}

	@Query(() => [User])
	async users(@Args() { skip, take }: UsersPaginationArgs): Promise<User[]> {
		return await this.userService.findAll({ skip, take });
	}
}
