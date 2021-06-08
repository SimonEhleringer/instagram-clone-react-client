import { render } from '@testing-library/react';
import { createMemoryHistory, MemoryHistory, State } from 'history';
import { BsHouseDoor, BsHouseDoorFill } from 'react-icons/bs';
import { Router } from 'react-router';
import HeaderLink from './index';

let history: MemoryHistory<State>;

beforeEach(() => {
  history = createMemoryHistory();
});

it('should show normal icon when link is not active', () => {
  const { getByTestId } = renderComponent();

  const normalIconEl = getByTestId('normalLink');
  const activeIconEl = getByTestId('activeLink');

  expect(normalIconEl).not.toHaveClass('header-link--hidden');
  expect(activeIconEl).toHaveClass('header-link--hidden');
});

it('should show active icon when link is active', () => {
  history.push('/testRoute');

  const { getByTestId } = renderComponent();

  const activeIconEl = getByTestId('activeLink');
  const normalIconEl = getByTestId('normalLink');

  expect(activeIconEl).toHaveClass('header-link--active');
  expect(normalIconEl).toHaveClass('header-link--hidden');
});

const renderComponent = () => {
  return render(
    <Router history={history}>
      <HeaderLink
        to='/testRoute'
        Icon={BsHouseDoorFill}
        ActiveIcon={BsHouseDoor}
      ></HeaderLink>
    </Router>
  );
};
