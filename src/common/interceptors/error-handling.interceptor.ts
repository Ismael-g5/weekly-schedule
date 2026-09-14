import { ExecutionContext, NestInterceptor, CallHandler } from "@nestjs/common";
import { catchError, tap } from "rxjs";

export class ErrorHandlingInterceptor implements NestInterceptor {
    async intercept(
        context: ExecutionContext ,
        next: CallHandler<any>
    )// no caso de intercept async, passamos sem o tipo aqui
     {

        console.log("Error Handling Interceptor");

        await new Promise((resolve) => setTimeout(resolve, 3000));

        //Promise -> resolve

        return next.handle().pipe(
            //tap -> usado quando não queremos executar, apenas observar
            catchError((error) => {
                console.error("Error Handling Interceptor - Error caught: ", error);
                throw error;
            })
        )
    }
}