import React from 'react';
import { NavigationContainer, Page } from './Navigation';
import { PortalProvider } from '@gorhom/portal';
import beeshellByName from './components';

const comList = Object.keys(beeshellByName).map(beeshellSuiteName => {
  return {
    name: beeshellSuiteName,
    com: beeshellByName[beeshellSuiteName]
  }
});

comList.sort((a, b) => {
  return a.name.localeCompare(b.name);
});

function App() {
  return (
    <NavigationContainer>
      <PortalProvider>
        {comList.map(com => {
          const TestSuite = com.com;
          return (
            <Page
              key={com.name}
              name={com.name}
            >
              <TestSuite />
            </Page>
          );
        })}
      </PortalProvider>
    </NavigationContainer>
  );
}

export default {
  displayName: 'beeshell',
  framework: 'React',
  category: 'UI',
  title: 'beeshell',
  documentationURL: 'beeshell',
  description: 'beeshell 示例',
  hideTopTitleBar: true,
  examples: [
    {
      title: 'beeshell',
      render: function () {
        return <App />;
      },
    },
  ],
};
