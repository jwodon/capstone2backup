// src/api.test.js
import Api from './api';
import axios from 'axios';

jest.mock('axios');

describe('Api', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('login calls the correct endpoint with data', async () => {
    const mockData = { token: 'testtoken' };
    axios.mockResolvedValue({ data: mockData });

    const data = { username: 'testuser', password: 'password' };
    const token = await Api.login(data);

    expect(axios).toHaveBeenCalledWith({
      url: expect.stringContaining('/auth/token'),
      method: 'post',
      data,
      headers: { Authorization: 'Bearer null' },
    });

    expect(token).toBe('testtoken');
  });

  test('signup calls the correct endpoint with data', async () => {
    const mockData = { token: 'testtoken' };
    axios.mockResolvedValue({ data: mockData });

    const data = { username: 'newuser', password: 'password', email: 'test@example.com' };
    const token = await Api.signup(data);

    expect(axios).toHaveBeenCalledWith({
      url: expect.stringContaining('/auth/register'),
      method: 'post',
      data,
      headers: { Authorization: 'Bearer null' },
    });

    expect(token).toBe('testtoken');
  });

  test('getCurrentUser fetches user data', async () => {
    const mockUser = { username: 'testuser', id: 1 };
    axios.mockResolvedValue({ data: { user: mockUser } });

    const user = await Api.getCurrentUser('testuser');

    expect(axios).toHaveBeenCalledWith({
      url: expect.stringContaining('/users/testuser'),
      method: 'get',
      data: {},
      headers: { Authorization: 'Bearer null' },
    });

    expect(user).toEqual(mockUser);
  });
});
