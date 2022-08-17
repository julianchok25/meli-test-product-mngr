import {Request, Response} from 'express';
import {INTERNAL_SERVER_ERROR, OK} from 'http-status';
import debugLib from 'debug';
import { productService } from '../services/product.service';

const debug = debugLib('meli:ProductController');

class ProductController {

    getProductsBySearch(req: Request, response: Response) {
        debug('[NEW] get products By search: %s', req.query.q);

        productService.getProducts(req.query)
            .then(res => response.status(OK).send(res))
            .catch(error => response.status(INTERNAL_SERVER_ERROR).send(error));
    }

    getProductById(req: Request, response: Response) {
        debug('[NEW] get product By ID with its Description: %s', req.params.id);

        productService.getProductDetailsById(req.params)
            .then(res => response.status(OK).send(res))
            .catch(error => response.status(INTERNAL_SERVER_ERROR).send(error));
    }

}

export const productController = new ProductController();