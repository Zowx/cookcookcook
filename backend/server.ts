import { Application, oakCors, Router } from './deps.ts';
import Ingredientrouter from './controllers/ingredient.controller.ts';
import RecetteRouter from './controllers/recette.controller.ts';
import { connectDB } from './repositories/mongo.ts';
import { errorMiddleware } from './middleware/errorMiddleware.ts';
await connectDB();

const app = new Application();
app.use(errorMiddleware);

// Créer un router pour le health check
const healthRouter = new Router();
healthRouter.get('/health', (ctx) => {
    ctx.response.status = 200;
    ctx.response.body = { status: 'ok', message: 'Server is running' };
});

// Configurer CORS
const allowedOrigins = Deno.env.get('ALLOWED_ORIGINS')?.split(',') || [
    'http://127.0.0.1:5173',
    'http://localhost:5173',
];
app.use(
    oakCors({
        origin: allowedOrigins,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    }),
);

// Ajouter les routers
app.use(healthRouter.routes());
app.use(healthRouter.allowedMethods());
app.use(Ingredientrouter.routes());
app.use(Ingredientrouter.allowedMethods());
app.use(RecetteRouter.routes());
app.use(RecetteRouter.allowedMethods());

const port = parseInt(Deno.env.get('PORT') || '8000');
console.log(`Server running on http://localhost:${port}`);
await app.listen({ port: port });
