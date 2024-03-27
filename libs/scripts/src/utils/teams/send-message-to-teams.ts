import axios from 'axios';

interface ProjectType {
  name: string;
  url: string | boolean;
}

interface ClickableLinkType {
  description: string;
  url: string;
}

type SendMessageToTeamsType = {
  teamsWebhookUrl: string;
  projects?: ProjectType[];
  notificationSummary: string;
  notificationDescription: string;
  clickableLinks?: ClickableLinkType[];
};

export const sendMessageToTeams = async (props: SendMessageToTeamsType) => {
  const { projects = [], teamsWebhookUrl, notificationSummary, clickableLinks = [], notificationDescription } = props;
  const formattedProjects = projects.map(({ name, url }) => ({
    name,
    value: url,
  }));

  const formattedLinks = clickableLinks.map(({ description, url }) => {
    return {
      '@type': 'OpenUri',
      name: description,
      targets: [
        {
          os: 'default',
          uri: url,
        },
      ],
    };
  });

  try {
    const res = await axios.post(teamsWebhookUrl, {
      '@type': 'MessageCard',
      '@context': 'http://schema.org/extensions',
      themeColor: '0076D7',
      summary: notificationSummary,
      sections: [
        {
          activityTitle: notificationSummary,
          activitySubtitle: notificationDescription,
          facts: formattedProjects,
          markdown: true,
        },
      ],
      potentialAction: formattedLinks,
    });
    console.log('Notification sent successfully:', res.data);
  } catch (error) {
    throw new Error(error);
  }
};
