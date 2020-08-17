import React from 'react';

const PrivateContext = React.createContext({
    clients: null,
    company: null,
    reports: null,
    schedulFilter: null,
    scheduleSearch: null,
    fetchClients: () => {},
    fetchCompany: () => {},
    fetchContext: () => {},
    fetchReports: () => {},
    setScheduleFilter: () => {},
    setScheduleSearch: () => {},
    updateContext: () => {},
});

export default PrivateContext;
