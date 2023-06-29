import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import { selectSubcategories } from "./selectors";
import { useAppDispatch } from "../../store";
import { loadSubcategories } from "./subcategoriesSlice";
import { Box, Container } from '@mui/material';

export default function Subcategories(): JSX.Element {
    const subcategories = useSelector(selectSubcategories);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(loadSubcategories());
    }, [dispatch]);

    return (
        <Box>
            <Container>
                <div>
                    {subcategories.map((subcategory) => (
                        <div key={subcategory.id}>{subcategory.description}</div>
                    ))}
                </div>
            </Container>
        </Box>
    );
}