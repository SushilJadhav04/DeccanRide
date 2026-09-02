export const serviceLocations = {
  pune: [
    { id: 'pune-rs', name: 'Pune Railway Station', alias: ['Railway Station', 'Pune Station'] },
    { id: 'pune-shivaji', name: 'Shivajinagar', alias: ['Shivaji Nagar'] },
    { id: 'pune-swargate', name: 'Swargate', alias: [] },
    { id: 'pune-hadapsar', name: 'Hadapsar', alias: [] },
    { id: 'pune-kharadi', name: 'Kharadi', alias: ['Kharadi Tech Park'] },
    { id: 'pune-viman', name: 'Viman Nagar', alias: ['Vimaan Nagar', 'Viman'] },
    { id: 'pune-kalyani', name: 'Kalyani Nagar', alias: ['Kalyani'] },
    { id: 'pune-koregaon', name: 'Koregaon Park', alias: ['Koregaon'] },
    { id: 'pune-hinjewadi', name: 'Hinjewadi', alias: ['Hinjewadi Phase'] },
    { id: 'pune-wakad', name: 'Wakad', alias: [] },
    { id: 'pune-baner', name: 'Baner', alias: [] },
    { id: 'pune-aundh', name: 'Aundh', alias: [] },
    { id: 'pune-pimpri', name: 'Pimpri', alias: [] },
    { id: 'pune-chinchwad', name: 'Chinchwad', alias: [] },
    { id: 'pune-airport', name: 'Pune Airport', alias: ['Lohegaon', 'Pune Domestic'] },
  ],
  mumbai: [
    { id: 'mumbai-dadar', name: 'Dadar', alias: ['Dadar Central', 'Dadar East', 'Dadar West'] },
    { id: 'mumbai-andheri', name: 'Andheri', alias: ['Andheri East', 'Andheri West'] },
    { id: 'mumbai-bandra', name: 'Bandra', alias: ['Bandra East', 'Bandra West'] },
    { id: 'mumbai-powai', name: 'Powai', alias: ['Powai Lake'] },
    { id: 'mumbai-borivali', name: 'Borivali', alias: ['Borivli', 'Borivali West'] },
    { id: 'mumbai-thane', name: 'Thane', alias: ['Thane East', 'Thane West'] },
    { id: 'mumbai-navi', name: 'Navi Mumbai', alias: ['NaviMumbai', 'New Mumbai'] },
    { id: 'mumbai-vashi', name: 'Vashi', alias: ['Vashi CBD'] },
    { id: 'mumbai-panvel', name: 'Panvel', alias: [] },
    { id: 'mumbai-airport', name: 'Mumbai Airport', alias: ['Bombay Airport', 'Domestic', 'International', 'T1', 'T2'] },
  ]
};

export const allServiceLocations = [...serviceLocations.pune, ...serviceLocations.mumbai];