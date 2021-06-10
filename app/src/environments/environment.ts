export const environment = {
  production: false,
  background: '#000000',
  color: '#FFFFFF',
  api: {
    version: 0.1,
    url: 'http://localhost:3000/api/v1'
  },
  client_key: {
    google: {
      key_api: 'AIzaSyA_g8B-LU_hYFlkITq7teQQguCBWFOIsXc',
      key: '707157526578-a5ehqvl8o3m3aa05mnqllo3pekkqcj81.apps.googleusercontent.com',
      scope: 'profile email'
    },
    facebook: {
      key: '275946847237532',
      scope: 'pages_messaging,pages_messaging_subscriptions,email,pages_show_list,manage_pages'
    }
  },
  social_network: {
    facebook: {
      url: '',
      title: 'Nguyen Qui'
    },
    email: {
      url: '',
      title: 'nguyendinhqui1029@gmail.com'
    },
    youtube: {
      url: 'https://www.youtube.com/channel/UCVPYEr8dn3R1NnQuerBjbXg',
      title: 'Qui Nguyen Vlog'
    }
  }
};

