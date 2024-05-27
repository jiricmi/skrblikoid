import {BlockPage} from "@/components/ui/MainPage/BlockPage";
import React, {useEffect} from "react";
import {getCategory, LSCategory} from "@/components/localStorage/category";
import {CategoryBlock, CategoryBlockAdd} from "@/components/ui/CategoryPage/CategoryBlock";

export const CategoryPage = () => {
    const [categories, setCategories] = React.useState<LSCategory[]>([]);

    useEffect(() => {
        setCategories(getCategory());
    }, []);

    const addCategory = (newCategory: LSCategory | undefined) => {
        if (newCategory === undefined) {
            setCategories(getCategory());
            return;
        }
        setCategories((prevCategories) => [...prevCategories, newCategory]);
    }

    return (
        <BlockPage>
            {categories && categories.map((category) => (
                <CategoryBlock key={category.key} category={category} categories={categories}
                               addCategory={addCategory}/>
            ))}
            <CategoryBlockAdd addCategory={addCategory}/>
        </BlockPage>
    );
}