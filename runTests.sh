#!/bin/zsh

pnpm tsx --test test/presentation/auth/routes.test.ts
pnpm tsx --test test/presentation/users/routes.test.ts
pnpm tsx --test test/presentation/projects/routes.test.ts
pnpm tsx --test test/presentation/participants/routes.test.ts
