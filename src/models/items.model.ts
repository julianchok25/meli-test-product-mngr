export interface ProductsRsModel {
	author: AuthorModel;
	categories: string[];
	items: ItemModel[];
}

export interface ProductRsModel {
	author: AuthorModel;
	item: ItemModel;
}

export interface AuthorModel {
	id?: string;
	name: string;
	lastName: string;
}

export interface ItemModel {
	id: string;
	title: string;
	price: CurrencyModel;
	picture: string;
	condition: string;
	freeShipping: boolean;
	soldQuantity?: number;
	description?: string;
	categoryId?: string;
}

export interface CurrencyModel {
	currency: string;
	amount: number;
	decimals: number;
}
