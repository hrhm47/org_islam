import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const About= () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About Our App {"\n" }Welcome to our Islamic App!
      
      </Text>
      <Text style={styles.content}>
        

Our app is designed to provide you with a comprehensive and immersive Islamic experience. With a range of features and functionalities, we aim to make your journey through the Quran and Hadiths easier and more fulfilling.</Text>

<Text style={styles.title}>Quran Feature:</Text>
<Text style={styles.content}>- Explore the Quran: Our app allows you to access the complete text of the Quran in multiple translations, making it easy to read and understand the divine message.
- Voice Search: Experience the convenience of searching for specific verses or passages using voice commands. Simply speak out the verse or keywords, and our app will highlight the relevant portions for you.
- Tajweed Support: Our app incorporates Tajweed rules to ensure accurate pronunciation and recitation. The text is color-coded to help you identify the different Tajweed rules applied to each word or letter, enhancing your recitation and understanding.</Text>

 <Text style={styles.title}>Hadith Feature:</Text>
 <Text style={styles.content}>- Hadith Collection: Dive into the vast collection of Hadiths from renowned sources such as Sahih al-Bukhari, Sahih Muslim, and more. Explore the teachings, wisdom, and guidance of the Prophet Muhammad (peace be upon him) and learn from his exemplary life.
- Search and Explore: Our app enables you to search for Hadiths based on keywords or topics of interest. Discover relevant Hadiths on various subjects and gain valuable insights into Islamic teachings.
- Share and Bookmark: Easily share your favorite Hadiths with friends and family or bookmark them for quick access later. Build your personal collection of meaningful Hadiths and references.
</Text>
<Text style={styles.title}>Additional Features:</Text>
<Text style={styles.content}>- Islamic Dictionary: Access an extensive Islamic dictionary to expand your knowledge of Islamic terms, concepts, and terminology. Gain a deeper understanding of the rich Islamic heritage.
- Daily Reminders: Set up personalized daily reminders for Quran recitation or Hadith reading to keep yourself connected to the teachings of Islam on a regular basis.
- Customization: Personalize your app experience by choosing different themes, font sizes, and recitation styles to suit your preferences.

We strive to provide you with a user-friendly interface, informative content, and a seamless experience. Our goal is to facilitate your spiritual journey and make learning about Islam more accessible and enjoyable.

Download our app now and embark on a meaningful and enlightening journey through the Quran and Hadiths. May this app be a source of knowledge, guidance, and blessings in your life.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    color:"#104586",
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  content: {
    fontSize: 18,
    lineHeight: 26,
  },
});

export default About;
