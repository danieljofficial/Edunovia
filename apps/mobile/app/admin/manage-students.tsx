import { classes, students } from '@/constants';
import { useTranslation } from '@/hooks/useTranslation';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ManageStudentsScreen() {
  const { t } = useTranslation();
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  const filteredStudents = students.filter(student => {
    const matchesClass = !selectedClass || student.class === selectedClass;
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesClass && matchesSearch;
  });

  const handleStudentPress = (student: any) => {
    setSelectedStudent(student);
  };

  const handlePromote = (studentId: number) => {
    // Handle promote logic
    console.log('Promote student:', studentId);
  };

  const handleRemove = (studentId: number) => {
    // Handle remove logic
    console.log('Remove student:', studentId);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1">
        {/* Header */}
        <View className="flex-row items-center justify-between px-6 py-4 bg-white">
          <TouchableOpacity onPress={() => router.back()}>
            <Text className="text-2xl">←</Text>
          </TouchableOpacity>
          <Text className="text-xl font-bold text-gray-800">{t('manage_students')}</Text>
          <View className="w-6" />
        </View>

        <ScrollView className="flex-1 px-6">
          {/* Class Selection */}
          {!selectedClass && (
            <View className="mb-6">
              <Text className="text-lg font-bold text-gray-800 mb-4">Select Class</Text>
              <View className="flex-row flex-wrap justify-between">
                {classes.map((className) => (
                  <TouchableOpacity
                    key={className}
                    onPress={() => setSelectedClass(className)}
                    className="w-[48%] bg-white rounded-2xl p-4 items-center mb-3 shadow-sm"
                  >
                    <Text className="text-gray-800 font-semibold">{className}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Student List */}
          {selectedClass && (
            <View className="mb-6">
              <View className="flex-row items-center justify-between mb-4">
                <TouchableOpacity onPress={() => setSelectedClass(null)}>
                  <Text className="text-blue-600 font-semibold">← Back to Classes</Text>
                </TouchableOpacity>
                <Text className="text-lg font-bold text-gray-800">{selectedClass}</Text>
              </View>

              {/* Search Bar */}
              <View className="mb-4">
                <TextInput
                  placeholder="Search students..."
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  className="bg-white py-3 px-4 rounded-2xl shadow-sm"
                />
              </View>

              {/* Students List */}
              <View className="space-y-3">
                {filteredStudents.map((student) => (
                  <View key={student.id} className="bg-white rounded-2xl p-4 shadow-sm">
                    <View className="flex-row items-center justify-between">
                      <TouchableOpacity
                        onPress={() => handleStudentPress(student)}
                        className="flex-1"
                      >
                        <View className="flex-row items-center">
                          <View className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center mr-4">
                            <Text className="text-xl">
                              {student.gender === 'Male' ? '👦' : '👧'}
                            </Text>
                          </View>
                          <View className="flex-1">
                            <Text className="text-lg font-semibold text-gray-800">{student.name}</Text>
                            <Text className="text-gray-600 text-sm">click to see profile</Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                      <View className="flex-row space-x-2">
                        <TouchableOpacity
                          onPress={() => handlePromote(student.id)}
                          className="bg-green-500 px-4 py-2 rounded-lg"
                        >
                          <Text className="text-white font-semibold text-sm">PROMOTE</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => handleRemove(student.id)}
                          className="bg-red-500 px-4 py-2 rounded-lg"
                        >
                          <Text className="text-white font-semibold text-sm">REMOVE</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          )}
        </ScrollView>

        {/* Student Profile Modal */}
        {selectedStudent && (
          <View className="absolute inset-0 bg-black/50 items-center justify-center">
            <View className="bg-white rounded-2xl p-6 mx-6 w-80">
              <View className="items-center mb-6">
                <View className="w-20 h-20 bg-blue-100 rounded-full items-center justify-center mb-4">
                  <Text className="text-4xl">
                    {selectedStudent.gender === 'Male' ? '👦' : '👧'}
                  </Text>
                </View>
                <Text className="text-xl font-bold text-gray-800">{selectedStudent.name}</Text>
              </View>

              <View className="space-y-3 mb-6">
                <View className="flex-row justify-between">
                  <Text className="text-gray-600">Class:</Text>
                  <Text className="font-semibold">{selectedStudent.class}</Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-gray-600">Age:</Text>
                  <Text className="font-semibold">{selectedStudent.age} years</Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-gray-600">Gender:</Text>
                  <Text className="font-semibold">{selectedStudent.gender}</Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-gray-600">Attendance:</Text>
                  <Text className="font-semibold text-green-600">{selectedStudent.attendance}%</Text>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => setSelectedStudent(null)}
                className="bg-gray-200 py-3 rounded-2xl"
              >
                <Text className="text-gray-800 font-semibold text-center">Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
