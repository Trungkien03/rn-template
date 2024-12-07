import TextView from "@app/components/UI/TextView";
import useSize from "@app/hooks/useSize";
import { ThemeType } from "@app/themes";
import { Todo } from "@app/types/todo";
import { MaterialIcons } from "@expo/vector-icons";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  HStack,
  Icon,
  Input,
  Spacer,
  Text,
  VStack,
  useTheme,
} from "native-base";
import React, { useState } from "react";
import { Animated, Platform } from "react-native";
import RNPickerSelect from "react-native-picker-select";

const EditableTask = ({ task }: { task: Todo }) => {
  const theme = useTheme() as ThemeType;
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [priority, setPriority] = useState(task.priority);
  const [dueDate, setDueDate] = useState(task.dueDate);
  const { fontSize } = useSize();

  const [showDatePicker, setShowDatePicker] = useState(false);

  const animatedHeight = React.useRef(new Animated.Value(60)).current;

  const toggleEditMode = () => {
    const targetHeight = isEditing ? 60 : 300; // Adjust the expanded height based on the form
    Animated.timing(animatedHeight, {
      toValue: targetHeight,
      duration: 500,
      useNativeDriver: false,
    }).start();
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    console.log(`Saved task: ${title}, Priority: ${priority}, Due: ${dueDate}`);
    toggleEditMode();
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDueDate(selectedDate.toISOString().split("T")[0]);
    }
  };

  return (
    <Animated.View style={[{ height: animatedHeight }]}>
      <Box bg={theme.colors.card.background} borderRadius="lg" p={4} shadow={2}>
        {!isEditing && (
          <HStack justifyContent="space-between" alignItems="center">
            {/* Left: Checkbox and Task Info */}
            <HStack alignItems="center">
              <Checkbox
                isChecked={task.isCompleted}
                value={`${task.id}`}
                size="lg"
                accessibilityLabel="Mark as complete"
                colorScheme={
                  task.priority === "high"
                    ? "danger"
                    : task.priority === "medium"
                      ? "warning"
                      : "gray"
                }
              />
              <VStack ml={3}>
                <TextView
                  fontWeight="bold"
                  color={theme.colors.text}
                  lineHeight={22} // Consistent spacing
                >
                  {title}
                </TextView>
                <TextView
                  color={
                    task.priority === "high"
                      ? theme.colors.danger[500]
                      : task.priority === "medium"
                        ? theme.colors.warning[500]
                        : theme.colors.text
                  }
                  lineHeight={20} // Consistent spacing
                >
                  Ưu tiên{" "}
                  {task.priority === "high"
                    ? "cao"
                    : task.priority === "medium"
                      ? "trung bình"
                      : "thấp"}
                </TextView>
              </VStack>
            </HStack>

            {/* Right: Due Date and Edit Icon */}
            <HStack alignItems="center" space={2}>
              <TextView
                fontSize="sm"
                color={theme.colors.text}
                lineHeight={20} // Consistent spacing
              >
                {dueDate}
              </TextView>
              <Button
                variant="unstyled"
                onPress={toggleEditMode}
                leftIcon={
                  <Icon
                    as={MaterialIcons}
                    name="edit"
                    size="lg"
                    color={theme.colors.primary[500]}
                  />
                }
              />
            </HStack>
          </HStack>
        )}

        {/* Edit View */}
        {isEditing && (
          <>
            <HStack>
              <Spacer />
              <Button
                variant="unstyled"
                onPress={() => console.log("Delete task")}
                leftIcon={
                  <Icon
                    as={MaterialIcons}
                    name="delete"
                    size="lg"
                    color={theme.colors.danger[500]}
                  />
                }
              >
                <Text fontSize="sm" color={theme.colors.text}>
                  Xóa
                </Text>
              </Button>
            </HStack>

            {/* Title */}
            <VStack my={2} space={2}>
              <Input
                value={title}
                onChangeText={setTitle}
                fontSize={fontSize}
                fontWeight="bold"
                color={theme.colors.primary[500]}
                variant={"unstyled"}
                lineHeight={24} // Consistent spacing
                p={0}
              />
              <Divider />
            </VStack>

            {/* Due Date */}
            <VStack my={2} space={2}>
              <HStack justifyContent="space-between" alignItems="center">
                <TextView
                  fontWeight="bold"
                  color={theme.colors.text}
                  lineHeight={24}
                >
                  Thời hạn
                </TextView>
                <TextView
                  fontWeight="bold"
                  textAlign="right"
                  onPress={() => setShowDatePicker(true)}
                  color={theme.colors.primary[500]}
                  lineHeight={24}
                >
                  {dueDate || "Chọn ngày"}
                </TextView>
              </HStack>
              <Divider />
            </VStack>

            {showDatePicker && (
              <RNDateTimePicker
                mode="date"
                value={new Date(dueDate)}
                onChange={handleDateChange}
                display={Platform.OS === "ios" ? "inline" : "default"}
              />
            )}

            {/* Priority */}
            <VStack my={2} space={2}>
              <HStack justifyContent="space-between" alignItems="center">
                <TextView
                  fontWeight="bold"
                  color={theme.colors.text}
                  lineHeight={24}
                >
                  Mức độ ưu tiên
                </TextView>
                <Spacer />
                <Box flex={1}>
                  <RNPickerSelect
                    onValueChange={(value) => setPriority(value)}
                    value={priority}
                    placeholder={{ label: "Chọn mức độ ưu tiên", value: null }}
                    items={[
                      { label: "Cao", value: "high" },
                      { label: "Trung bình", value: "medium" },
                      { label: "Thấp", value: "low" },
                    ]}
                    useNativeAndroidPickerStyle={false} // Ensure custom styling works
                    style={{
                      inputAndroid: {
                        textAlign: "right", // Aligns text to the right
                        color: theme.colors.primary[500],
                        fontSize: 16,
                        fontWeight: "bold",
                      },
                      inputIOS: {
                        textAlign: "right", // Aligns text to the right
                        color: theme.colors.primary[500],
                        fontSize: 16,
                        fontWeight: "bold",
                      },
                      placeholder: {
                        textAlign: "right", // Align placeholder to the right
                        color: theme.colors.text,
                      },
                    }}
                  />
                </Box>
              </HStack>
              <Divider />
            </VStack>

            <Button
              mt={2}
              bg={theme.colors.success[500]}
              _text={{ color: "white", fontWeight: "bold" }}
              borderRadius="3xl"
              px={5}
              py={2}
              alignSelf="center"
              onPress={handleSave}
            >
              Xong
            </Button>
          </>
        )}
      </Box>
    </Animated.View>
  );
};

export default EditableTask;
