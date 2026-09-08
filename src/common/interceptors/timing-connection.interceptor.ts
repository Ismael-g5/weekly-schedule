import { ExecutionContext, NestInterceptor, CallHandler } from "@nestjs/common";
import { tap } from "rxjs";

export class TimingConnectionInterceptor implements NestInterceptor {
    async intercept(
        context: ExecutionContext ,
        next: CallHandler<any>
    )// no caso de intercept async, passamos sem o tipo aqui
     {
        const startTime = Date.now();

        console.log("Timing Connection Interceptor");

        await new Promise((resolve) => setTimeout(resolve, 3000));

        //Promise -> resolve

        return next.handle().pipe(
            //tap -> usado quando não queremos executar, apenas observar
            tap(() =>{

                const finalTime = Date.now();

                const elapsed = finalTime - startTime;
                console.log("Timing Connection Interceptor - After Request - Elapsed Time: ", elapsed);
            })
        )
    }
}