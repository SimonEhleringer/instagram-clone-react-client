import { screen, waitFor } from '@testing-library/react';
import { buildRegisterUrl, RegisterRequest } from '../../api/authentication';
import { buildRegisterPath } from '../../routes/path';
import authenticationApi from '../../config/authenticationApi';
import {
  buildAccessAndRefreshTokenResponseDto,
  buildAxiosError,
  buildAxiosResponseWithData,
  buildErrorResponseDto,
  renderMockedIndexRoute,
  renderMockedLoginRoute,
  renderWithProviders,
} from '../../test-utils';
import { renderRegisterRoute } from '../../routes/renderers';
import faker from 'faker';
import userEvent from '@testing-library/user-event';
import { when } from 'jest-when';

jest.mock('../../config/authenticationApi.ts');
const mockedAuthenticationApi = authenticationApi as jest.Mocked<
  typeof authenticationApi
>;

it('should redirect to index route when register button was pressed and API call was successful', async () => {
  renderWithProviders(
    <>
      {renderRegisterRoute()}
      {renderMockedIndexRoute()}
    </>,
    { route: buildRegisterPath() }
  );

  const email = faker.internet.email();
  const fullName = faker.name.findName();
  const username = faker.internet.userName();
  const password = faker.internet.password();

  userEvent.type(screen.getByPlaceholderText('E-Mail Adresse'), email);
  userEvent.type(screen.getByPlaceholderText('Vollständiger Name'), fullName);
  userEvent.type(screen.getByPlaceholderText('Benutzername'), username);
  userEvent.type(screen.getByPlaceholderText('Passwort'), password);

  const request: RegisterRequest = {
    email,
    fullName,
    username,
    password,
  };

  when(mockedAuthenticationApi.post)
    .calledWith(buildRegisterUrl(), request)
    .mockResolvedValue(
      buildAxiosResponseWithData(buildAccessAndRefreshTokenResponseDto())
    );

  userEvent.click(screen.getByRole('button', { name: 'Registrieren' }));

  expect(await screen.findByTestId('index-page')).toBeInTheDocument();
});

it('should show errors when register button was pressed and API call was not successful', async () => {
  renderWithProviders(renderRegisterRoute(), {
    route: buildRegisterPath(),
  });

  const errorResponeDto = buildErrorResponseDto();

  when(mockedAuthenticationApi.post)
    .calledWith(buildRegisterUrl(), expect.anything())
    .mockRejectedValue(buildAxiosError(errorResponeDto));

  userEvent.click(screen.getByRole('button', { name: 'Registrieren' }));

  await waitFor(() =>
    errorResponeDto.errors.forEach((error) =>
      expect(screen.getByText(error)).toBeInTheDocument()
    )
  );
});

it('should redirect to register page when link to reigster page was pressed', async () => {
  renderWithProviders(
    <>
      {renderRegisterRoute()}
      {renderMockedLoginRoute()}
    </>,
    { route: buildRegisterPath() }
  );

  userEvent.click(screen.getByRole('link', { name: 'Melde dich an' }));

  expect(await screen.findByTestId('login-page')).toBeInTheDocument();
});
