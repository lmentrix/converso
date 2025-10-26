"use client";

import { useVapi } from "../lib/hooks/useVapi";
import { AssistantButton } from "./assistantButton";
import { Display } from "./display";

function CompanionComponent() {
    const { toggleCall, callStatus, audioLevel } = useVapi();
    return (
        <>
            <div className="chat-history">
                <Display />
            </div>
            <div className="user-input">
                <AssistantButton
                    audioLevel={audioLevel}
                    callStatus={callStatus}
                    toggleCall={toggleCall}
                ></AssistantButton>
            </div>
        </>
    );
}

export { CompanionComponent };