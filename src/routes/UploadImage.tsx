import {
  Button,
  Container,
  FormControl,
  Heading,
  Input,
  ToastId,
  VStack,
  useToast,
} from "@chakra-ui/react";
import {responsiveFormlabelWidth} from "../config";
import {useForm} from "react-hook-form";
import {useMutation} from "@tanstack/react-query";
import {useRef} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {imageUploadURL} from "../api";

export default function UploadImage() {
  const {campgroundId} = useParams();
  const navigate = useNavigate();

  const toast = useToast();
  const toastId = useRef<ToastId>();
  const {
    watch,
    register,
    handleSubmit,

    reset,
  } = useForm();

  const imageUploadURLMutation = useMutation(imageUploadURL, {
    onMutate: () => {
      toastId.current = toast({
        title: "이미지 업로드!!",
        description: "이미지 업로드 중이에요~~",
        status: "loading",
        position: "bottom-right",
        isClosable: true,
      })
    },
    onSuccess: () => {
      if (toastId.current) {
        toast.update(toastId.current, {
          title: "이미지 업로드!!",
          description: "완료!!",
          status: "success",
          position: "bottom-right",
          isClosable: true,
        });
      }
      reset();
      navigate("/");
    },
    onError: () => {
    },
  })


  const onSubmit = () => {
    if (campgroundId) {
      imageUploadURLMutation.mutate({files: watch("files"), id: campgroundId})
    }

  }
  return (
      <Container>
        <Heading mt={10} textAlign={"center"}>
          Upload Camping
        </Heading>
        <VStack spacing={5} as={"form"} mt={5} onSubmit={handleSubmit(onSubmit)}>
          {/* 파일이름 시작 */}
          <FormControl w={responsiveFormlabelWidth}>
            <Input {...register("files")} type="file" size={"md"} multiple/>
          </FormControl>
          <Button
              isLoading={imageUploadURLMutation.isLoading}
              type="submit"
              colorScheme="green"
              w={responsiveFormlabelWidth}
          >
            Upload photos
          </Button>
        </VStack>
      </Container>
  );
}
