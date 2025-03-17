import StackCard from "./stack-card";
import StackSection from "./stack-section";

const TechStack = () => {
    return (
        <div className="flex justify-center items-center flex-col border border-[#3F3418] md:max-w-7xl mx-auto rounded-2xl mt-20 mb-20 shadow-[inset_0_0_250px_#3F3418]">
            <StackSection title="Frontend">
                <StackCard 
                src="/images/logo/skill-icons_nextjs-light.svg"
                title="NextJS"
                alt="Logo of nextjs"
                />
                <StackCard 
                src="/images/logo/devicon_tailwindcss.svg"
                title="Tailwindcss"
                alt="Logo of tailwindcss"
                />
                <StackCard 
                src="/images/logo/skill-icons_typescript.svg"
                title="TypeScript"
                alt="Logo of typescript"
                />
                <StackCard 
                src="/images/logo/Logo-Zustand 1.svg"
                title="Zustand"
                alt="Logo of zustand"
                />
                <StackCard 
                src="/images/logo/Logo-Zod 1.svg"
                title="Zod"
                alt="Logo of zod"
                />
            </StackSection>
            <hr className="w-full border-t border-[#221C0E] my-6" />
            <StackSection title="Backend">
                <StackCard 
                src="/images/logo/logos_hono.svg"
                title="Hono"
                alt="logo of hono"
                />
                <StackCard 
                src="/images/logo/Logo-Zod 1.svg"
                title="Zod"
                alt="Logo of zod"
                />
                <StackCard 
                src="/images/logo/skill-icons_typescript.svg"
                title="TypeScript"
                alt="Logo of typescript"
                />
            </StackSection>
            <hr className="w-full border-t border-[#221C0E] my-6" />
            <StackSection title="Deployment">
                <StackCard 
                src="/images/logo/devicon_cloudflareworkers.svg"
                title="Backend Cloudflare"
                alt="cloudflare logo"
                />
                <StackCard 
                src="/images/logo/Vector (1).svg"
                title="Frotend Vercel"
                alt="vercel logo"
                />
            </StackSection>
        </div>
    )
}

export default TechStack;