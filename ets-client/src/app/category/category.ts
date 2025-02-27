// Author: Angelica Gutierrez, Hayat Soma, David Clemens
// File Name: category.ts
// Date: 15 February 2025
// Description: Category interfaces

export interface Category {
    _id: string,
    categoryId: number,
    userId: number,
    name: string,
    description: string,
    dateCreated: string
}

export type AddCategoryDTO = Omit<Category, '_id' | 'dateModified'>; //  add a new DTO object for new category objects
export type UpdateCategoryDTO = Omit<Category, '_id' | 'categoryId' | 'dateCreated' |'dateModified'> //  add a new DTO object for updated category objects
