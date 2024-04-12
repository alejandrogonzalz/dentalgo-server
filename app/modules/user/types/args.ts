import { ArgsType, Field, Int } from 'type-graphql';

import { Max, Min } from 'class-validator';

@ArgsType()
export class UsersPaginationArgs {
	@Field((type) => Int, { defaultValue: 0 })
	skip: number = 0; // Default value for skip is 0

	@Field((type) => Int, { defaultValue: 0 })
	take: number = 0; // Default value for take is 0
}
