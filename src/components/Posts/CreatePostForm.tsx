import { authModalState } from "@/atoms/authModalAtom";
import { auth } from "@/Firebase/clientApp";
import { Flex, Icon, Input, Image } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BsLink45Deg } from "react-icons/bs";
import { FaReddit } from "react-icons/fa";
import { IoImageOutline } from "react-icons/io5";
import { useSetRecoilState } from "recoil";


type CreatePostProps = {};

const CreatePostForm: React.FC<CreatePostProps> = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const setAuthModalState = useSetRecoilState(authModalState);
  const onClick = () => {
    if (!user) {
      setAuthModalState({ open: true, view: "login" });
      return;
    }
    const topicId = router.query.topicId;
    router.push('/topic/' + topicId as string + '/submit');
  };
  return (
    <Flex
      justify="space-evenly"
      align="center"
      bg="white"
      height="56px"
      borderRadius={4}
      border="1px solid"
      borderColor="gray.300"
      p={2}
      mb={4}
    >
      {user?.photoURL ? (
        <>
          <Image
            src={user?.photoURL}
            height="28pt"
            width="28pt"
            bg="white"
            color="brand.500"
            borderRadius="50%"
            mr={2}
          />
        </>
      ) : (
        <>
          <Image
            src="/images/defaultProfile.jpg"
            height="28pt"
            width="28pt"
            bg="white"
            color="brand.500"
            mr={2}
            borderRadius="50%"
          />
        </>
      )}

      <Input
        placeholder="Create Post"
        fontSize="10pt"
        _placeholder={{ color: "gray.500" }}
        _hover={{
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        bg="gray.50"
        borderColor="gray.200"
        height="36px"
        borderRadius={4}
        mr={4}
        onClick={onClick}
      />
      <Icon
        as={IoImageOutline}
        fontSize={24}
        mr={4}
        color="gray.400"
        cursor="pointer"
      />
      <Icon as={BsLink45Deg} fontSize={24} color="gray.400" cursor="pointer" />
    </Flex>
  );
};
export default CreatePostForm;