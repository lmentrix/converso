import React from 'react'
import {getCompanion} from "@/lib/actions/companion.actions";
import {currentUser} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import {getSubjectColor} from "@/lib/utils";
import Image from "next/image";
import {CompanionComponent} from "@/components/CompanionComponent";

interface CompanionSessionPageProps{
    params: Promise<{id: string}>

}

const CompanionSession = async ({params}:CompanionSessionPageProps) => {
    const {id} = await params
    const companion= await getCompanion(id)
    const {name, subject, title, topic, duration} = companion
    const user = await currentUser()

    if(!user) redirect('/sign-in')

    if(!name) redirect('/companions')


    return (
        <main>
            <article className={"flex rounded-border justify-between p-6 max-md:flex-col max-md:gap-4 bg-white shadow-sm transition-all hover:shadow-md"}>
                <div className={"flex items-center gap-4"}>
                    <div className={"size-[72px] flex items-center justify-center rounded-lg max-md:hidden transition-transform hover:scale-105"}
                         style={{backgroundColor:getSubjectColor(subject)}}
                    >
                        <Image src={`/icons/${subject}.svg`} alt={subject} width={35} height={35}/>

                    </div>
                    <div className={"flex flex-col gap-2"}>
                        <div className={"flex items-center gap-2"}>
                            <p className={"font-bold text-2xl"}>{name}</p>
                            <div className={"subject-badge max-sm:hidden transition-colors hover:bg-opacity-80"}>
                                {subject}
                            </div>
                        </div>
                        <p className={"text-lg text-gray-600"}>{topic}</p>
                    </div>
                </div>
                <div className={"flex items-center gap-2 text-2xl font-semibold max-md:justify-between"}>
                    <Image src={"/icons/clock.svg"} alt={"duration"} width={24} height={24} className="max-md:w-5 max-md:h-5"/>
                    <span className="max-md:text-lg">{duration} min</span>
                </div>
            </article>
            <CompanionComponent
                {...companion}
                companionId={id}
                userName={user.firstName!}
                userImage={user.imageUrl!}
            />
        </main>
    )
}
export default CompanionSession
