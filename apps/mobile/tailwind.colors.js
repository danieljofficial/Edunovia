/**
 * Tailwind CSS Color Configuration for Edunovia App
 * This file extends the default Tailwind colors with our custom color palette
 */

const colors = require('./constants/colors');

module.exports = {
  // Extend default colors with our custom palette
  extend: {
    colors: {
      // Primary - Dark Blue
      primary: colors.primary,
      
      // Secondary - Orange  
      secondary: colors.secondary,
      
      // Tertiary - Green
      tertiary: colors.tertiary,
      
      // Error - Red
      error: colors.error,
      
      // Semantic colors
      success: colors.success,
      warning: colors.warning,
      info: colors.info,
      danger: colors.danger,
    }
  }
};
