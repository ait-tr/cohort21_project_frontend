import { Routes, Route, HashRouter } from 'react-router-dom';
import React from 'react';
import { useSelector } from 'react-redux';
import './App.css';

// import TasksList from '../features/tasks/TasksList';
import Login from '../features/auth/Login';
import Register from '../features/auth/Register';
import { getProfile } from '../features/auth/authSlice';
import { selectAuthChecked } from '../features/auth/selectors';
import { useAppDispatch } from '../store';
import AdminCabinet from '../features/main/AdminCabinet';
import Homepage from '../features/main/Homepage';
import Main from '../features/main/Main';
import HelpCardsAll from '../features/help_cards/HelpCardsAll';
import Tasks from '../features/tasks/Tasks';
import Categories from '../features/categories/Categories';
import ProfilePage from '../features/profile/Profile';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const authChecked = useSelector(selectAuthChecked);

  React.useEffect(() => {
    dispatch(getProfile());
    // console.log(authChecked);
  }, [dispatch]);

  if (!authChecked) {
    return (
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/api/users/my/profile" element={<ProfilePage />} />
          <Route path="/cards" element={<HelpCardsAll selectedCategory={null} />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/admin/tasks" element={<AdminCabinet />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
