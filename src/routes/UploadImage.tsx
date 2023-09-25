import {
  Button,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import { responsiveFormlabelWidth } from "../config";
import { useForm } from "react-hook-form";

export default function UploadImage() {
  const { watch, register } = useForm();
  console.log(watch());
  return (
    <Container>
      <Heading mt={10} textAlign={"center"}>
        Upload Camping
      </Heading>
      <VStack spacing={5} as={"form"} mt={5}>
        {/* 파일이름 시작 */}
        <FormControl w={responsiveFormlabelWidth}>
          <Input {...register("files")} type="file" size={"md"} multiple />
        </FormControl>
        <Button colorScheme="green" w={responsiveFormlabelWidth}>
          Upload photos
        </Button>
      </VStack>
    </Container>
  );
}
