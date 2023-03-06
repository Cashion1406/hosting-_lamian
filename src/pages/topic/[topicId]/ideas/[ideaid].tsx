import { Idea } from '@/atoms/ideaAtom';
import PageContent from '@/components/Layout/PageContent';
import Comments from '@/components/Posts/Comments';
import IdeaItem from '@/components/Posts/IdeaItem';
import { auth } from '@/Firebase/clientApp';
import useIdeas from '@/hooks/useIdeas';
import axios from 'axios';
import { useRouter } from 'next/router';
import { stringify } from 'querystring';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

type IdeaPageProps = {

};

const IdeaPage: React.FC<IdeaPageProps> = () => {
    const [user] = useAuthState(auth);
    const router = useRouter();
    const { topicId, ideaid } = router.query;
    //const { communityStateValue } = useCommunityData();
    const { ideaStateValue, setIdeaStateValue, onVote } = useIdeas();
    //const [idea, setIdea] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchIdea(ideaid);
        localStorage.setItem("cache_idea", JSON.stringify(ideaStateValue.selectedIdea));
    }, [ideaid])

    const fetchIdea = async (idea_id: string) => {
        console.log("FETCHING IDEA");
        try {
            axios.get('http://localhost:8080/idea/' + idea_id).then(
                res => {
                    console.log("Idea fetched ==>", res.data)
                    setIdeaStateValue((prev) => ({
                        ...prev,
                        selectedIdeaDetails: res.data
                    }))
                }
            )

        } catch (error) {
            console.log("Idea fetched error ==>", error)
        }
    }

    return (
        <PageContent>
            <>
                <IdeaItem
                    idea={ideaStateValue.selectedIdea ? ideaStateValue.selectedIdea : JSON.parse(localStorage.getItem("cache_idea")) as Idea}
                />
                <Comments
                    user={user}
                    topic={topicId}
                    selectedIdea={ideaStateValue.selectedIdeaDetails}
                    fetchIdea={fetchIdea}
                />
            </>
            <></>
        </PageContent >
    );
}
export default IdeaPage;