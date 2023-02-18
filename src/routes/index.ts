import { Router } from 'express';
import glob from 'glob';

export async function registerRoutes(router: Router) {
  const routes = glob.sync('**/*.route.ts', {
    cwd: __dirname,
  });

  for (const route of routes) {
    const routePath = `${__dirname}/${route}`;
    const routeModule = await import(routePath);
    routeModule.register(router);
  }
}
