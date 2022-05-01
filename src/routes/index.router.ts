import {Router} from 'express';
import { productController } from '../controllers/product.controller';
import RoutesEnum from '../enums/routes.enum';

class IndexRouter {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    private config(): void {
        this.router.get(RoutesEnum.Items, productController.getProductBySearch);
    }
}

const indexRouter = new IndexRouter();
export default indexRouter.router;