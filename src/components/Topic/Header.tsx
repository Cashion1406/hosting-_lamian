import { Box, Button, Flex, Icon, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { StarIcon } from '@chakra-ui/icons';
import { Topic } from '@/atoms/topicAtom';
import useTopics from '@/hooks/useTopics';

type HeaderProps = {
  topicData: Topic;
};

const Header: React.FC<HeaderProps> = ({ topicData }) => {
  const { topicStateValue, onFollowOrUnfollowTopic } = useTopics();
  console.log('followed Topics ==>', topicStateValue.followedTopics);
  const isJoined = !!topicStateValue.followedTopics.find(
    (item) => item.topic_id === topicData.id
  );
  console.log('Topic ID: ' + topicData.id + '====> is followed?: ' + isJoined);
  return (
    <Flex direction="column" width="100%" height="146px">
      <Box height="50%" bgGradient="linear(to-r, brand.900, brand.800)"></Box>
      <Flex justify="center" flexGrow={1} bg="white">
        <Flex width="95%" maxWidth="860px">
          {topicData.imageURL ? (
            <>
              <Flex
                direction="column"
                position="relative"
                top={-3}
                borderRadius="50%"
              >
                <Flex>
                  <Image
                    src={topicData.imageURL}
                    height="50pt"
                    width="50pt"
                    bg="white"
                    color="brand.500"
                    borderRadius="50%"
                  />
                </Flex>
              </Flex>
            </>
          ) : (
            <StarIcon
              fontSize={60}
              position="relative"
              top={-3}
              bg="blue.500"
              color="blue.500"
              border="5px solid white"
              borderRadius="50%"
            />
          )}
          <Flex padding="10px 16px">
            <Flex direction="column" mr={6}>
              <Text fontWeight={800} fontSize="15pt">
                {topicData.name ? topicData.name : "An's Lies"}
              </Text>
              <Text fontWeight={500} color="brand.900" fontSize="9pt">
                {topicData.ideas?.length} ideas{' '}
              </Text>
            </Flex>
            <Button
              variant={isJoined ? 'secondary' : 'primary'}
              height="30px"
              width="80px"
              pr={6}
              pl={6}
              onClick={() => onFollowOrUnfollowTopic(topicData.id, isJoined)}
            >
              {isJoined ? 'Unfollow' : 'Follow'}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default Header;
