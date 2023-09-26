import {
  Button,
  Checkbox,
  CheckboxGroup,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Text,
  Textarea,
  ToastId,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { responsiveFormlabelWidth } from "../config";
import { useMutation } from "@tanstack/react-query";
import { createCampground } from "../api";
import { ICampingForm, ICampingFormError, ICampingFormSuccess } from "../type";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UploadCampground() {
  // const [] = useState
  const navigate = useNavigate();
  const toast = useToast();
  const toastId = useRef<ToastId>();
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<ICampingForm>();
  const mutation = useMutation<
    ICampingFormSuccess,
    ICampingFormError,
    ICampingForm
  >(createCampground, {
    onMutate: () => {
      // toast update
      toastId.current = toast({
        title: "만드는 중이에여!",
        description: "좀만 기달려봐영",
        status: "loading",
        position: "bottom-right",
      });
    },
    onSuccess: (data) => {
      // toast update
      if (toastId.current) {
        toast.update(toastId.current, {
          title: "만들기 성공",
          description: "만들기 성공!!",
          status: "success",
          position: "bottom-right",
        });

        navigate(`/campgrounds/${data.id}/image/upload`);
      }
    },
    onError: (error) => {
      console.log("error!!");
    },
  });
  const onSubmit = (variables: ICampingForm) => {
    mutation.mutate(variables);
  };
  return (
    <Container>
      <Heading mt={10} textAlign={"center"}>
        Upload Camping
      </Heading>
      <VStack spacing={5} as={"form"} mt={5} onSubmit={handleSubmit(onSubmit)}>
        {!mutation.isError ? null : (
          <Text color="red">{mutation.error?.message}</Text>
        )}
        {/* 캠핑장이름 시작 */}
        <FormControl w={responsiveFormlabelWidth}>
          <FormLabel>캠핑장 이름을 입력해주세요~</FormLabel>
          <Input
            type="text"
            size={"md"}
            {...register("name", { required: true })}
          />
          <FormHelperText>캠핑장이름을 입력하셈</FormHelperText>
        </FormControl>
        {/* 캠핑장이름 끝 */}

        {/* 캠핑장 주소 시작 */}
        <FormControl w={responsiveFormlabelWidth}>
          <FormLabel>캠핑장 주소는 어디인가요?</FormLabel>
          <Input
            type="text"
            size={"md"}
            {...register("location", { required: true })}
          />
          <FormHelperText>주소를 입력해주셈</FormHelperText>
        </FormControl>
        {/* 캠핑장 주소 끝 */}

        {/* 캠핑장평점 시작 */}
        <FormControl w={responsiveFormlabelWidth}>
          <FormLabel>평점?</FormLabel>
          <Input
            type="number"
            min={0}
            max={5}
            size={"md"}
            {...register("rating", { required: true })}
          />
          <FormHelperText>캠핑장 평점은??</FormHelperText>
        </FormControl>
        {/* 캠핑장평점 끝 */}

        {/* 캠핑장가격 시작 */}
        <FormControl w={responsiveFormlabelWidth}>
          <FormLabel>하루에 얼마?</FormLabel>
          <Input
            type="number"
            min={0}
            size={"md"}
            {...register("price", { required: true })}
          />
          <FormHelperText>가격을 입력하셈</FormHelperText>
        </FormControl>
        {/* 캠핑장가격 끝 */}

        {/* 캠핑장 뷰 종류 시작 */}
        <FormControl w={responsiveFormlabelWidth}>
          <FormLabel>뷰 종류는??</FormLabel>
          <Select
            placeholder="선택해주세용"
            {...register("view", { required: true })}
          >
            <option value="mountain">산</option>
            <option value="river">강</option>
            <option value="lake">호수</option>
            <option value="other">Other</option>
          </Select>
          <FormHelperText>어떤 뷰인지 입력하셈</FormHelperText>
        </FormControl>
        {/* 캠핑장 뷰 종류 끝 */}

        {/* 캠핑장 방문 일자 시작 */}
        <FormControl w={responsiveFormlabelWidth}>
          <FormLabel>언제 갔었니??</FormLabel>
          <Input
            type="date"
            size={"md"}
            {...register("visited_at", { required: true })}
          />
          <FormHelperText>시작일자를 입력하세요</FormHelperText>
        </FormControl>
        {/* 캠핑장 방문 일자 끝 */}

        {/* 캠핑장 방문 일자 끝 시작 */}
        <FormControl w={responsiveFormlabelWidth}>
          <FormLabel>언제까지 갔니?</FormLabel>
          <Input
            type="date"
            size={"md"}
            {...register("visited_end", { required: true })}
          />
          <FormHelperText>방문일자 끝을 입력하세요</FormHelperText>
        </FormControl>
        {/* 캠핑장 방문 일자 끝 끝 */}

        {/* 캠핑장 매너 타임 시작 */}
        <FormControl w={responsiveFormlabelWidth}>
          <FormLabel>매너타임 시작</FormLabel>
          <Input
            type="time"
            size={"md"}
            {...register("manner_time_start", { required: true })}
          />
          <FormHelperText>매너타임은 언제부터 시작하나요?</FormHelperText>
        </FormControl>
        {/* 캠핑장 매너 타임 끝 */}

        {/* 캠핑장 매너 타임 시작 */}
        <FormControl w={responsiveFormlabelWidth}>
          <FormLabel>매너타임 끝</FormLabel>
          <Input
            type="time"
            size={"md"}
            {...register("manner_time_end", { required: true })}
          />
          <FormHelperText>매너타임은 언제부터 시작하나요?</FormHelperText>
        </FormControl>
        {/* 캠핑장 매너 타임 끝 */}

        {/* 캠핑장 콘텐츠 시작 */}
        <FormControl w={responsiveFormlabelWidth}>
          <FormLabel>내용을 입력하세요~</FormLabel>
          <Textarea
            placeholder="여기에 리뷰를 입력해주세요~~"
            {...register("content", { required: false })}
          />
          <FormHelperText>간략하게 리뷰를 적어주세요</FormHelperText>
        </FormControl>
        {/* 캠핑장 콘텐츠 끝 */}

        {/* 캠핑장 최대인원 시작 */}
        <FormControl w={responsiveFormlabelWidth}>
          <FormLabel>최대인원은?</FormLabel>
          <Input
            type="number"
            size={"md"}
            min={0}
            {...register("maximum_people", { required: true })}
          />
          <FormHelperText>최대인원은?</FormHelperText>
        </FormControl>
        {/* 캠핑장 최대인원 끝 */}

        {/* 캠핑장 충전 가능 시작 */}
        <FormControl w={responsiveFormlabelWidth}>
          <FormLabel>전기차 충전 가능?</FormLabel>
          <Stack spacing={5} direction="row">
            <Checkbox
              {...register("is_ev_charge", { required: true })}
              colorScheme="green"
            >
              가능
            </Checkbox>
          </Stack>
          <FormHelperText>전기차 충전 가능한가요?</FormHelperText>
        </FormControl>
        {/* 캠핑장 충전 가능 끝 */}

        {/* 캠핑장 종류 시작 */}
        <FormControl w={responsiveFormlabelWidth}>
          <FormLabel>캠핑장 종류는?</FormLabel>
          <Select
            placeholder="선택해주세용"
            {...register("camping_kind", { required: true })}
          >
            <option value="auto">산</option>
            <option value="other">강</option>
          </Select>
          <FormHelperText>캠핑장 종류는 뭔가요?</FormHelperText>
        </FormControl>
        {/* 캠핑장 종류 끝 */}

        {/* button */}
        <Button
          mb={20}
          w={responsiveFormlabelWidth}
          colorScheme="green"
          type="submit"
        >
          작성~ 완료!
        </Button>
      </VStack>
    </Container>
  );
}
