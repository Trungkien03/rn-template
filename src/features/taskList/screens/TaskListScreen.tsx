import TextView from "@app/components/UI/TextView";
import { ThemeType } from "@app/themes";
import { MaterialIcons } from "@expo/vector-icons";
import { Box, Button, Icon, useTheme, VStack } from "native-base";
import React from "react";
import EditableTask from "../components/EditableTask";
import { Todo } from "@app/types/todo";

const TaskListScreen = () => {
  const theme = useTheme() as ThemeType;

  const tasks: Todo[] = [
    {
      id: 1,
      title: "Task 1",
      priority: "high",
      dueIn: "Còn 2 ngày",
      isCompleted: false,
    },
    {
      id: 2,
      title: "Task 2",
      priority: "medium",
      dueIn: "Còn 2 ngày",
      isCompleted: false,
    },
  ];

  return (
    <Box bg={theme.colors.background} safeArea flex={1} p={4}>
      {/* Page Title */}
      <TextView
        fontSize="2xl"
        fontWeight="bold"
        color={theme.colors.white}
        textAlign="center"
        mb={4}
      >
        To-do list
      </TextView>

      {/* Task List */}
      <VStack space={4}>
        {tasks.map((task) => (
          <EditableTask key={task.id} task={task} />
        ))}
      </VStack>

      {/* Add Task Button */}
      <Button
        position="absolute"
        bottom={4}
        left={4}
        right={4}
        bg={theme.colors.primary[500]}
        borderRadius="full"
        shadow={3}
        startIcon={<Icon as={MaterialIcons} name="add" color="white" />}
        _pressed={{ bg: theme.colors.primary[600] }}
        onPress={() => console.log("Add new task")}
      >
        Tạo task mới
      </Button>
    </Box>
  );
};

export default TaskListScreen;
