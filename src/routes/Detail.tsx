import {
  Avatar,
  Box,
  Divider,
  Grid,
  GridItem,
  HStack,
  Image,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCampground } from "../api";
import { ICamping } from "../type";

export default function Detail() {
  const { campgroundId } = useParams();
  const { data } = useQuery<ICamping>(
    ["detail", `${campgroundId}`],
    getCampground
  );
  return (
    <Box px={20} py={5}>
      <Box alignItems={"flex-start"}>
        <Text fontSize={"2xl"} as={"b"}>
          {data?.name}
        </Text>
        <HStack justify={"space-between"} mt={2}>
          <Text>
            후기 {data?.reviews.length}개 · {data?.location}
          </Text>
          <Text>
            가격:{" "}
            <Text mx={"5"} as="b" fontSize={"lg"}>
              {data?.price}원
            </Text>
          </Text>
        </HStack>
      </Box>
      {/* image URL 5개가 있음 */}

      <Grid
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(4, 1fr)"
        gap={2}
        rounded={"xl"}
        overflow={"hidden"}
        height={"60vh"}
        mt={8}
      >
        {data?.images.map((image, index) => {
          return (
            <>
              <GridItem
                rowSpan={index === 0 ? 2 : 1}
                colSpan={index === 0 ? 2 : 1}
              >
                <Image
                  key={index}
                  overflow={"hidden"}
                  objectFit={"cover"}
                  src={image.file}
                  w={"100%"}
                />
              </GridItem>
            </>
          );
        })}
      </Grid>
      <VStack alignItems={"flex-start"} mt={5}>
        <Text fontSize={"2xl"} as={"b"}>
          내용
        </Text>
        <Text as="p" fontSize={"sm"}>
          {data?.content}
        </Text>
      </VStack>
      <VStack mt={10} alignItems={"flex-start"}>
        <Text as="b" fontSize={"2xl"}>
          {data?.owner.username} 님이 호스팅하는 캠핑장
        </Text>
        <Text color={"gray.600"}>
          최대 인원 {data?.maximum_people}명 · 전기차
          <Text as={"b"}>충전</Text>
          {data?.is_ev_charge}
        </Text>
        <Divider borderBottomWidth={2} mt={3} />
      </VStack>
      <VStack alignItems={"flex-start"}>
        <Text fontSize={"2xl"} as={"b"} mt={3}>
          운영정책
        </Text>
        <HStack>
          <Text>매너타임 &rarr;</Text>
          <Text>
            시작 {data?.manner_time_start} | 종료 {data?.manner_time_end}
          </Text>
        </HStack>
        <HStack>
          <Text>오토캠핑 &rarr;</Text>
          <Text>
            방문시작 {data?.visited_at} | 방문끝 {data?.visited_end}
          </Text>
        </HStack>
      </VStack>
      <Divider borderBottomWidth={2} mt={3} />
      <VStack alignItems={"flex-start"}>
        <Text fontSize={"2xl"} as={"b"} mt={3}>
          시설/환경
        </Text>
        <HStack>
          {data?.amenities.map((amenity, index) => {
            return (
              <>
                <Tag key={index} size="md" colorScheme="green">
                  {amenity.name}
                </Tag>
              </>
            );
          })}
        </HStack>
        <Divider borderBottomWidth={2} mt={3} />
        <VStack alignItems={"flex-start"}>
          <Text fontSize={"2xl"} as={"b"} mt={3}>
            댓글
          </Text>
          <Grid templateColumns={"1fr 1fr"} gap={3}>
            {data?.reviews.map((review, index) => {
              return (
                <>
                  <VStack
                    key={index}
                    alignItems={"flex-start"}
                    mt={3}
                    mb={3}
                    px={4}
                  >
                    <HStack>
                      <Avatar name="A" />
                      <VStack alignItems={"flex-start"}>
                        <Text as={"b"}>{review.owner.username}</Text>
                        <Text color={"gray.500"} fontSize={"small"}>
                          {review.created_at}
                        </Text>
                      </VStack>
                    </HStack>
                    <Text mt={1} fontSize={"sm"}>
                      {review.content}
                    </Text>
                  </VStack>
                </>
              );
            })}
          </Grid>
        </VStack>

        <VStack
          alignItems={"flex-start"}
          w={"100%"}
          maxH={"20vh"}
          overflow={"hidden"}
          objectFit="cover"
          minH={"50vh"}
        >
          <Text fontSize={"2xl"} as={"b"} mt={3}>
            캠핑장 위치
          </Text>
          <Image
            w={"100%"}
            src="https://wimg.mk.co.kr/meet/neds/2020/11/image_readtop_2020_1206310_16061899354442297.jpg"
          />
        </VStack>
      </VStack>
    </Box>
  );
}
