import React from 'react'
import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionsList";
import CTA from "@/components/CTA";
import {recentSessions} from "@/constants";

const Page = () => {
  return (
    <div className="flex flex-col gap-12">
        <header className="flex flex-col gap-4">
            <h1 className="text-4xl font-bold">Popular companions</h1>
            <p className="text-lg text-muted-foreground">Explore our most popular learning companions</p>
        </header>
        
        <section className="companions-grid">
            <CompanionCard
                id={"123"}
                name={"Neuro Explorer"}
                topic={"Brain Functions"}
                subject={"science"}
                duration={45}
                color={"#ffda6e"}
            />
            <CompanionCard
                id={"456"}
                name={"Countsy the Number Wizard"}
                topic={"Integrals"}
                subject={"maths"}
                duration={30}
                color={"#e5d0ff"}
            />
            <CompanionCard
                id={"789"}
                name={"Vocabulary Builder"}
                topic={"Language Arts"}
                subject={"language"}
                duration={30}
                color={"#BDE7FF"}
            />
        </section>
        
        <section className="home-section">
            <CompanionsList
                title={"Recently completed sessions"}
                companions={recentSessions}
                classNames={"w-2/3 max-lg:w-full"}
            />
            <CTA/>
        </section>
    </div>
  )
}

export default Page