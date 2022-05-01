import { AUTHORS, DEFAULT_AUTHOR } from '../assets/json/authors-values';
import {SERVICES_PATHS} from '../environments/servicesPaths';
import { CommonCategoryModel, FiltersCategoryModel, ValuesCategoriesModel } from '../models/categories.model';
import { ProductsRsModel, ItemModel } from '../models/items.model';
import { restService } from './rest.service';

class ProductService {

    public async getProduct(queryParams: any): Promise<any> {
        console.log(queryParams);
        const producto = 'gafas';
        const url = `${SERVICES_PATHS.productSearch}?q=${producto}`;

        return restService.exchange(url, 'GET', null, null)
            .then(response => Promise.resolve(this.mapResponseBody(response)))
            .catch(error => Promise.reject(error));
    }

    private mapResponseBody(response: any): ProductsRsModel {
        return {
            author: AUTHORS.find(author => author.id === '0') || DEFAULT_AUTHOR,
            categories:  this.getCategories(response.filters),
            items: this.getItemsData(response.results)
        };
    }

    private getCategories(filters: any[]): string[] {
        const categories: string[] = [];

        filters.filter(item => item.id === 'category')
            .forEach((category: FiltersCategoryModel) => {
                category.values.forEach((item: ValuesCategoriesModel) => {
                    item.path_from_root.forEach((element: CommonCategoryModel ) => {
                        categories.push(element.name);
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
                price: item.price,
                picture: item.thumbnail,
                condition: item.condition,
                freeShipping: item.shipping.free_shipping
            };
        });
    }
}

export const productService = new ProductService();