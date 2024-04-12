import { ApolloError } from 'apollo-server-errors';
import bcrypt from 'bcrypt';
import { User, UserModel } from '../schema/user.schema';
import Context from '../types/context';
import { CreateUserInput } from '../types/inputs';

class UserService {
	async createUser(input: CreateUserInput) {
		return UserModel.create(input);
	}

	async findAll({
		skip = 0,
		take = 0,
	}: { skip?: number; take?: number } = {}): Promise<User[]> {
		try {
			const users = await UserModel.find().skip(skip).limit(take);
			return users;
		} catch (error) {
			throw new ApolloError('Error fetching users', 'DATABASE_ERROR');
		}
	}
}

export default UserService;
