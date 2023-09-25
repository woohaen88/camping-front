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
  VStack,
  useToast,
} from "@chakra-ui/react";
import SocialLogin from "./SocialLogin";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { emailSignUp } from "../api";
import { ISignUpForm, ISignUpFormError, ISignUpFormSuccess } from "../type";

interface ISignUpModalParams {
  isOpen: boolean;
  onClose: () => void;
}

export default function SignUpModal({ isOpen, onClose }: ISignUpModalParams) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ISignUpForm>();

  const toast = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation<
    ISignUpFormSuccess,
    ISignUpFormError,
    ISignUpForm
  >(emailSignUp, {
    onMutate: () => {},
    onSuccess: (data) => {
      toast({
        title: "회원가입 성공~~",
        description: "회원가입 ~~~ 성공",
        status: "success",
        position: "bottom-right",
      });

      onClose();
      reset();
      queryClient.refetchQueries(["me"]);
    },
    onError: (error) => {},
  });
  const onSubmit = (variables: ISignUpForm) => {
    mutation.mutate(variables);
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={"3xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sign up</ModalHeader>
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
              {/* username start */}
              <FormControl mb={3}>
                <FormLabel>username</FormLabel>
                <Input type="username" {...register("username")} />
                {!mutation.isError ? (
                  <FormHelperText>username을 입력하셈.</FormHelperText>
                ) : (
                  <FormErrorMessage>
                    {errors.username?.message}
                  </FormErrorMessage>
                )}
              </FormControl>
              {/* username end */}
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
              {/* password confirm start */}
              <FormControl
                mb={3}
                isInvalid={Boolean(errors.password_confirm?.message)}
              >
                <FormLabel>password confirm</FormLabel>
                <Input
                  type="password"
                  {...register("password_confirm", {
                    required: "패스워드를 확인하셈",
                  })}
                />
                {!mutation.isError ? (
                  <FormHelperText>password를 한번 더 입력하셈</FormHelperText>
                ) : (
                  <FormErrorMessage>
                    {errors.password_confirm?.message}
                  </FormErrorMessage>
                )}
              </FormControl>
              {/* password confirm end */}
            </VStack>
            <Button
              isLoading={mutation.isLoading}
              type="submit"
              mt={"4"}
              colorScheme={"red"}
              w={"100%"}
            >
              Sign up
            </Button>
            <SocialLogin />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
