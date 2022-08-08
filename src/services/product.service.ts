import { AUTHORS, DEFAULT_AUTHOR } from '../assets/json/authors-values';
import {SERVICES_PATHS} from '../environments/servicesPaths';
import { CommonCategoryModel, FiltersCategoryModel, ValuesCategoriesModel } from '../models/categories.model';
import { ProductsRsModel, ItemModel, ProductRsModel, CurrencyModel } from '../models/items.model';
import { helpers } from '../utils/helpers';
import { restService } from './rest.service';
import debugLib from 'debug';

const debug = debugLib('meli:ProductService');

class ProductService {

    MAP_RESOURCES = {
        'search': (response: any): ProductsRsModel => {
            return {
                author: AUTHORS.find(author => author.id === '0') || DEFAULT_AUTHOR,
                categories:  this.getCategories(response.filters),
                items: this.getItemsData(response.results)
            };
        },
        'items': (response: any, itemDescription: string): ProductRsModel => {
            return {
                author: AUTHORS.find(author => author.id === '0') || DEFAULT_AUTHOR,
                item: this.getItemData(response, itemDescription)
            };
        }
    };

    public async getProducts(queryParams: any): Promise<any> {

        const url = `${SERVICES_PATHS.productSearch}?q=${queryParams.q}`;

        return restService.exchange(url, 'GET', null, null)
            .then(response => Promise.resolve(this.MAP_RESOURCES.search(response)))
            .catch(error => Promise.reject(error));
    }

    public async getProductDetailsById(paramID: any): Promise<any> {

        try {
            const itemParamDescription = await this.getProductDescription(paramID.id);
            const serviceResponse = await this.getProductById(paramID.id, itemParamDescription);

            return serviceResponse;
        } catch (error) {
            throw new Error(`Could not get item details: ${error}`);
        }
    }

    private async getProductDescription(param: string): Promise<any> {
        debug('Getting product Description');

        const url = `${SERVICES_PATHS.items}/${param}/description`;

        return restService.exchange(url, 'GET', null, null)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error));
    }

    private async getProductById(param: string, itemDescription: any): Promise<any> {
        debug('Getting product By ID');

        const url = `${SERVICES_PATHS.items}/${param}`;

        return restService.exchange(url, 'GET', null, null)
            .then(response => Promise.resolve(this.MAP_RESOURCES.items(response, itemDescription.plain_text)))
            .catch(error => Promise.reject(error));
    }

    private getCategories(filters: any[]): string[] {
        const categories: string[] = [];

        filters.filter(item => item.id === 'category')
            .forEach((category: FiltersCategoryModel) => {
                category.values.forEach((item: ValuesCategoriesModel) => {
                    categories.push(item.name);
                    item.path_from_root.forEach((element: CommonCategoryModel) => {
                        if(element.id !== item.id) {
                            categories.push(element.name);
                        }
                    });
                });
            });

        return categories;
    }

    private getItemsData(items: any[]): ItemModel[] {
        return items.map(item => {
            return {
                id: item.id,
                title: item.title,
                price: this.getPriceData(item.prices.prices),
                picture: item.thumbnail,
                condition: item.condition,
                freeShipping: item.shipping.free_shipping
            };
        });
    }

    private getItemData(object: any, description: string): ItemModel {
        return {
            id: object.id,
            title: object.title,
            price: {
                currency: object.currency_id,
                amount: object.price,
                decimals: helpers.decimalCount(object.price)
            },
            picture: object.thumbnail,
            condition: object.condition,
            freeShipping: object.shipping.free_shipping,
            soldQuantity: object.sold_quantity,
            description
        };
    }

    private getPriceData(prices: any[]): CurrencyModel {
        return prices.map(element => {
            return {
                currency: element.currency_id,
                amount: element.amount,
                decimals: helpers.decimalCount(element.amount)
            };
        })[0];
    }
}

export const productService = new ProductService();