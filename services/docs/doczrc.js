export default {
  title: 'Node Assistant',
  description: 'Easy way to create cross-platform CLI',
  typescript: true,
  menu: [
    'Main',
    {
      name: 'Packages',
      menu: [{ name: 'Index', route: '/packages' }],
    },
    {
      name: 'GitHub',
      menu: [
        { name: 'Repo', href: 'https://github.com/olavoasantos/node-assistant/' },
        { name: 'Issues', href: 'https://github.com/olavoasantos/node-assistant/issues' },
        { name: 'Pull requests', href: 'https://github.com/olavoasantos/node-assistant/pulls' },
      ],
    },
  ],
  themeConfig: {
    styles: {
      h1: {
        fontSize: 50,
      },
    },
  },
};
