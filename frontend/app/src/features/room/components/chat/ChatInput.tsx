import { COMMUNICATION_SOCKET_API } from "@/constants/socket";
import { useAuth } from "@/hooks";
import { Flex, Input, Button, FormControl } from "@chakra-ui/react";
import { FormEvent, useRef, useState } from "react";
import { Socket } from "socket.io-client";

interface ChatInputProps {
  socket: Socket;
}
const ChatInput = ({ socket }: ChatInputProps) => {
  const user = useAuth().data?.user;
  const [inputMessage, setInputMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      socket.emit(COMMUNICATION_SOCKET_API.CHAT_MESSAGE, {
        userId: user?.id,
        message: inputMessage,
      });
      setInputMessage("");
      inputRef.current?.focus();
    }
  };

  return (
    <form onSubmit={handleSendMessage}>
      <FormControl mt={2}>
        <Flex w="100%">
          <Input
            ref={inputRef}
            placeholder="Type Something..."
            border="none"
            borderRadius="none"
            _focus={{ border: "1px solid black" }}
            value={inputMessage}
            onChange={e => setInputMessage(e.target.value)}
          />
          <Button
            type="submit"
            bg="black"
            color="white"
            borderRadius="none"
            _hover={{
              bg: "white",
              color: "black",
              border: "1px solid black",
            }}
            disabled={!inputMessage.trim()}
          >
            Send
          </Button>
        </Flex>
      </FormControl>
    </form>
  );
};

export default ChatInput;