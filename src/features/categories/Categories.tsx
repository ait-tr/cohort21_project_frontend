import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { selectError, selectCategories } from './selectors';
import {
  createCategory,
  loadCategories,
  updateCategory,
  deleteCategories,
} from './categoriesSlice';
import { useAppDispatch } from '../../store';

export default function Categories(): JSX.Element {
  const error = useSelector(selectError);
  const categories = useSelector(selectCategories);
  const [description, setDescription] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const dispatch = useAppDispatch();
  const isEditing = categoryId !== null;

  const handleSubmit = React.useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      if (isEditing) {
        const dispatchResult = await dispatch(
          updateCategory({
            id: Number(categoryId),
            updatedCategory: {
              id: Number(categoryId),
              title,
              description,
            },
          })
        );
        if (updateCategory.fulfilled.match(dispatchResult)) {
          setCategoryId(null);
          setDescription('');
          setTitle('');
        }
      } else {
        const dispatchResult = await dispatch(
          createCategory({ title, description })
        );
        if (createCategory.fulfilled.match(dispatchResult)) {
          setCategoryId(null);
          setDescription('');
          setTitle('');
        }
      }
    },
    [dispatch, description, title]
  );

  const handleUpdate = React.useCallback(
    (categoryIdtoUpdate: number): void => {
      const categoryToUpdate = categories.find(
        (category) => category.id === categoryIdtoUpdate
      );
      if (categoryToUpdate) {
        setCategoryId(categoryToUpdate.id);
        setTitle(categoryToUpdate.title);
        setDescription(categoryToUpdate.description);
      } else {
        setCategoryId(null);
        setTitle('');
        setDescription('');
      }
    },
    [categories]
  );

  const handleDelete = React.useCallback(
    (categoryIdToDelete: number): void => {
      dispatch(deleteCategories(categoryIdToDelete)).then((dispatchResult) => {
        if (deleteCategories.fulfilled.match(dispatchResult)) {
          setCategoryId(null);
          setDescription('');
          setTitle('');
        }
      });
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(loadCategories());
  }, [dispatch]);

  return (
    <>
      <div>Categories</div>
      <h3>{isEditing ? 'Edit Categories' : 'Add Categories'}</h3>
      <form className="mb-3" onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            placeholder="Id..."
            aria-label="Id..."
            title="id" // Update the title attribute to "title"
            value={categoryId !== null ? categoryId.toString() : ''}
            onChange={() => setCategoryId(null)}
          />
          <input
            type="text"
            className={`form-control ${error ? 'is-invalid' : ''}`}
            placeholder="Categories..."
            aria-label="Categories..."
            title="title" // Update the title attribute to "title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            className={`form-control ${error ? 'is-invalid' : ''}`}
            placeholder="Описание..."
            aria-label="Описание..."
            title="CategoriesDescription"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button type="submit" className="btn btn-primary">
            {isEditing ? 'Обновить' : 'Добавить'}
          </button>
        </div>
        {error && (
          <div className="invalid-feedback text-end" style={{ display: 'block' }}>
            {error}
          </div>
        )}
      </form>
      <h3>Все категории</h3>
      <ul>
        {categories?.map((element) => (
          <li key={element.id}>
            {element.id} {element.title} {element.description}
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => handleUpdate(element.id)}
            >
              <EditIcon />
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => handleDelete(element.id)}
            >
              <DeleteIcon />
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
