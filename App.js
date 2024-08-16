import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { TransitionSpecs, CardStyleInterpolators } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';

// Enable screens to improve performance
enableScreens();

// Custom Transition Spec
const transitionSpec = {
  open: TransitionSpecs.TransitionIOSSpec,
  close: TransitionSpecs.TransitionIOSSpec,
};

const screenOptions = {
  cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
  transitionSpec,
};

// Screen Components
function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.cdmText}>CDM</Text>
      <View style={styles.box}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry={true}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Main')}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.registerText}>Register</Text>
      </View>
    </View>
  );
}

function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.cdmText}>Welcome to CDM Procurement Management</Text>
    </View>
  );
}

function ShopScreen() {
  const items = [
    { id: '1', title: 'Item 1', image: require('./assets/ballpen.jpg') },
    { id: '2', title: 'Item 2', image: require('./assets/ballpen.jpg') },
    { id: '3', title: 'Item 3', image: require('./assets/ballpen.jpg') },
    { id: '4', title: 'Item 4', image: require('./assets/ballpen.jpg') },
    { id: '5', title: 'Item 5', image: require('./assets/ballpen.jpg') },
    { id: '6', title: 'Item 6', image: require('./assets/ballpen.jpg') },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={item.image} style={styles.itemImage} />
      <Text style={styles.itemText}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.shopContainer}>
      <Text style={styles.shopText}>SHOP</Text>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={4} // Static value for 4 items per row
        contentContainerStyle={styles.galleryContainer}
      />
    </View>
  );
}

function ProfileScreen({ navigation }) {
  const [profileImage, setProfileImage] = React.useState(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <View style={styles.profileContainer}>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out" size={24} color="#fff" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
      <View style={styles.outermostBorderContainer}>
        <View style={styles.outerBorderContainer}>
          <View style={styles.innerBorderContainer}>
            <TouchableOpacity style={styles.profileImageContainer} onPress={pickImage}>
              {profileImage ? (
                <Image source={{ uri: profileImage }} style={styles.profileImage} />
              ) : (
                <Text style={styles.profileImagePlaceholder}>Profile Image</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Text style={styles.profileNameText}>Michael Noya</Text>
    </View>
  );
}

// Stack Navigator
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Shop') {
            iconName = 'cart';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FFD700',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Shop" component={ShopScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={screenOptions}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={HomeTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#006400',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cdmText: {
    fontSize: 50,
    color: '#FFD700',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  box: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    color: '#333',
  },
  button: {
    backgroundColor: '#006400',
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  registerText: {
    color: '#1e90ff',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  profileContainer: {
    flex: 1,
    backgroundColor: '#006400',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 70,
    paddingHorizontal: 20,
  },
  logoutButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
  },
  logoutText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 16,
  },
  outermostBorderContainer: {
    width: 208,
    height: 208,
    borderRadius: 110,
    borderWidth: 5,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  outerBorderContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  innerBorderContainer: {
    width: 185,
    height: 185,
    borderRadius: 93,
    borderWidth: 5,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  profileImageContainer: {
    width: 185,
    height: 185,
    borderRadius: 93,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 93,
  },
  profileImagePlaceholder: {
    color: '#888',
    fontSize: 16,
    textAlign: 'center',
  },
  profileNameText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 20,
  },
  shopContainer: {
    flex: 1,
    backgroundColor: '#006400',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  shopText: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  galleryContainer: {
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  itemContainer: {
    flex: 1,
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 5,
    alignItems: 'center',
  },
  itemImage: {
    width: 80, // Adjust size to fit the 4 columns
    height: 80, // Adjust size to fit the 4 columns
    borderRadius: 10,
  },
  itemText: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
});
