import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  ToastId,
  VStack,
  useToast,
} from "@chakra-ui/react";
import SocialLogin from "./SocialLogin";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { emailSignIn } from "../api";
import { ISignInForm, ISignInFormError, ISignInFormSuccess } from "../type";
import { useRef } from "react";

interface ISignInModalParams {
  isOpen: boolean;
  onClose: () => void;
}

export default function SignInModal({ isOpen, onClose }: ISignInModalParams) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ISignInForm>();

  const toast = useToast();
  const toastId = useRef<ToastId>();
  const queryClient = useQueryClient();
  const mutation = useMutation<
    ISignInFormSuccess,
    ISignInFormError,
    ISignInForm
  >(emailSignIn, {
    onMutate: () => {
      toastId.current = toast({
        title: "로그인중이에용",
        description: "좀만 기달려봐영",
        status: "loading",
        position: "bottom-right",
      });
    },
    onSuccess: (data) => {
      if (toastId.current) {
        queryClient.resetQueries(["me"]);
        toast.update(toastId.current, {
          title: "로그인 성공~~",
          description: "로~~그~~인!! ~~~ 성공",
          status: "success",
          position: "bottom-right",
        });

        onClose();
        reset();
      }
    },
    onError: (error) => {},
  });
  const onSubmit = ({ email, password }: ISignInForm) => {
    mutation.mutate({ email, password });
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={"3xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sign In</ModalHeader>
          <ModalCloseButton />
          <ModalBody as={"form"} onSubmit={handleSubmit(onSubmit)}>
            <VStack>
              <Text colorScheme="red" color={"red.500"}>
                {mutation.error?.detail}
              </Text>

              {/* email */}
              <FormControl mb={3} isInvalid={Boolean(errors.email?.message)}>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  {...register("email", {
                    required: "저기여! 이메일은 필수에여",
                  })}
                />
                {!mutation.isError ? (
                  <FormHelperText>이메일을 입력하셈</FormHelperText>
                ) : (
                  <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                )}
              </FormControl>

              {/* password start */}
              <FormControl mb={3} isInvalid={Boolean(errors.password?.message)}>
                <FormLabel>password</FormLabel>
                <Input
                  type="password"
                  {...register("password", {
                    required: "패스워드를 입력해야함",
                  })}
                />
                {!mutation.isError ? (
                  <FormHelperText>password를 입력하셈</FormHelperText>
                ) : (
                  <FormErrorMessage>
                    {errors.password?.message}
                  </FormErrorMessage>
                )}
              </FormControl>
              {/* password end */}
            </VStack>
            <Button
              isLoading={mutation.isLoading}
              type="submit"
              mt={"4"}
              colorScheme={"red"}
              w={"100%"}
            >
              Sign In
            </Button>
            <SocialLogin />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
