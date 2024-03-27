"use client"

import { Info } from "./Info"
import { CollaborativeEditor } from "./note-components/note-block";
import { Participants } from "./participants"

interface NoteProps {
    diaryId: string;
};


export function Note ({diaryId,}: NoteProps) {
    return (
        <main className="h-full w-full relative bg-white rounded-lg p-6 overflow-y-scroll">
            <div className="p-2">
                <Info diaryId={diaryId}/>
                <Participants />
            </div>
            <div className="pt-16 h-full relative z-9999">
                <CollaborativeEditor />
            </div>
        </main>
    )
}