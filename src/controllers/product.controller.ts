import {Request, Response} from 'express';
import {INTERNAL_SERVER_ERROR, OK} from 'http-status';
import debugLib from 'debug';
import { productService } from '../services/product.service';

const debug = debugLib('meli:ProductController');

class ProductController {

    getProductBySearch(req: Request, response: Response) {
        debug('[NEW] get products.');

        productService.getProduct(req.query)
            .then(res => response.status(OK).send(res))
            .catch(error => response.status(INTERNAL_SERVER_ERROR).send(error));
    }

}

export const productController = new ProductController();