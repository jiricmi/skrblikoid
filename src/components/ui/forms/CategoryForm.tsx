import {handleCategoryFormSubmit, LSCategory} from "@/components/localStorage/category";
import React from "react";
import {Form, FormInput, FormLabel, FormMessage, FormSelect, SubmitButton} from "@/components/ui/forms/Form";

interface CategoryFormProps {
    addCategory: (newCategory: LSCategory | undefined) => void;
    closeFormModal: () => void;
    category?: LSCategory;
}

export const CategoryForm: React.FC<CategoryFormProps> = ({addCategory, closeFormModal, category}) => {
    const [formMessage, setFormMessage] = React.useState<string>("");
    const [name, setName] = React.useState<string>(category ? category.name : "");
    const [color, setColor] = React.useState<string>(category ? category.color : "#000000");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newCategory = await handleCategoryFormSubmit(event, setFormMessage);
        if (newCategory == null) return;
        addCategory(newCategory);
        closeFormModal();
    };

    const editCategory = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (category === undefined) return;
        const newCategory = await handleCategoryFormSubmit(event, setFormMessage, category.key);
        if (newCategory == null) return;
        addCategory(undefined);
        closeFormModal();
    }

    return (
        <div>
            <Form onSubmit={(category === undefined) ? handleSubmit : editCategory}>
                <FormLabel>Name
                    <FormInput
                        type="text"
                        name="categoryName"
                        placeholder="Food, Rent..."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </FormLabel>
                <FormLabel>Color
                    <FormInput
                        type="color"
                        name="categoryColor"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                    />
                </FormLabel>
                <FormMessage message={formMessage}/>
                <SubmitButton type="submit">Submit</SubmitButton>
            </Form>
        </div>
    );
}