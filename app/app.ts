import 'reflect-metadata';

import {
	ApolloServerPluginLandingPageGraphQLPlayground,
	ApolloServerPluginLandingPageProductionDefault,
} from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import { buildSchema } from 'type-graphql';
import { resolvers } from './modules';

dotenv.config();
async function bootstrap() {
	// Build the schema
	const schema = await buildSchema({
		resolvers,
	});

	// Init express
	const app = express();
	app.use(cookieParser());

	// Create the Apollo Server
	const server = new ApolloServer({
		schema,
		context: (ctx) => {
			console.log(ctx);
			return ctx;
		},
		plugins: [
			process.env.NODE_ENV === 'production'
				? ApolloServerPluginLandingPageProductionDefault()
				: ApolloServerPluginLandingPageGraphQLPlayground(),
		],
	});

	await server.start();

	// Apply middleware to server
	server.applyMiddleware({ app });

	app.listen({ port: 4000 }, () => {
		console.log('App is listening on http://localhost:4000');
	});
}

bootstrap();
