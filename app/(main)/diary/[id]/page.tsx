'use client'

import { useParams } from "next/navigation";
import { Note } from "./components/note";
import { Room } from "./components/room";
import { Loading } from "./components/note-loading";

// interface DiaryIdProps {
//     params: {
//         diaryId: string;
//     };
// };

const DiaryId = () => {
    const params = useParams<{ id: string }>()
    
    return (
       <Room roomId={`${params.id}`} fallback={<Loading />}>
        <Note diaryId={params.id} />
       </Room>
    );
};

export default DiaryId;