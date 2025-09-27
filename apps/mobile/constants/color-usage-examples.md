# Edunovia Color Usage Examples

## Tailwind CSS Classes

### Primary Colors (Dark Blue - #042C45)
```jsx
// Backgrounds
<View className="bg-primary-500" />     // Main primary color
<View className="bg-primary-100" />     // Light primary
<View className="bg-primary-900" />     // Dark primary

// Text
<Text className="text-primary-500" />  // Primary text
<Text className="text-primary-600" />  // Darker primary text

// Borders
<View className="border-primary-500" /> // Primary border
```

### Secondary Colors (Orange - #DF8330)
```jsx
// Backgrounds
<View className="bg-secondary-500" />    // Main secondary color
<View className="bg-secondary-100" />  // Light secondary
<View className="bg-secondary-900" />   // Dark secondary

// Text
<Text className="text-secondary-500" /> // Secondary text
```

### Tertiary Colors (Green - #0FCB4B)
```jsx
// Backgrounds
<View className="bg-tertiary-500" />   // Main tertiary color
<View className="bg-tertiary-100" />   // Light tertiary

// Text
<Text className="text-tertiary-500" /> // Tertiary text
```

### Error Colors (Red - #FF0000)
```jsx
// Backgrounds
<View className="bg-error-500" />      // Main error color
<View className="bg-error-100" />      // Light error

// Text
<Text className="text-error-500" />    // Error text
```

### Semantic Colors
```jsx
// Direct semantic colors
<View className="bg-success" />         // Green success
<View className="bg-warning" />        // Orange warning
<View className="bg-info" />           // Dark blue info
<View className="bg-danger" />         // Red danger

<Text className="text-success" />      // Success text
<Text className="text-warning" />      // Warning text
<Text className="text-info" />         // Info text
<Text className="text-danger" />       // Danger text
```

## JavaScript/TypeScript Usage

```typescript
import { colors, getColor } from '@/constants/colors';

// Direct color access
const primaryColor = colors.primary[500]; // '#042C45'
const secondaryColor = colors.secondary[500]; // '#DF8330'

// Using the utility function
const customColor = getColor('primary.500'); // '#042C45'
const errorColor = getColor('error.500'); // '#FF0000'

// In React Native StyleSheet
const styles = StyleSheet.create({
  primaryButton: {
    backgroundColor: colors.primary[500],
    color: colors.white,
  },
  errorText: {
    color: colors.error[500],
  },
});
```

## Common Use Cases

### Buttons
```jsx
// Primary button
<TouchableOpacity className="bg-primary-500 py-3 px-6 rounded-lg">
  <Text className="text-white text-center font-semibold">Primary Button</Text>
</TouchableOpacity>

// Secondary button
<TouchableOpacity className="bg-secondary-500 py-3 px-6 rounded-lg">
  <Text className="text-white text-center font-semibold">Secondary Button</Text>
</TouchableOpacity>

// Success button
<TouchableOpacity className="bg-tertiary-500 py-3 px-6 rounded-lg">
  <Text className="text-white text-center font-semibold">Success Button</Text>
</TouchableOpacity>

// Error button
<TouchableOpacity className="bg-error-500 py-3 px-6 rounded-lg">
  <Text className="text-white text-center font-semibold">Error Button</Text>
</TouchableOpacity>
```

### Cards
```jsx
<View className="bg-white border border-primary-200 rounded-xl p-4">
  <Text className="text-primary-800 font-semibold">Card Title</Text>
  <Text className="text-gray-600">Card content</Text>
</View>
```

### Status Indicators
```jsx
// Success status
<View className="bg-tertiary-100 border border-tertiary-300 rounded-lg p-3">
  <Text className="text-tertiary-800">Success message</Text>
</View>

// Error status
<View className="bg-error-100 border border-error-300 rounded-lg p-3">
  <Text className="text-error-800">Error message</Text>
</View>

// Warning status
<View className="bg-secondary-100 border border-secondary-300 rounded-lg p-3">
  <Text className="text-secondary-800">Warning message</Text>
</View>
```