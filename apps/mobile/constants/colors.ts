/**
 * Edunovia App Color Palette
 * 
 * Primary Colors:
 * - Dark Blue: #042C45
 * - Orange: #DF8330  
 * - Green: #0FCB4B
 * - Red: #FF0000
 */

export const colors = {
  // Primary - Dark Blue
  primary: {
    50: '#E6F0F7',
    100: '#CCE1EF',
    200: '#99C3DF',
    300: '#66A5CF',
    400: '#3387BF',
    500: '#042C45', // Main primary color
    600: '#032538',
    700: '#021E2B',
    800: '#01171E',
    900: '#011011',
  },

  // Secondary - Orange
  secondary: {
    50: '#FDF4E8',
    100: '#FBE9D1',
    200: '#F7D3A3',
    300: '#F3BD75',
    400: '#EFA747',
    500: '#DF8330', // Main secondary color
    600: '#B26926',
    700: '#854F1C',
    800: '#583512',
    900: '#2B1B08',
  },

  // Tertiary - Green
  tertiary: {
    50: '#E8F8F0',
    100: '#D1F1E1',
    200: '#A3E3C3',
    300: '#75D5A5',
    400: '#47C787',
    500: '#0FCB4B', // Main tertiary color
    600: '#0CA23C',
    700: '#097A2D',
    800: '#06511E',
    900: '#03290F',
  },

  // Error - Red
  error: {
    50: '#FFE6E6',
    100: '#FFCCCC',
    200: '#FF9999',
    300: '#FF6666',
    400: '#FF3333',
    500: '#FF0000', // Main error color
    600: '#CC0000',
    700: '#990000',
    800: '#660000',
    900: '#330000',
  },

  // Neutral colors
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },

  // Semantic colors
  success: '#0FCB4B',
  warning: '#DF8330',
  info: '#042C45',
  danger: '#FF0000',

  // Common colors
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
} as const;

// Color utility functions
export const getColor = (colorPath: string): string => {
  const keys = colorPath.split('.');
  let result: any = colors;
  
  for (const key of keys) {
    result = result?.[key];
    if (result === undefined) {
      console.warn(`Color path "${colorPath}" not found`);
      return '#000000';
    }
  }
  
  return result;
};

// Predefined color combinations for common use cases
export const colorCombinations = {
  primary: {
    background: colors.primary[500],
    text: colors.white,
    border: colors.primary[600],
  },
  secondary: {
    background: colors.secondary[500],
    text: colors.white,
    border: colors.secondary[600],
  },
  tertiary: {
    background: colors.tertiary[500],
    text: colors.white,
    border: colors.tertiary[600],
  },
  error: {
    background: colors.error[500],
    text: colors.white,
    border: colors.error[600],
  },
  success: {
    background: colors.tertiary[500],
    text: colors.white,
    border: colors.tertiary[600],
  },
  warning: {
    background: colors.secondary[500],
    text: colors.white,
    border: colors.secondary[600],
  },
} as const;

export default colors;
