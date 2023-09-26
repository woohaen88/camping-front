import {
  Button,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  ToastId,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { responsiveFormlabelWidth } from "../config";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { getOneTimeUrl, imageUploadDB, uploadCloudFlare } from "../api";
import {
  imageUploadDBparams,
  OneTimeURLSuccess,
  uploadCloudFlareResponse,
  uploadCloudFlareResponseResult,
} from "../type";
import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function UploadImage() {
  const { campgroundId } = useParams();
  const navigate = useNavigate();
  const [imgFile, setImgFile] = useState<File>();
  const toast = useToast();
  const toastId = useRef<ToastId>();
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const imageUploadDBMutation = useMutation(imageUploadDB, {
    onMutate: () => {},
    onSuccess: (data) => {
      console.log(data);
    },
    onError: () => {},
  });

  const uploadCloudFlareMutation = useMutation(uploadCloudFlare, {
    onMutate: () => {},
    onSuccess: ({ result }: uploadCloudFlareResponse) => {
      const uploadfile = result.variants[0];
      if (campgroundId) {
        imageUploadDBMutation.mutate({
          id: campgroundId,
          file: uploadfile,
        });
      }
      reset();
      navigate("/");
    },
    onError: () => {},
  });
  const onetimeurlMutation = useMutation(getOneTimeUrl, {
    onMutate: () => {},
    onSuccess: (data: OneTimeURLSuccess) => {
      if (imgFile) {
        uploadCloudFlareMutation.mutate({
          file: imgFile,
          uploadURL: data.uploadURL,
        });
      }
    },
    onError: () => {},
    retry: false,
  });
  const onSubmit = () => {
    // 파일 갯수만큼 반복
    const files: FileList = watch("files");

    toastId.current = toast({
      title: "업로드중입니다.",
      description: "조금만 기다려봐영~",
      status: "loading",
      position: "bottom-right",
    });
    Array.from(files).forEach((file) => {
      setImgFile(file);
      onetimeurlMutation.mutate();
    });

    if (toastId) {
      if (uploadCloudFlareMutation.isLoading || onetimeurlMutation.isLoading) {
        toast.update(toastId.current, {
          title: "업로드완료",
          description: "업로드완",
          status: "success",
          position: "bottom-right",
        });
      }
    }
  };
  return (
    <Container>
      <Heading mt={10} textAlign={"center"}>
        Upload Camping
      </Heading>
      <VStack spacing={5} as={"form"} mt={5} onSubmit={handleSubmit(onSubmit)}>
        {/* 파일이름 시작 */}
        <FormControl w={responsiveFormlabelWidth}>
          <Input {...register("files")} type="file" size={"md"} multiple />
        </FormControl>
        <Button
          isLoading={
            uploadCloudFlareMutation.isLoading || onetimeurlMutation.isLoading
          }
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
