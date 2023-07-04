import { Routes, Route, HashRouter } from 'react-router-dom';
import React from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import Login from '../features/auth/Login';
import Register from '../features/auth/Register';
import { getProfile } from '../features/auth/authSlice';
import { selectAuthChecked } from '../features/auth/selectors';
import { useAppDispatch } from '../store';
import Homepage from '../features/main/Homepage';
import Main from '../features/main/Main';
import HelpCards from '../features/help_cards/HelpCards';
import UserHelpCards from '../features/help_cards/UserHelpCards';
import Categories from '../features/categories/Categories';
import ProfilePage from '../features/profile/Profile';
import DetailHelpCard from '../features/help_cards/DetailHelpCard';
import SubCategories from '../features/subcategories/SubCategories';

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
          <Route path="/users/my/cards" element={<UserHelpCards />} />
          <Route
            path="/cards"
            element={<HelpCards selectedCategory={null} />}
          />
          <Route path="/categories" element={<Categories />} />
          <Route path="/subcategories" element={<SubCategories />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/card-details/:id" element={<DetailHelpCard />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
