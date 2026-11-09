import { Controller, Get } from "@nestjs/common";


@Controller('products')
export class ProductsController {

    @Get('')
    getProducts(): { id: number; name: string; price: number }[] {
        return [
            {
                id: 1,
                name: 'Product 1',
                price: 10.99,
            },
            {
                id: 2,
                name: 'Product 2',
                price: 19.99,
            },
        ];
    }
}