import { mapSchema, getDirective, MapperKind } from '@graphql-tools/utils';
import { defaultFieldResolver, GraphQLError } from 'graphql';

export const hasRoleDirectiveTransformer = (schema) =>
    mapSchema(schema, {
        [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
            const directive = getDirective(schema, fieldConfig, 'hasRole')?.[0];
            if (!directive) return fieldConfig;

            const { resolve = defaultFieldResolver } = fieldConfig;
            const requiredRole = directive['role'];

            fieldConfig.resolve = async (source, args, context, info) => {
                if (!context.user) {
                    throw new GraphQLError('Not authenticated', {
                        extensions: { code: 'UNAUTHENTICATED' }
                    });
                }
                const roles = context.user.realm_access?.roles ?? [];
                if (!roles.includes(requiredRole)) {
                    throw new GraphQLError(`Role "${requiredRole}" required`, {
                        extensions: { code: 'FORBIDDEN' }
                    });
                }
                return resolve(source, args, context, info);
            };

            return fieldConfig;
        }
    });