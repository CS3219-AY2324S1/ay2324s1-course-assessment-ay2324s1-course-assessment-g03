import { Card } from "@/components";
import {
  DIFFICULTY,
  DifficultyType,
  TOPIC_TAG,
  TopicTagType,
} from "@/constants/question";
import { Preferences } from "@/types/matching";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { Select } from "chakra-react-select";
import { multiSelectStyles } from "@/theme";
import { CustomButton } from "@/components/Layout/CustomButton";

type PreferencesFormValues = {
  difficulty: {
    value: DifficultyType;
    label: DifficultyType;
  }[];
  category: {
    value: TopicTagType;
    label: TopicTagType;
  }[];
};

type Props = {
  joinCallback: (preferences: Preferences) => void;
};

export const SelectPreferencesCard = ({ joinCallback }: Props) => {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<PreferencesFormValues>({
    defaultValues: {
      difficulty: [],
      category: [],
    },
  });

  const onSubmit = handleSubmit(async values => {
    const parsedValues = {
      difficulty: values.difficulty.map(difficulty => difficulty.value),
      category: values.category.map(category => category.value),
    };
    joinCallback(parsedValues);
  });

  return (
    <Card
      backgroundColor="light.600"
      borderRadius="1.2rem"
      padding="2rem"
      w="full"
      maxW="36rem"
    >
      <VStack as="form" gap="1.25rem" onSubmit={onSubmit}>
        <Text alignSelf="start" textStyle="heading-md">
          Select question preferences
        </Text>
        <FormControl isInvalid={!!errors["difficulty"]}>
          <FormLabel color="light.100">Difficulty</FormLabel>
          <Controller
            name="difficulty"
            control={control}
            render={({ field }) => (
              <Select
                // @ts-expect-error Issue with chakra-react-select types (https://github.com/csandman/chakra-react-select/issues/273)
                chakraStyles={multiSelectStyles()}
                isClearable={false}
                isMulti
                options={Object.values(DIFFICULTY).map(difficulty => ({
                  value: difficulty,
                  label: difficulty,
                }))}
                onChange={field.onChange}
              />
            )}
          />
          <FormErrorMessage>
            {errors["difficulty"] && errors["difficulty"].message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors["category"]}>
          <FormLabel color="light.100">Category</FormLabel>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select
                // @ts-expect-error Issue with chakra-react-select types (https://github.com/csandman/chakra-react-select/issues/273)
                chakraStyles={multiSelectStyles()}
                isClearable={false}
                isMulti
                options={Object.values(TOPIC_TAG).map(difficulty => ({
                  value: difficulty,
                  label: difficulty,
                }))}
                onChange={field.onChange}
              />
            )}
          />
          <FormErrorMessage>
            {errors["category"] && errors["category"].message}
          </FormErrorMessage>
        </FormControl>
        <HStack alignSelf="end">
          <CustomButton type="submit" isLoading={isSubmitting}>
            Join room
          </CustomButton>
        </HStack>
      </VStack>
    </Card>
  );
};
