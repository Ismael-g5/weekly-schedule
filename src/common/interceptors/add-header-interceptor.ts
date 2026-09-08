import { NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";

export class AddHeaderInterceptor implements NestInterceptor {
    intercept(
        context: ExecutionContext,
        next: CallHandler<any>
    ): any {
        // Implementation for adding headers
       // o que colocarmos aqui sera antes da execução do metodo
       // console.log(...)
        const response = context.switchToHttp().getResponse();

        response.setHeader('X-Custom-Header', 'Custom Value');
        return next.handle(); //aqui não executa nada
    }
}