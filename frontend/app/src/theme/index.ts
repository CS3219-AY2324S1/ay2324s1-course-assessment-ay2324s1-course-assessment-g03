import { Table, extendTheme } from "@chakra-ui/react";
import { colors, textStyles, fonts } from "./foundations";
import { Text, Spinner, Button, Menu, Tag, Modal } from "./components";

export const theme = extendTheme({
  components: {
    Text,
    Spinner,
    Button,
    Table,
    Menu,
    Tag,
    Modal,
  },
  colors,
  textStyles,
  fonts,
  styles: {
    global: {
      body: {
        background: "dark.500",
      },
    },
  },
});

export * from "./Toast";
export * from "./ChakraReactSelect";
