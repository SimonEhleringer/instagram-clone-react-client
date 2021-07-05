import { getByPlaceholderText, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { configureStore, StoreType } from '../../config/store';
import { buildLoginPath } from '../../routes/path';
import { renderLoginRoute } from '../../routes/renderers';
import {
  buildAccessAndRefreshTokenResponseDto,
  buildAxiosError,
  buildAxiosResponseWithData,
  buildErrorResponseDto,
  renderMockedIndexRoute,
  renderMockedRegisterRoute,
  renderWithProviders,
} from '../../test-utils';
import faker from 'faker';
import authenticationApi from '../../config/authentication-api';
import { when } from 'jest-when';
import { buildLoginUrl, LoginRequestDto } from '../../api/authentication';

jest.mock('../../config/authentication-api.ts');
const mockedAuthenticationApi = authenticationApi as jest.Mocked<
  typeof authenticationApi
>;

it('should redirect to index page when login button was pressed and API call was successful', async () => {
  renderWithProviders(
    <>
      {renderLoginRoute()}
      {renderMockedIndexRoute()}
    </>,
    {
      route: buildLoginPath(),
    }
  );

  const username = faker.internet.userName();
  const password = faker.internet.password();

  userEvent.type(
    screen.getByPlaceholderText('Benutzername oder E-Mail Adresse'),
    username
  );
  userEvent.type(screen.getByPlaceholderText('Passwort'), password);

  const requestDto: LoginRequestDto = {
    usernameOrEmail: username,
    password,
  };

  when(mockedAuthenticationApi.post)
    .calledWith(buildLoginUrl(), requestDto)
    .mockResolvedValue(
      buildAxiosResponseWithData(buildAccessAndRefreshTokenResponseDto())
    );

  userEvent.click(screen.getByRole('button', { name: 'Anmelden' }));

  expect(await screen.findByTestId('index-page')).toBeInTheDocument();
});

it('should show errors when login button was pressed and API call was not successful', async () => {
  renderWithProviders(<>{renderLoginRoute()}</>, {
    route: buildLoginPath(),
  });

  const errorResponeDto = buildErrorResponseDto();

  when(mockedAuthenticationApi.post)
    .calledWith(buildLoginUrl(), expect.anything())
    .mockRejectedValue(buildAxiosError(errorResponeDto));

  userEvent.click(screen.getByRole('button', { name: 'Anmelden' }));

  await waitFor(() =>
    errorResponeDto.errors.forEach((error) =>
      expect(screen.getByText(error)).toBeInTheDocument()
    )
  );
});

it('should redirect to register page when link to reigster page was pressed', async () => {
  renderWithProviders(
    <>
      {renderLoginRoute()}
      {renderMockedRegisterRoute()}
    </>,
    { route: buildLoginPath() }
  );

  userEvent.click(screen.getByRole('link', { name: 'Registrieren' }));

  expect(await screen.findByTestId('register-page')).toBeInTheDocument();
});
