// components/Navigation.js
import React, { useEffect } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native';

const NavigationContext = React.createContext();

export function NavigationContainer({
  initialPage = 'INDEX',
  children,
}) {
  const [currentPageName, setCurrentPageName] = React.useState(initialPage);
  const [registeredPageNames, setRegisteredPageNames] = React.useState([]);

  return (
    <NavigationContext.Provider
      value={{
        currentPageName,
        navigateTo: setCurrentPageName,
        registerPageName: (pageName) => {
          setRegisteredPageNames(pageNames => {
            if (pageNames.includes(pageName)) {
              return pageNames;
            }
            return [...pageNames, pageName];
          });
        },
        registeredPageNames,
      }}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
        <Page name="INDEX">
          <IndexPage />
        </Page>
        {children}
      </SafeAreaView>
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  return React.useContext(NavigationContext);
}

export function Page({ name, children }) {
  const { currentPageName, navigateTo, registerPageName } = useNavigation();

  useEffect(() => {
    if (name !== 'INDEX') {
      registerPageName(name);
    }
  }, [name]);

  // 格式化组件名称显示
  const formatPageTitle = (pageName) => {
    return pageName.replace('Example', '');
  };

  return name === currentPageName ? (
    <View style={{ flex: 1 }}>
      {name !== 'INDEX' && (
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              navigateTo('INDEX');
            }}
          >
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{formatPageTitle(name)}</Text>
          <View style={styles.headerRight} />
        </View>
      )}
      <View style={{ flex: 1 }}>{children}</View>
    </View>
  ) : null;
}

export function IndexPage() {
  const { navigateTo, registeredPageNames } = useNavigation();
  
  const formatName = (name) => {
    return name.replace('Example', '');
  };

  const data = registeredPageNames.map((name, index) => ({
    id: (index + 1).toString(),
    name: formatName(name),
    page: name
  }));

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.listItem} 
      onPress={() => navigateTo(item.page)}
    >
      <Text style={styles.itemText}>{item.name}</Text>
      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    flex: 1,
  },
  headerRight: {
    width: 40,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    fontSize: 24,
    color: '#333',
    fontWeight: '300',
  },
  list: {
    flex: 1,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  itemText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  arrow: {
    fontSize: 18,
    color: '#c7c7cc',
    fontWeight: '300',
  },
});
