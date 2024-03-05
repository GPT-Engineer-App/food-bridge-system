import React, { useState } from "react";
import { Box, Button, Container, FormControl, FormLabel, Input, Stack, Heading, Text, Select, Checkbox, SimpleGrid, Image, Badge, Flex, Spacer, useToast } from "@chakra-ui/react";
import { FaStar, FaShoppingCart, FaClock, FaMapMarkerAlt } from "react-icons/fa";

// Mock data for users
const users = {
  "user1@example.com": { password: "password1", name: "Alice" },
  "user2@example.com": { password: "password2", name: "Bob" },
};

// Mock data for restaurants
const restaurants = [
  {
    id: 1,
    name: "Delicious Pizzas",
    areaCode: "Sector 29",
    operatingHours: "10:00 AM - 11:00 PM",
    location: "123 Pizza Street",
    cuisine: "Italian",
    isFavorite: false,
    items: [
      { name: "Margherita Pizza", price: "8.99", description: "Classic cheese and tomato", available: true },
      // ... other items
    ],
  },
  // ... other restaurants
];

const Index = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [searchAreaCode, setSearchAreaCode] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const toast = useToast();

  const handleLogin = (email, password) => {
    const userInfo = users[email];
    if (userInfo && userInfo.password === password) {
      setUser(userInfo);
      setLoggedIn(true);
    } else {
      toast({
        title: "Login failed",
        description: "Invalid email or password.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleSearch = () => {
    // For simplicity, we're doing a client-side search in the mock data
    const results = restaurants.filter((restaurant) => {
      return restaurant.areaCode.toLowerCase().includes(searchAreaCode.toLowerCase()) && (restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) || restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase()));
    });
    setSearchResults(results);
  };

  // The full functionality of placing orders, booking dining, etc. cannot be
  // implemented in this single file. The following is a simplified interface.

  return (
    <Container maxW="container.xl">
      {!loggedIn && (
        <Stack spacing={4}>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input type="email" />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" />
          </FormControl>
          <Button colorScheme="blue" onClick={() => handleLogin("user1@example.com", "password1")}>
            Log in
          </Button>
        </Stack>
      )}

      {loggedIn && (
        <>
          <Heading>Welcome, {user?.name}</Heading>
          <Box my={6}>
            <FormControl id="areaCode" mb={4}>
              <FormLabel>Area Code</FormLabel>
              <Input placeholder="Enter area code (e.g., Sector 29)" value={searchAreaCode} onChange={(e) => setSearchAreaCode(e.target.value)} />
            </FormControl>
            <FormControl id="searchQuery">
              <FormLabel>Search for Food & Restaurants</FormLabel>
              <Input placeholder="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </FormControl>
            <Button mt={4} colorScheme="teal" onClick={handleSearch}>
              Search
            </Button>
          </Box>

          <SimpleGrid columns={3} spacing={10}>
            {searchResults.map((restaurant) => (
              <Box key={restaurant.id} p={5} shadow="md" borderWidth="1px">
                <Flex>
                  <Heading fontSize="xl">{restaurant.name}</Heading>
                  <Spacer />
                  {restaurant.isFavorite && <FaStar color="gold" />}
                </Flex>
                <Text mt={2}>
                  <FaMapMarkerAlt /> {restaurant.location}
                </Text>
                <Text mt={2}>
                  <FaClock /> {restaurant.operatingHours}
                </Text>
                <Button mt={4} colorScheme="pink" leftIcon={<FaShoppingCart />}>
                  Order Now
                </Button>
              </Box>
            ))}
          </SimpleGrid>
        </>
      )}
    </Container>
  );
};

export default Index;
