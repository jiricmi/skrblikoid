import {deleteCategory, LSCategory} from "@/components/localStorage/category";
import React from "react";
import {AddBlock, AddEditDeleteBar, Block} from "@/components/ui/MainPage/Block";
import {FormModal, YesNoModal} from "@/components/ui/MainPage/Modal";
import {CategoryForm} from "@/components/ui/forms/CategoryForm";

interface CategoryBlockProps {
    onClick?: () => void;
    category: LSCategory
    categories: LSCategory[]
    addCategory: (category: any) => void
}

interface CategoryBlockAddProps {
    addCategory: (newCategory: any) => void;
}

export const CategoryBlock: React.FC<CategoryBlockProps> = ({onClick, category, categories, addCategory}) => {
    const [isHovered, setIsHovered] = React.useState<boolean>(false);
    const [isOpenDelete, setOpenDelete] = React.useState<boolean>(false);
    const [isOpenEdit, setOpenEdit] = React.useState<boolean>(false);

    const openDeleteModal = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setOpenDelete(true);
    }

    const closeDeleteModal = () => setOpenDelete(false);

    const openEditModal = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setOpenEdit(true);
    }

    const closeEditModal = () => setOpenEdit(false);

    const handleDelete = (key: number) => {
        deleteCategory(key)
        addCategory(undefined)
    }

    return (
        <div>
            <Block onClick={onClick} color={category.color}>
                <div
                    className="flex items-center justify-center h-full"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}>
                    <div className="text-center">
                        <h2 className="text-xl font-semibold">{category.name}</h2>
                        <AddEditDeleteBar id={category.key} onEdit={openEditModal} onDelete={openDeleteModal}
                                          isHovered={isHovered}/>
                    </div>
                </div>
            </Block>
            <YesNoModal isOpen={isOpenDelete} onClose={closeDeleteModal} onYes={() => handleDelete(category.key)}>
                <p>Are you sure you want to delete {category.name}?</p>
            </YesNoModal>
            <FormModal isOpen={isOpenEdit} onClose={closeEditModal}>
                <p>Edit {category.name}</p>
                <CategoryForm addCategory={addCategory} category={category} closeFormModal={closeEditModal}/>
            </FormModal>
        </div>
    );
}

export const CategoryBlockAdd: React.FC<CategoryBlockAddProps> = ({addCategory}) => {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <AddBlock text="Add category" openModal={openModal} closeModal={closeModal} isModalOpen={isOpen}>
            <h1>Add category</h1>
            <CategoryForm addCategory={addCategory} closeFormModal={closeModal}/>
        </AddBlock>
    );
}
