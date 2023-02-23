import { Button, Flex, Input, Stack, Textarea } from "@chakra-ui/react";
import React from "react";

type textInputProps = {
  textInputs: {
    title:string;
    body:string;
  };
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleCreatePost: () => void;
  loading:boolean;
};

const TextInput:React.FC<textInputProps> = ({textInputs, onChange, handleCreatePost, loading}) => {
  return(
    <Stack spacing={3} width="100%">
      <Input
      name="title"
      value={textInputs.title}
      onChange={onChange}
      fontSize="10pt"
      placeholder="Title"
      borderRadius={4}
      bg="gray.50"
      _placeholder={{color:"gray.500"}}
      focusBorderColor="black"
      _hover={{
        bg: "white",
        border:"2px solid", 
        borderColor: "brand.600", 
      }}
      _focus ={{
        outline: "none",
        bg:"white",
        border: "1px solid", 
        borderColor: "black"
      }}
      />
      <Textarea
      name="body"
      fontSize="10pt"
      value={textInputs.body}
      onChange={onChange}
      placeholder="Text (optional)"
      bg="gray.50"
      borderRadius={4}
      height="100px"
      _placeholder={{color:"gray.500"}}
      focusBorderColor="black"
      _hover={{
        bg: "white",
        border:"2px solid", 
        borderColor: "brand.600", 
      }}
      _focus ={{
        outline: "none",
        bg:"white",
        border: "1px solid", 
        borderColor: "black"
      }}/>
      <Flex justify="flex-end">
      <Button 
        height="34px" 
        width="80px"
        variant="primary" 
        type="submit"
        disabled={!textInputs.title}
        loadingText='Posting'
        spinnerPlacement="start"
        isLoading ={loading}
        _loading= {{opacity:2}}
        onClick={handleCreatePost}>Post</Button>
      </Flex>
    </Stack>
  );
};
export default TextInput;