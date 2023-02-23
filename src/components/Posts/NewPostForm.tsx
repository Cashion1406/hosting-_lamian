import React, { useRef, useState } from "react";
import PageContent from "@/components/Layout/PageContent";
import { Flex, Icon } from "@chakra-ui/react";

import TabItems from "./TabItems";
import { async } from "@firebase/util";
import TextInput from "./PostForm/TextInput";
import { BiLinkAlt } from "react-icons/bi";
import { BsFillFileImageFill } from "react-icons/bs";
import {AiFillFileText} from "react-icons/ai"
import { FaPollH } from "react-icons/fa";
import ImageUpload from "./PostForm/ImageUpload";
import { Post } from "@/atoms/postsAtom";
import { User } from "firebase/auth";
import { useRouter } from "next/router";
import { addDoc, collection, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore";
import { firestore, storage } from "@/Firebase/clientApp";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
  

type NewPostForm = {
  user: User ;
};

const formTabs : TabItem[] =[
  {
  title: 'Post', 
  icon: AiFillFileText
},
{
  title:'Images & Video',
  icon: BsFillFileImageFill
},  
{
  title:'Link',
  icon: BiLinkAlt
},  
{
  title:'Poll',
  icon: FaPollH
}

];
export type TabItem = {
  title: string;
  icon: typeof Icon.arguments;
};
const NewPostForm: React.FC<NewPostForm> = ({user}) => {
    const router = useRouter();
    const [selectTab, setSelectTab] = useState(formTabs[0].title);
    const [textInputs, setTextInputs] = useState({
      title: "", 
      body:"", 
    });
    const [selectedFile, setSelectedFile] = useState<string>();
    const [loading, setLoading] = useState(false);
    const handleCreatePost = async () => {
      setLoading(true);
      const {departmentId} = router.query;
      //create new post object => type post
      const newPost: Post = {
        // departmentId: departmentId as string,
        employeeId: user?.uid,
        employeeName: user.email!,
        title: textInputs.title,
        body: textInputs.body,
        numberOfComments: 0,
        voteStatus: 0,
        createdTime: serverTimestamp() as Timestamp,
      };

      try{
        //store post in firebase
        const postDocRef = await addDoc(collection(firestore, "Posts"), newPost);
        //image URL
        if (selectedFile){
          const imageRef = ref(storage, `Posts/${postDocRef.id}/image`);
          await uploadString(imageRef, selectedFile, 'data_url')
          const downloadURL = await getDownloadURL(imageRef);

          //update post dock by adding imageURL
          await updateDoc(postDocRef,{
            imageURL: downloadURL,
          });
        }
      }catch (error:any){
        console.log("handleCreatePost error check", error.message)
      };
      setLoading(false);

      //redirect the user back to the home page using the router
      // router.back();
    };

    const onSelectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
      const reader = new FileReader();

      if (event.target.files?.[0]){
        reader.readAsDataURL(event.target.files[0]);
      }

      reader.onload = (readerEvent) => {
        setSelectedFile(readerEvent.target?.result as string);

      }
    };

    const onTextChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
        const {
          target: {name, value}, 
        } = event;
        setTextInputs((prev) => ({
          ...prev, 
          [name]: value,
        }
        ))
      };
   return(
   <Flex direction="column" bg="white" borderRadius={4} mt={2} >
    <Flex width="100%">
      {formTabs.map((item) => (
        <TabItems 
        key={item.title}
        item={item} 
        selected={item.title === selectTab} 
        setSelectedTab = {setSelectTab}/>
      ))}
    </Flex>
    <Flex p={3}>
      {selectTab === "Post" && (
      <TextInput 
      textInputs={textInputs} 
      handleCreatePost={handleCreatePost} 
      onChange = {onTextChange}
      loading={loading}/>
      )}
      {selectTab === 'Images & Video' && (
        <ImageUpload 
        selectedFile={selectedFile}
        onSelectImage={onSelectImage}
        setSelectedTab={setSelectTab}
        setSelectedFile ={setSelectedFile}
        />
      )}
    </Flex>
   </Flex>
  );
};
export default NewPostForm;