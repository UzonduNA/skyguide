import React from 'react';
import { render, fireEvent, waitFor, getByTitle } from '@testing-library/react';
import { Home } from '../app/page';

describe('Home component', () => {
  it('renders correctly', () => {
    const { getByRole } = render(<Home />);
    expect(getByTitle('main')).toBeInTheDocument();
  });

  it('renders search box', () => {
    const { getByRole } = render(<Home />);
    expect(getByRole('searchbox')).toBeInTheDocument();
  });

  it('calls handleSearch function when input changes', () => {
    const handleSearch = jest.fn();
    const { getByRole } = render(<Home handleSearch={handleSearch} />);
    const input = getByRole('searchbox');
    fireEvent.change(input, { target: { value: 'New York' } });
    expect(handleSearch).toHaveBeenCalledTimes(1);
  });

  it('fetches weather data when search input changes', async () => {
    const fetchData = jest.fn();
    const { getByRole } = render(<Home fetchData={fetchData} />);
    const input = getByRole('searchbox');
    fireEvent.change(input, { target: { value: 'New York' } });
    await waitFor(() => expect(fetchData).toHaveBeenCalledTimes(1));
  });
});