import React from 'react';
import { Stack } from 'expo-router';

const RootLayout = () => {
  return (
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="lectures" options={{ headerShown: false }} />
        <Stack.Screen name="aboutLecture" options={{ headerShown: false }} />
        <Stack.Screen name="speaker" options={{ headerShown: false }} />
        <Stack.Screen
          name="lecturesObjective"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="targetPublicLectures"
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen name="reviewSociety" options={{ headerShown: false }} />
        <Stack.Screen name="volunteerWork" options={{ headerShown: false }} />
        <Stack.Screen name="faq" options={{ headerShown: false }} />
         <Stack.Screen name="AboutUsSection" options={{ headerShown: false }} />
        <Stack.Screen name="EventsCalendar" options={{ headerShown: false }} />
        <Stack.Screen name="../components/FaqSection" options={{ headerShown: false }} />
        <Stack.Screen name="LectureCaroseul" options={{ headerShown: false }} />
        <Stack.Screen name="ReviewSection" options={{ headerShown: false }} />
                <Stack.Screen name="VolunteerWorkCaroseul" options={{ headerShown: false }} /> */}

      </Stack>
  );
};

export default RootLayout;
