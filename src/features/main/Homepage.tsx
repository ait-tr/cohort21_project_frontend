import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Category from './Category';

function Homepage(): JSX.Element {
  const [filter, setFilter] = useState('');
  const [searchedCategory, setSearchedCategory] = useState('');

  const handleFilter = (value: string) => {
    setFilter(value);
    setSearchedCategory(value);
  };

  // Sample data for HelpCard components
  const helpCardData = [
    { category: 'care', title: 'HelpCard 1' },
    { category: 'carrier', title: 'HelpCard 2' },
    { category: 'education', title: 'HelpCard 3' },
    { category: 'events', title: 'HelpCard 4' },
    { category: 'housekeeping', title: 'HelpCard 5' },
    { category: 'specialist', title: 'HelpCard 6' },
    { category: 'care', title: 'HelpCard 1' },
    { category: 'carrier', title: 'HelpCard 2' },
    { category: 'care', title: 'HelpCard 1' },
    { category: 'carrier', title: 'HelpCard 2' },
    { category: 'events', title: 'HelpCard 4' },
    { category: 'housekeeping', title: 'HelpCard 5' },
  ];

  // Filter the HelpCard data based on the selected category
  const filteredHelpCardData = helpCardData.filter((card) =>
    filter ? card.category === filter : true
  );

  return (
    <>
      <Header />
      <Category />
      <Outlet />
    </>
  );
}

export default Homepage;
