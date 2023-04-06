import { render, screen } from '@testing-library/react';
import PageNotFound from '../../components/PageNotFound/PageNotFound';

describe('PageNotFound', () => {
  it('should render the PageNotFound component', () => {
    render(<PageNotFound />);
    const pageNotFoundElement = screen.getByText(/PageNotFound/i);
    expect(pageNotFoundElement).toBeInTheDocument();
  });
});