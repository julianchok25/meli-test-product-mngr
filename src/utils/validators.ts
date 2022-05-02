import { query, validationResult } from 'express-validator';
import {Request, Response} from 'express';
import {FORBIDDEN} from 'http-status';

class Validator {

    public validateQueryParam(): any[] {

        const validateQuery = [
            query('q')
                .exists().withMessage('Invalid parameter, please try with \'q\' key and with its value')
                .not()
                .isEmpty().withMessage('Empty value!'),
            (req: Request, res: Response, next: any) => {
                this.validateResult(req, res, next);
            }
        ];

        return validateQuery;
    }

    private validateResult(req: Request, res: Response, next: any) {
        try {
            validationResult(req).throw();
            return next();
        } catch (error: any) {
            res.status(FORBIDDEN);
            res.send({errors: error.array()});
        }
    }
}

export const validatorUtil = new Validator();