import React, { useCallback, useState, useEffect } from 'react';
import { View, Image, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import landingImg from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import giveClassesIcon from '../../assets/images/icons/give-classes.png';
import purpleHeartIcon from '../../assets/images/icons/heart.png'

import api from '../../services/api';

import styles from './styles';

const Landing: React.FC = () => {
  const { navigate } = useNavigation();
  const [totalConnections, setTotalConnections] = useState(0);

  const handleNavigateToGiveClassesPage = useCallback(() => {
    navigate('GiveClasses')
  }, []);

  const handleNavigateToStudyPage = useCallback(() => {
    navigate('StudyTabs')
  }, []);


  useEffect(() => {
    api.get(`connections`).then(({ data }) => {
      const { total } = data;
      
      setTotalConnections(total)
    });
  }, [])

  return (
    <View style={styles.container}>
      <Image source={landingImg} style={styles.banner} />
      <Text style={styles.title}>
        Seja bem-vindo, {'\n'}
        <Text style={styles.titleBold}>
          Oque deseja fazer ?
        </Text>
      </Text>

      <View style={styles.buttonsContainer}>
        <RectButton
          onPress={handleNavigateToStudyPage}
          style={[styles.button, styles.buttonPrimary]}>
          <Image source={studyIcon} />

          <Text style={styles.buttonText}>Estudar</Text>
        </RectButton>

        <RectButton
          onPress={handleNavigateToGiveClassesPage}
          style={[styles.button, styles.buttonSecondary]}>
          <Image source={giveClassesIcon} />

          <Text style={styles.buttonText}>Dar aulas</Text>
        </RectButton>
      </View>

      <Text style={styles.totalConnections}>Total de {totalConnections} conexões já realizadas {' '}<Image source={purpleHeartIcon} /></Text>
    </View>
  );
}

export default Landing;