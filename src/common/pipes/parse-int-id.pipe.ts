import { ArgumentMetadata, PipeTransform, Injectable } from "@nestjs/common";

// a class ParseIntIdPipe pede necessariamente o metodo transform

@Injectable()
export class ParseIntIdPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        if (metadata.type !== 'param' || metadata.data !== 'id') {
            return value; // Se não for um parâmetro, retorna o valor original
        
        // isso permite usar o pipe no controller inteiro, sem direcionar pra uma rota so
            // no caso do pipe para id, não faz muito sentido, ja com os metodos All, não levam id, e portado 
            // causara erro
    }

        const parsedValue = Number(value);

        if(isNaN(parsedValue) || !Number.isInteger(parsedValue)) {
            throw new Error(`O valor do parâmetro 'id' deve ser um número inteiro. Valor recebido: ${value}`);
        }

        //const val = parseInt(value, 10);  
        console.log('ParseIntIdPipe value:', value);  
        console.log('ParseIntIdPipe metadata:', metadata);


        return value;
    }
}