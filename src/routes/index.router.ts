import {Router} from 'express';
import { productController } from '../controllers/product.controller';
import RoutesEnum from '../enums/routes.enum';
import { validatorUtil } from '../utils/validators';
// import { query } from 'express-validator';

class IndexRouter {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    private config(): void {
        this.router.get(RoutesEnum.Items, validatorUtil.validateQueryParam(),
        productController.getProductBySearch);
    }
}

const indexRouter = new IndexRouter();
export default indexRouter.router;