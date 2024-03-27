import axios from 'axios';
import * as sendMessageToTeams from '../../../src/utils/teams/send-message-to-teams';

const projects = [
  { name: 'Project1', url: 'https://example.com/project1' },
  { name: 'Project2', url: 'https://example.com/project2' },
];

const webhookUrl = 'http';
const notificationSummary = 'test Summary';
const notificationDescription = 'test description';
const clickableLinks = [
  {
    description: 'test',
    url: 'https',
  },
];
describe('sendMessageToTeams', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.mock('axios');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('1. Should send a notification successfully', async () => {
    const test = jest.spyOn(axios, 'post');
    test.mockResolvedValueOnce({ data: 'success' });

    await sendMessageToTeams.sendMessageToTeams({ teamsWebhookUrl: webhookUrl, projects, notificationSummary, notificationDescription, clickableLinks });
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        '@type': 'MessageCard',
      })
    );
  });

  it('2. Should send a notification successfully', async () => {
    const test = jest.spyOn(axios, 'post');
    test.mockResolvedValueOnce({ data: 'success' });

    await sendMessageToTeams.sendMessageToTeams({ teamsWebhookUrl: webhookUrl, notificationSummary, notificationDescription, clickableLinks });
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        '@type': 'MessageCard',
      })
    );
  });
  it('3. Should throw error while sending message to teams', async () => {
    const test = jest.spyOn(axios, 'post');
    test.mockResolvedValueOnce(Promise.reject(new Error('Failed to send notification')));

    await expect(sendMessageToTeams.sendMessageToTeams({ teamsWebhookUrl: webhookUrl, projects, notificationSummary, notificationDescription })).rejects.toThrowError('Failed to send notification');
  });
});
