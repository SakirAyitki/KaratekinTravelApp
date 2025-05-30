import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import PagerView from 'react-native-pager-view';
import { OnboardingScreenProps, OnboardingData } from '../types';

const { width, height } = Dimensions.get('window');

const onboardingData: OnboardingData[] = [
  {
    id: 1,
    image: require('../../assets/ob1.png'),
    title: "People don't take trips, trips take",
    highlightText: "people",
    description: "To get the best of your adventure you just need to leave and go where you like. we are waiting for you",
    backgroundColor: ['#87CEEB', '#B8E6FF'],
  },
  {
    id: 2,
    image: require('../../assets/ob2.png'),
    title: "It's a big world out there go",
    highlightText: "explore",
    description: "To get the best of your adventure you just need to leave and go where you like. we are waiting for you",
    backgroundColor: ['#9966CC', '#FF6B9D'],
  },
  {
    id: 3,
    image: require('../../assets/ob3.png'),
    title: "Life is short and the world is",
    highlightText: "wide",
    description: "At Friends tours and travel, we customize reliable and trutworthy educational tours to destinations all over the world",
    backgroundColor: ['#87CEEB', '#B8E6FF'],
  },
];

export default function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const pagerRef = useRef<PagerView>(null);

  const handleNext = () => {
    if (currentPage < onboardingData.length - 1) {
      const nextPage = currentPage + 1;
      pagerRef.current?.setPage(nextPage);
      setCurrentPage(nextPage);
    } else {
      onComplete();
    }
  };

  const onPageSelected = (event: any) => {
    setCurrentPage(event.nativeEvent.position);
  };

  const renderPage = (item: typeof onboardingData[0], index: number) => {
    const isLastPage = index === onboardingData.length - 1;

    return (
      <View key={item.id} style={styles.pageContainer}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
        
        {/* Image Container */}
        <View style={styles.imageContainer}>
          <Image 
            source={item.image} 
            style={styles.illustrationImage}
            resizeMode="cover"
          />
        </View>

        {/* Content Container */}
        <View style={styles.contentContainer}>
          {/* Title */}
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>
              {item.title}{' '}
              <Text style={styles.highlightText}>{item.highlightText}</Text>
            </Text>
            <View style={styles.underline} />
          </View>

          {/* Description */}
          <Text style={styles.description}>{item.description}</Text>

          {/* Page Indicators */}
          <View style={styles.paginationContainer}>
            {onboardingData.map((_, i) => (
              <View
                key={i}
                style={[
                  styles.paginationDot,
                  i === currentPage ? styles.paginationDotActive : styles.paginationDotInactive,
                ]}
              />
            ))}
          </View>

          {/* Next/Get Started Button */}
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>
              {isLastPage ? 'Get Started' : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <PagerView
        ref={pagerRef}
        style={styles.pagerView}
        initialPage={0}
        onPageSelected={onPageSelected}
      >
        {onboardingData.map((item, index) => (
          <View key={item.id}>
            {renderPage(item, index)}
          </View>
        ))}
      </PagerView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  pagerView: {
    flex: 1,
  },
  pageContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  imageContainer: {
    flex: 0.6,
    width: width,
    overflow: 'hidden',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  illustrationImage: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 0.4,
    paddingHorizontal: 32,
    paddingVertical: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  titleText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
    lineHeight: 36,
    marginBottom: 8,
  },
  highlightText: {
    color: '#FF6B35',
    fontSize: 28,
    fontWeight: 'bold',
  },
  underline: {
    width: 60,
    height: 3,
    backgroundColor: '#FF6B35',
    borderRadius: 2,
  },
  description: {
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  paginationDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#24BAEC',
    width: 24,
  },
  paginationDotInactive: {
    backgroundColor: '#E0E7FF',
  },
  nextButton: {
    backgroundColor: '#24BAEC',
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 25,
    width: width - 64,
    alignItems: 'center',
    shadowColor: '#24BAEC',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
}); 