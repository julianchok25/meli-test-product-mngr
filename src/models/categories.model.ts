export interface CommonCategoryModel {
    id: string;
    name: string;
}

export interface FiltersCategoryModel extends CommonCategoryModel  {
    type: string;
    values: ValuesCategoriesModel[];
}

export interface ValuesCategoriesModel extends CommonCategoryModel {
    path_from_root: CommonCategoryModel[];
}