import {
  Avatar,
  Box,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightAddon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FaSearch, FaBars } from "react-icons/fa";
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import SignUpModal from "./SignUpModal";
import useUser from "../lib/useUser";
import SignInModal from "./SignInModal";
import {useForm} from "react-hook-form";
import {ICamping, SearchRequest} from "../type";
import {useQuery} from "@tanstack/react-query";
import {searchCampground} from "../api";

export default function Header() {
  const { isLoggedIn, user, userLoading } = useUser();
  const navigate = useNavigate();
  const {
    isOpen: signupIsOpen,
    onOpen: signupOnOpen,
    onClose: signupOnClose,
  } = useDisclosure();

  const {
    isOpen: signinIsOpen,
    onOpen: signinOnOpen,
    onClose: signinOnClose,
  } = useDisclosure();

  const [searchParams, setSearchParams] = useSearchParams();
  let searchP = searchParams.get("search")

  const {register, handleSubmit} = useForm<SearchRequest>()
  const {} = useQuery<ICamping[]>(["search", searchP], searchCampground);

  const onSubmit = () => {

  }
  return (
    <Box>
      <Stack
        direction={{ sm: "column", md: "row" }}
        px={"20"}
        py={"5"}
        justifyContent={"space-between"}
        borderBottomWidth={1.5}
        borderBottomColor={"blackAlpha.200"}
      >
        <Link to="/">
          <Text as={"b"} fontSize={"2xl"}>
            Camping
          </Text>
        </Link>

        <InputGroup w={"sm"} colorScheme="green" as={"form"}>
          <Input {...register("search")} placeholder="검색시작하기"/>

            <InputRightAddon as={"button"} type={"submit"} children={<FaSearch />} onSubmit={handleSubmit(onSubmit)}/>

        </InputGroup>

        <HStack>
          {/* 로그인이 되었고 로딩중이 아닐때  */}
          {isLoggedIn && !userLoading ? (
            <Avatar name={user?.username} size={"md"} src={user?.avatar} />
          ) : null}

          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<FaBars />}
              variant="outline"
            />
            <MenuList>
              {/* 로그인이 안되었거나, 로딩중일 때 -> 로그인, 회원가입 */}
              {/* 로그인이 되었으면 -> 로그아웃 */}
              {!isLoggedIn || userLoading ? (
                <>
                  <MenuItem onClick={signinOnOpen}>Sign In</MenuItem>
                  <MenuItem onClick={signupOnOpen}>Sign Up</MenuItem>
                </>
              ) : (
                <>
                  <MenuItem>Sign Out</MenuItem>
                  <MenuItem onClick={() => navigate("campgrounds/upload")}>
                    생성
                  </MenuItem>
                </>
              )}
            </MenuList>
          </Menu>
        </HStack>
      </Stack>
      <SignInModal isOpen={signinIsOpen} onClose={signinOnClose} />
      <SignUpModal isOpen={signupIsOpen} onClose={signupOnClose} />
    </Box>
  );
}
