import { backendApi } from "@/lib/axios";
import { useMutation, useQueryClient } from "react-query";
import { GET_AUTH_QUERY_KEY } from "@/hooks/useAuth";
import { useToast } from "@chakra-ui/react";
import { z } from "zod";
import { makeSuccessResponseSchema } from "@/lib/api";
import { API_ENDPOINT } from "@/constants/api";

const postLogoutResponseSchema = makeSuccessResponseSchema(
  z.object({
    message: z.string(),
  }),
);

const postLogout = async () => {
  const { data } = await backendApi.post(API_ENDPOINT.AUTH_LOGOUT);
  return postLogoutResponseSchema.parse(data);
};

export const usePostLogout = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation(() => postLogout(), {
    onSuccess: () => {
      toast({
        status: "success",
        title: "You have been logged out",
      });
      queryClient.setQueryData([GET_AUTH_QUERY_KEY], undefined);
    },
  });
};
