import * as React from 'react';
import { StyleSheet } from "react-native"
import { Appbar } from 'react-native-paper';
import { getHeaderTitle } from '@react-navigation/elements';

const Header = ({ navigation, route, options, back }) => {
  const title = getHeaderTitle(options, route.name);

  const _handleMore = () => console.log('Shown more');

  return (
    <Appbar.Header style={styles.headerContainer}>
      {back && <Appbar.BackAction onPress={navigation.goBack} />}
      <Appbar.Content title={title} />
      <Appbar.Action icon="dots-vertical" onPress={_handleMore} />
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
	headerContainer: {
		backgroundColor: "#fff",
    marginBottom: 0,
	},
});

export default Header;