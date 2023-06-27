import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import { selectError, selectCategories } from '../categories/selectors';

interface CategoryNavButtonProps {
    handleFilter: (value: string) => void;
}

const CategoryNavButton: React.FC<CategoryNavButtonProps> = ({ handleFilter }) => {
    useEffect(() => {
        // Fetch categories data using loadCategoriesOfAll or any other method
    }, []);

    const categories = useSelector(selectCategories);

    const buttonStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    };

    return (
        <Box sx={{ display: 'flex' }}>
            {categories.map((category) => (
                <ul>
                    {categories?.map((element) => (
                        <li key={element.id}>
                            {element.id} {element.title} {element.description}
                        </li>
                    ))}
                </ul>
            ))}
        </Box>
    );
};

export default CategoryNavButton;
