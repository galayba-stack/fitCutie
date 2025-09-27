
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

export const colors = {
  primary: '#FF9AA2',      // Pastel Pink
  secondary: '#FFB7B2',    // Light Coral
  accent: '#FFDAC1',       // Peach
  background: '#FFF2F2',   // Very Light Pink
  backgroundAlt: '#FFFFFF', // White
  text: '#4A4A4A',         // Dark Gray
  textLight: '#8A8A8A',    // Light Gray
  success: '#B5EAD7',      // Mint Green
  warning: '#FFE5B4',      // Light Yellow
  teal: '#C7CEEA',         // Light Teal
  card: '#FFFFFF',         // White cards
  shadow: 'rgba(255, 154, 162, 0.2)', // Pink shadow
};

export const buttonStyles = StyleSheet.create({
  primary: {
    backgroundColor: colors.primary,
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: `0px 4px 12px ${colors.shadow}`,
    elevation: 4,
  },
  secondary: {
    backgroundColor: colors.secondary,
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: `0px 4px 12px ${colors.shadow}`,
    elevation: 4,
  },
  accent: {
    backgroundColor: colors.accent,
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: `0px 4px 12px ${colors.shadow}`,
    elevation: 4,
  },
});

export const commonStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.textLight,
    marginBottom: 30,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.text,
    lineHeight: 24,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 20,
    marginVertical: 10,
    boxShadow: `0px 4px 12px ${colors.shadow}`,
    elevation: 4,
  },
  activityCard: {
    backgroundColor: colors.card,
    borderRadius: 25,
    padding: 25,
    marginVertical: 15,
    alignItems: 'center',
    boxShadow: `0px 6px 16px ${colors.shadow}`,
    elevation: 6,
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  headerButton: {
    padding: 10,
    borderRadius: 15,
    backgroundColor: colors.backgroundAlt,
    boxShadow: `0px 2px 8px ${colors.shadow}`,
    elevation: 2,
  },
});
